"use client";
import BgImage from "@/assets/imgs/Join/RIVOFIED7866.webp";
import { useState } from "react";
import { Button } from "../ui/button";

export default function JoinRivoPage() {
  const [type, setType] = useState<"job" | "model" | "feedback">("job");

  return (
    <main className="w-full min-h-screen">
      {/* HERO / BACKGROUND */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 text-white"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),
            url(${BgImage.src})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold">JOIN RIVO</h1>
            <p className="mt-4 opacity-90">
              Work with us, collaborate with us, or share your experience.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            <TabButton
              active={type === "job"}
              onClick={() => setType("job")}
              label="Work at RIVO"
            />
            <TabButton
              active={type === "model"}
              onClick={() => setType("model")}
              label="Models & Creators"
            />
            <TabButton
              active={type === "feedback"}
              onClick={() => setType("feedback")}
              label="Feedback"
            />
          </div>

          {/* Form Card */}
          <div className="bg-white/95 text-neutral-900 rounded-2xl p-6 md:p-8 shadow-xl">
            {type === "job" && <JobForm />}
            {type === "model" && <ModelForm />}
            {type === "feedback" && <FeedbackForm />}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- Components ---------------- */

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rel="noopener noreferrer"
        className="relative
        w-full sm:w-auto
        rounded-full
        border border-white/30
        bg-white/5
        backdrop-blur-sm
        text-white
        px-8 py-3

        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        hover:bg-white/30
        transition-all duration-200

        before:absolute
        before:inset-0
        before:rounded-full
        before:bg-linear-to-b
        before:from-white/40
        before:to-transparent
        before:opacity-70
        before:pointer-events-none

        after:absolute
        after:inset-0
        after:rounded-full
        after:ring-1
        after:ring-white/20
        after:pointer-events-none

        active:scale-95"
        ${
          active
            ? "scale-105 bg-white/30 text-black font-semibold"
            : "scale-95"
        }`}
    >
      {label}
    </button>
  );
}

/* ---------------- JOB FORM ---------------- */

function JobForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Apply for a job</h2>

      <Input label="Full name" placeholder="Your name" />
      <Input label="Phone number" placeholder="01xxxxxxxxx" />
      <Input label="Age" type="number" placeholder="+18" />
      <Select
        label="Position"
        options={["Barista", "Cashier", "Kitchen", "Service", "Other"]}
      />
      <Textarea label="Previous experience (optional)" />

      <button className="w-full mt-4 py-3 rounded-xl bg-neutral-900 text-white font-bold">
        Submit application
      </button>
    </form>
  );
}

/* ---------------- MODEL FORM ---------------- */

function ModelForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Models & creators</h2>

      <Input label="Full name" placeholder="Your name" />
      <Input label="Instagram / TikTok link" placeholder="https://instagram.com/yourhandle" />
      <Input label="Phone number" placeholder="01xxxxxxxxx" />
      <Textarea label="Tell us about yourself" />

      <button className="w-full mt-4 py-3 rounded-xl bg-neutral-900 text-white font-bold">
        Send request
      </button>
    </form>
  );
}

/* ---------------- FEEDBACK FORM ---------------- */

function FeedbackForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Share your feedback</h2>

      <Input label="Name (optional)" placeholder="Your name" />
      <Select
        label="Feedback type"
        options={["Suggestion", "Complaint", "Compliment"]}
      />
      <Textarea label="Your message" />

      <button className="w-full mt-4 py-3 rounded-xl bg-neutral-900 text-white font-bold">
        Send feedback
      </button>
    </form>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Input({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
      />
    </div>
  );
}

function Textarea({ label }: { label: string }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <textarea
        rows={4}
        className="mt-1 w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <select className="mt-1 w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
