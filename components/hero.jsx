"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
      <div className="space-y-6 mx-auto text-center">
  <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl gradient-text">
    Your AI Career Coach for
    <br />
    Professional Success
  </h1>
  <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
    Advance your career with personalized guidance, interview prep, and
    AI-powered tools for job success.
  </p>
</div>


        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 border-1 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out hover:text-black hover:bg-white">
              Get Started 
            </Button>
          </Link>
          <Link href="https://youtube.com/shorts/sFng9lZuKQk?si=WyZsebj-GIpgwz5U">
            <Button size="lg" variant="outline" className="px-8 hover:cursor-pointer transition-all duration-300 ease-in-out hover:text-black hover:bg-white">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;