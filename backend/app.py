import os
import json
import requests
from dotenv import load_dotenv
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from werkzeug.utils import secure_filename
import kokoro
from kokoro import KPipeline
import soundfile as sf
import numpy as np
import re
import pdfplumber
import torch
import io
from langchain_community.vectorstores import FAISS
from langchain_core.embeddings import Embeddings
from typing import List
from datetime import datetime
from agents import AgentService, SafetyStatus


load_dotenv()

import os
api_key = os.getenv("GEMINI_API_KEY")
print("🔑 API Key from env:", os.getenv("GEMINI_API_KEY"))

pipeline = KPipeline(lang_code='a')

app = Flask(__name__)




# Gemini manual API call
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key={GEMINI_API_KEY}"
HEADERS = {
    "Content-Type": "application/json"
}
def call_gemini_api(prompt):
    api_key = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key={api_key}"

    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    print(f"🔑 GEMINI_API_KEY: {api_key}")

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return response.json()["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None


def process_with_gemini(text):
    prompt = f"Create an interactive learning module from this content. Use LaTeX for mathematical expressions and wrap them in single or double dollar signs if required. Use markdown for other content:\n\n{text}"
    return call_gemini_api(prompt)

chat_history = []
vector_store = None
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"], "methods": ["GET", "POST"], "allow_headers": ["Content-Type"]}})
agent_service = AgentService(api_key=GEMINI_API_KEY)

DOWNLOADS_DIR = "downloads"
UPLOAD_FOLDER = "uploads"
os.makedirs(DOWNLOADS_DIR, exist_ok=True)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Utils and routes follow here...
# You should now replace any remaining `genai.GenerativeModel(...)` calls with `call_gemini_api(...)`

# For example, in `/explain-more` route:
# response = call_gemini_api(prompt)

# And in `/interactive-questions` route:
# response = call_gemini_api(prompt)

# Remove any duplicate definitions of process_with_gemini or old SDK references.

# Note: Be sure to replace other SDK usages in explain_more and interactive_questions before deploying.

# app.run(debug=True) at the end is correct.



# ... (rest of the routes stay unchanged but still contain SDK references)



def download_file(file_url):
    print(file_url)
    print(file_url.split("/"))
    local_filename = DOWNLOADS_DIR + file_url.split("/")[-2] + ".pdf"

    try:
        response = requests.get(file_url, stream=True)
        response.raise_for_status()

        with open(local_filename, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)

        return local_filename
    except requests.exceptions.RequestException as e:
        print(f"Error downloading file: {e}")
        return None


def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    loader = PyPDFLoader(pdf_path)
    pages = loader.load()
    text = "\n".join([page.page_content for page in pages])
    return text

def split_text_for_rag(text):
    """Split the text into smaller chunks for RAG processing."""
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    return text_splitter.split_text(text)

@app.route('/process-interaction', methods=['POST'])
def process_interaction():
    """Process user interaction with the AI agents."""
    try:
        data = request.json
        user_input = data.get('input')

        if not user_input:
            return jsonify({
                'error': 'No input provided'
            }), 400

        current_topic = data.get('current_topic')
        active_subtopic = data.get('active_subtopic')
        session_history = data.get('session_history')

        response = agent_service.start_new_topic(user_input, current_topic=current_topic, active_subtopic=active_subtopic, session_history=session_history)

        response_dict = response.to_dict()

        return jsonify(response_dict)

    except Exception as e:
        print(f"Error processing interaction: {e}")
        return jsonify({
            'error': str(e)
        }), 500

def generate_audio(text):
    generator = pipeline(
        text, voice='af_heart', # <= change voice here
        speed=1
    )
    all_audio = []
    for i, (gs, ps, audio) in enumerate(generator):
        print(i)
        print(gs)
        print(ps)
        all_audio.append(audio)
    final_audio = np.concatenate(all_audio)
    return final_audio

@app.route("/process-text2speech", methods=["POST"])
def process_text2speech():
    text = ""

    if "pdf" in request.files:
        file = request.files["pdf"]
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        text = ""
        with pdfplumber.open(file) as pdf:
            text = " ".join(page.extract_text() for page in pdf.pages)
        print(text)
        text = re.sub(r"(\w+)\s*\n\s*(\w+)", r"\1 \2", text)
        print(text)
    else:
        text = request.form.get("text", "").strip()
        print(text)

    if not text:
        return jsonify({"error": "No text provided"}), 400

    audio = generate_audio(text)

    wav_file = io.BytesIO()
    sf.write(wav_file, audio, 24000, format='WAV')
    wav_file.seek(0)
    return send_file(wav_file, mimetype='audio/wav', as_attachment=False)


def is_valid_pdf(file_url):
    """Check if the file is a valid PDF."""
    try:
        if 'ucarecdn.com' in file_url:
            return True
            
        response = requests.get(file_url, stream=True)
        response.raise_for_status()

        content_type = response.headers.get('content-type', '').lower()
        if 'application/pdf' in content_type:
            return True

        magic_numbers = response.raw.read(4)
        return magic_numbers.startswith(b'%PDF')
    except Exception as e:
        print(f"Error validating PDF: {e}")
        return False
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "MindFlow backend is running 🚀"})

