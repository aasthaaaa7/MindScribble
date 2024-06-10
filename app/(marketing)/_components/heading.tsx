"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4 text-left md:ml-10 mt-16">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
        Enhance your note-taking experience with streamlined sharing capabilities. Welcome to <span className="underline">MindScribble</span>
      </h1>
      <br />
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        MindScribble is a workspace where you can <br /> seamlessly capture and organize your ideas with ease.
      </h3>
      <br />
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter MindScribble
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get MindScribble free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
