"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Arch has revolutionized our development workflow. The multi-chain integration is seamless.",
    author: "Sarah Chen",
    role: "CTO at BlockMatrix",
    image: "https://i.pravatar.cc/150?img=1",
    company: {
      logo: "/logos/blockmatrix.svg",
      name: "BlockMatrix",
    },
  },
  {
    quote:
      "The no-code builder saved us months of development time. It's a game-changer.",
    author: "Michael Peterson",
    role: "Lead Developer",
    image: "https://i.pravatar.cc/150?img=2",
    company: {
      logo: "/logos/defitech.svg",
      name: "DefiTech",
    },
  },
  {
    quote: "Best developer tools I've used in years. The IDE is incredibly powerful.",
    author: "Jessica Kumar",
    role: "Software Architect",
    image: "https://i.pravatar.cc/150?img=3",
    company: {
      logo: "/logos/webthree.svg",
      name: "WebThree",
    },
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
    className={cn(
      "relative p-6 rounded-2xl",
      "bg-gradient-to-b from-zinc-800/50 to-zinc-900/50",
      "border border-zinc-800 hover:scale-105 transition-transform duration-300",
      "backdrop-blur-xl shadow-2xl"
    )}
  >
    <div className="absolute -top-4 -left-4">
      <span className="text-5xl text-zinc-700">&quot;</span>
    </div>

    <blockquote className="relative">
      <p className="text-lg text-zinc-300 mb-6">{testimonial.quote}</p>
      <footer className="flex items-center gap-4">
        <Image
          src={testimonial.image}
          alt={testimonial.author}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <div className="font-semibold text-white">{testimonial.author}</div>
          <div className="text-sm text-zinc-400">{testimonial.role}</div>
        </div>
      </footer>
    </blockquote>
  </motion.div>
);

export function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 20, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -20, 0],
            rotate: [0, -360, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      </div>

      {/* Grid Pattern */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" /> */}

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Trusted by Developers Worldwide
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Join thousands of developers and teams who are building the future
            with Arch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard testimonial={testimonial} index={index} key={testimonial.author} />
          ))}
        </div>

        {/* Logos Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-zinc-800"
        >
          <p className="text-center text-sm text-zinc-500 mb-8">
            Trusted by teams from world-class companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-50">
            {/* Add company logos here */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
