"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4 text-left md:ml-10">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
        Enhance your note-taking experience with streamlined sharing capabilities. Welcome to <span className="underline">MindScribble</span>
      </h1>
      <br></br>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        MindScribble is a workspace where you can <br /> seamlessly capture and organize your ideas with ease.
      </h3>
      <br></br>
      <Button>
        Enter MindScribble
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