@app.route('/process-content', methods=['POST'])
def process_content():
    """Process uploaded content."""
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        print("Received data:", data)  
        
        notes = data.get('notes', '')
        files = data.get('files', [])

        processed_files = []
        all_text = []

        if notes.strip():
            all_text.append(notes)

        for file_url in files:
            print(f"Processing file URL: {file_url}")  

            if not file_url:
                continue

            if not is_valid_pdf(file_url):
                print(f"Invalid PDF URL: {file_url}")  
                return jsonify({
                    'error': f'Invalid or unsupported file format. Only PDF files are allowed.'
                }), 400
                
            local_file = download_file(file_url)
            if local_file:
                processed_files.append(local_file)
                try:
                    text = extract_text_from_pdf(local_file)
                    if text:
                        all_text.append(text)
                except Exception as e:
                    print(f"Error extracting text from PDF: {e}")
                    return jsonify({
                        'error': 'Could not extract text from PDF. Please ensure it is a valid PDF file with extractable text.'
                    }), 400

        if not all_text:
            return jsonify({
                'error': 'No content could be processed'
            }), 400

        combined_text = "\n\n".join(all_text)
        processed_content = process_with_gemini(combined_text)

        if not processed_content:
            return jsonify({
                'error': 'Failed to process content with AI'
            }), 500

        return jsonify({
            'response': processed_content,
            'status': 'success'
        })

    except Exception as e:
        print(f"Error processing content: {e}")
        return jsonify({
            'error': str(e)
        }), 500

@app.route("/get-summary", methods=["GET"])
def get_summary():
    """Get a summary of the current learning session."""
    summary = agent_service.get_session_summary()
    return jsonify(summary.to_dict())

import whisper
model = whisper.load_model("base")  # You can also use "small", "medium", or "large"
@app.route('/speech2text', methods=['POST'])
def transcribe():
    """Converts speech audio to text using Whisper model"""
    temp_file = "temp_audio.wav"

    if 'file' in request.files:
        file = request.files['file']
        file.save(temp_file)

    elif request.data:
        with open(temp_file, "wb") as f:
            f.write(request.data)

    else:
        return jsonify({"error": "No audio data received"}), 400

    result = model.transcribe(temp_file)
    os.remove(temp_file)  

    return jsonify({"text": result["text"]})

@app.route('/explain-more', methods=['POST'])
def explain_more():
    """Use Gemini to provide deeper explanations based on previous context"""
    try:
        data = request.json
        question = data.get('question')
        context = data.get('context', '')

        global vector_store
        if vector_store is None:
            texts = split_text_for_rag(context)
            vector_store = FAISS.from_texts(texts, embeddings)
        
        relevant_docs = vector_store.similarity_search(question, k=2)
        relevant_context = " ".join([doc.page_content for doc in relevant_docs])
        
        prompt = f"""Using the following context and question, provide a detailed explanation:
        
        Context: {relevant_context}
        
        Question: {question}
        
        Provide a thorough explanation that incorporates the context and addresses the question directly."""
        
        response_text = call_gemini_api(prompt)

        chat_history.append({
    "question": question,
    "answer": response_text,
     "timestamp": datetime.now().isoformat()
})
        return jsonify({
            'response': response.text,
            'status': 'success'
        })
        
    except Exception as e:
        print(f"Error in explain-more: {e}")
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/interactive-questions', methods=['POST'])
def interactive_questions():
    """Generate and process interactive questions using Gemini"""
    try:
        data = request.json
        context = data.get('context', '')
        
        prompt = f"""Based on this content, generate 3 interactive questions to test understanding. 
        Format your response as a JSON array of questions, where each question has:
        - question_text: the actual question
        - options: array of 4 possible answers
        - correct_answer: the correct answer
        - explanation: explanation of why this is correct
        
        Content: {context}"""
        
        response_text = call_gemini_api(prompt)
        try:
            questions = json.loads(response_text)
        except json.JSONDecodeError:
            questions = [{
                "question_text": "Could not generate proper questions.",
                "options": ["Try again", "Contact support"],
                "correct_answer": "Try again",
                "explanation": "There was an error processing the content."
            }]
        
        chat_history.append({
            "type": "interactive_questions",
            "questions": questions,
            "timestamp": datetime.now().isoformat()
        })
        
        return jsonify({
            'questions': questions,
            'status': 'success'
        })
        
    except Exception as e:
        print(f"Error in interactive-questions: {e}")
        return jsonify({
            'error': str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
