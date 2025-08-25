"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

type FormFields = { name: string; email: string; subject: string; message: string };

export default function Contact() {
  const { register, handleSubmit, reset } = useForm<FormFields>();
  const onSubmit = (data: FormFields) => {
    console.log("contact:", data);
    reset();
  };

  return (
    <section id="contact" className="section nav-offset">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
        <form onSubmit={handleSubmit(onSubmit)} className="glass neon-ring rounded-2xl p-6">
          <h2 className="text-3xl font-bold neon-text">Let&apos;s Work Together</h2>
          <div className="mt-6 grid grid-cols-1 gap-4">
            <input className="rounded-lg bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.35)] px-3 py-3" placeholder="Name" {...register("name", { required: true })} />
            <input className="rounded-lg bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.35)] px-3 py-3" placeholder="Email" type="email" {...register("email", { required: true })} />
            <input className="rounded-lg bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.35)] px-3 py-3" placeholder="Subject" {...register("subject")} />
            <textarea rows={6} className="rounded-lg bg-[rgba(26,11,31,0.6)] border border-[rgba(188,19,254,0.35)] px-3 py-3" placeholder="Message" {...register("message", { required: true })} />
          </div>
          <button type="submit" className="mt-5 rounded-xl bg-[var(--primary)] px-5 py-3 text-black font-semibold shadow-[var(--glow-lg)]">Send Message</button>
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
            <p className="mt-3 text-[var(--text-muted)]">LinkedIn | GitHub | Twitter</p>
            <p className="mt-4 text-[var(--text-muted)]">nitincmgupta@email.com</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


