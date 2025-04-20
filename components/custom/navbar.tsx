"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

type NavbarProps = {
  loggedIn: boolean;
};

export default function Navbar({ loggedIn }: NavbarProps) {
  return (
    <nav className="sticky top-0 w-full backdrop-blur-md bg-white/75 border-b border-gray-200/20 z-50">
      <div className="container mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.img
              src="/tayyari_logo.svg"
              alt="Tayyari.AI"
              className="h-14"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </Link>

          {/* Clerk Auth Buttons */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className=" bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90 text-white px-7 py-5 text-lg rounded-2xl">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="outline" className="px-6 py-2 rounded-xl">
                  Sign up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </motion.div>
        </div>
      </div>

      <Separator />
    </nav>
  );
}
