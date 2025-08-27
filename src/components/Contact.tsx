"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type FormFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("⚠️ Fill all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email");
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("access_key", "21ae2b5a-cbce-4c1a-b7ba-d7ac91da481c");
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("subject", formData.subject);
      fd.append("message", formData.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const result = await res.json();

      if (result.success) {
        toast.success("🎉 Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(result.message || "Error, try again");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section nav-offset">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="glass neon-ring rounded-2xl p-6"
        >
          <h2 className="text-3xl font-bold neon-text">Let&apos;s Work Together</h2>
          <p className="mt-2 text-[var(--text-muted)]">Tell me about your project — timeline, goals, and what success looks like.</p>
          <div className="mt-6 grid grid-cols-1 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-lg bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.35)] px-3 py-3"
              placeholder="Name"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.35)] px-3 py-3"
              placeholder="Email"
              type="email"
            />
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="rounded-lg bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.35)] px-3 py-3"
              placeholder="Subject"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="rounded-lg bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.35)] px-3 py-3"
              placeholder="Message"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 w-full rounded-xl bg-[var(--primary)] px-5 py-3 text-black font-semibold shadow-[var(--glow-lg)] cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl neon-ring p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_30%_30%,rgba(188,19,254,0.2),transparent),radial-gradient(300px_300px_at_80%_70%,rgba(0,255,255,0.15),transparent)]" />
          <div className="relative">
            <h3 className="text-2xl font-semibold">Connect</h3>
            <div className="mt-3 flex flex-wrap gap-4 text-[var(--text-muted)]">
              <a
                href="https://www.linkedin.com/in/nitinCMgupta/"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[var(--primary)] underline decoration-transparent hover:decoration-[var(--primary)] decoration-2 underline-offset-4"
              >
                LinkedIn
              </a>
              <span className="opacity-60">|</span>
              <a
                href="https://www.instagram.com/nitin.shh_"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[var(--primary)] underline decoration-transparent hover:decoration-[var(--primary)] decoration-2 underline-offset-4"
              >
                Instagram
              </a>
              <span className="opacity-60">|</span>
              <a
                href="https://x.com/CMNitingupta"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-[var(--primary)] underline decoration-transparent hover:decoration-[var(--primary)] decoration-2 underline-offset-4"
              >
                X (Twitter)
              </a>
            </div>
            <a
              href="mailto:nitincmgupta@email.com"
              className="mt-4 inline-block text-[var(--text-muted)] hover:text-[var(--primary)]"
            >
              nitincmgupta@email.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
