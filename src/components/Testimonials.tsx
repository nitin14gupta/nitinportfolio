"use client";

import { motion } from "framer-motion";

const people = [
    { 
      name: "Rohit Mehra", 
      role: "Startup Founder", 
      quote: "Nitin understood our vision and turned it into a clean, functional app ahead of time. Communication was effortless." 
    },
    { 
      name: "Priya Nair", 
      role: "Product Manager", 
      quote: "Delivered a pixel-perfect website with zero bugs. The attention to detail and responsiveness stood out." 
    },
    { 
      name: "Arjun Sinha", 
      role: "CTO, SaaS Company", 
      quote: "Handled performance and scalability like a pro. We could trust him with complex requirements." 
    },
    { 
      name: "Neha Kapoor", 
      role: "UI/UX Designer", 
      quote: "Animations and interactions were smooth and elegant, exactly as we imagined in the mockups." 
    },
    { 
      name: "Siddharth Iyer", 
      role: "Software Engineer", 
      quote: "His code quality and problem-solving mindset made collaboration seamless. Learned a lot working with him." 
    },
    { 
      name: "Anjali Sharma", 
      role: "Founder, D2C Brand", 
      quote: "Professional, reliable, and creative. He built our e-commerce platform from scratch and we’d definitely work again." 
    },
  ];
  

export default function Testimonials() {
  return (
    <section className="section nav-offset">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold neon-text">What People Say</h2>
        <div className="mt-6 relative overflow-hidden rounded-2xl neon-ring">
          <div className="flex gap-4 py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {[...people, ...people].map((p, i) => (
              <motion.div
                key={i}
                className="min-w-[280px] max-w-[280px] rounded-xl glass border border-[rgba(188,19,254,0.25)] p-4"
                initial={{ x: 0 }}
                animate={{ x: [-0, -600] }}
                transition={{ repeat: Infinity, repeatType: "loop", duration: 18, ease: "linear" }}
              >
                <div className="text-sm text-[var(--accent-cyan)]">{p.role}</div>
                <div className="mt-1 font-semibold">{p.name}</div>
                <p className="mt-2 text-[var(--text-muted)]">“{p.quote}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


