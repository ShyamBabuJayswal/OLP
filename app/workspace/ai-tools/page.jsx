"use client";

import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const tools = [
  {
    id: 1,
    name: "Image Enhancer",
    description: "Improve image resolution using AI algorithms.",
    image: "/download.jpg",
    url: "https://www.cutout.pro/photo-enhancer-sharpener-upscaler-image",
  },
  {
    id: 2,
    name: "Text Summarizer",
    description: "Quickly summarize large articles into short paragraphs.",
    image: "/download.jpg",
    url: "https://quillbot.com/summarize",
  },
  {
    id: 3,
    name: "AI Chat Bot",
    description: "An AI-powered chatbot that answers user queries in real-time.",
    image: "/download.jpg",
    url: "https://chatgpt.com/",
  },
];

export default function AiToolPage() {
  return (
    <div className="px-6 py-12 md:px-20 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-bold mb-10 text-center">Explore AI Tools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-card rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition"
          >
            <Image
              src={tool.image}
              alt={tool.name}
              width={400}
              height={250}
              className="rounded-lg object-cover aspect-video mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {tool.description}
            </p>

            <Link
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto w-full"
            >
              <button className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
                <PlayCircle className="w-4 h-4" />
                Try Tool
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
