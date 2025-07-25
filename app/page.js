"use client";

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleProceed = () => {
    router.push("/workspace");
  };
  const testimonials = [
  {
    name: "Riya Sharma",
    title: "Frontend Developer, Bangalore",
    image: "/pic.jpg",
    feedback: "This platform helped me gain confidence and secure my dream job in tech.",
  },
  {
    name: "Aman Mehta",
    title: "Data Analyst, Pune",
    image: "/pic2.jpg",
    feedback: "The curriculum was practical, up‑to‑date, and easy to follow over weekends.",
  },
  {
    name: "Neha Verma",
    title: "Cloud Engineer, Delhi",
    image: "/pic3.jpg",
    feedback: "I earned four certifications and enhanced my skills through hands‑on projects.",
  },
];


  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Header with Logo & UserButton */}
      <header className="flex items-center justify-between px-6 md:px-20 py-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={130} height={50} />
        </Link>
        <UserButton />
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-6 md:pt-16 pb-12 relative">
        <div className="text-center md:text-left max-w-xl space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-sidebar-primary">
            Empower Your Learning Journey
          </h1>
          <p className="text-lg text-muted-foreground">
            Dive into interactive courses, master in‑demand technologies, and join a vibrant community of learners and mentors. Whether you're launching a new career or leveling up, our platform grows with you.
          </p>
          <button
            onClick={handleProceed}
            className="mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-sidebar-primary transition-all shadow"
          >
            Get Started
          </button>
        </div>

        <div className="mt-10 md:mt-0 max-w-md z-10">
          <Image
            src="/olp.webp"
            alt="Learning platform illustration"
            width={500}
            height={400}
            className="rounded-xl shadow-xl"
          />
        </div>
      </main>

      {/* Testimonials Section */}
    <div className="py-16">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {testimonials.map((t, index) => (
      <div key={index} className="bg-card rounded-lg shadow p-6 text-center space-y-4">
        <Image
          src={t.image}
          alt={t.name}
          width={80}
          height={80}
          className="rounded-full mx-auto"
        />
        <p className="text-muted-foreground italic">“{t.feedback}”</p>
        <h4 className="font-semibold">{t.name}</h4>
        <p className="text-xs text-muted-foreground">{t.title}</p>
      </div>
    ))}
  </div>
</div>



      {/* Footer Section */}
       <footer className="bg-sidebar-primary text-white py-8 px-6 md:px-20 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p>
              Email:{" "}
              <a href="mailto:shyambabu_jayswal@yahoo.com" className="underline">
                shyambabu_jayswal@yahoo.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+917084721408" className="underline">
                +91 7084721408
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Support & Help</h3>
            <p>Have questions or need help? We're here for you 24/7 via email or chat.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <p>Stay updated with tips, courses, and success stories on social media.</p>
            <div className="flex gap-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 cursor-pointer hover:opacity-80" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 cursor-pointer hover:opacity-80" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 cursor-pointer hover:opacity-80" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} HexSmith Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
