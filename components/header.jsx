"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";


const Header = ({ user }) => {
  return (
    <>
    <header className="fixed flex justify-center items-center top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
        <Link href="/">
        <h1 className="font-bold text-3xl gradient-text px-2">WorkWise</h1>
    
        </Link> 
      <nav className="container w-full h-16 flex items-center justify center">

        <div className="flex justify-center items-center">

        </div>
        <div className="flex justify-center items-center">

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <a target="_blank" href="https://ai-course-generator-gamma-snowy.vercel.app/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex text-xs items-center gap-2 hover:text-black hover:bg-white transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                Course Generator
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </a>
            <Link href="/chat">
              <Button
                variant="outline"
                className="hidden text-xs md:inline-flex items-center gap-2 hover:text-black hover:bg-white transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                Chat With Mentor
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/guidance">
              <Button
                variant="outline"
                className="hidden text-xs md:inline-flex items-center gap-2 hover:text-black hover:bg-white transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                Mentor Guidance
              </Button>
              <Button variant="ghost" className=" md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex text-xs items-center gap-2 hover:text-black hover:bg-white transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <div className="border-1 hover:scale-110 ease-in-out p-2 rounded-sm flex  justify-center items-center  gap-2 hover:text-black hover:bg-white transition-all duration-300">

                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block "><p className="text-xs">
                  Growth Tools
                    </p></span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }} 
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
        </div>

      </nav>
    </header>
    </>

  );
};

export default Header;