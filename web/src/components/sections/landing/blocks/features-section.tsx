 "use client";

import { motion } from "framer-motion";
import { Code2, Boxes, Terminal, GitBranch, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Multi-Ecosystem Integration",
        description:
            "Seamlessly work across different blockchain ecosystems and development environments",
        icon: Boxes,
        color: "text-blue-500",
    },
    {
        title: "No-Code Builder",
        description: "Build complex applications without writing a single line of code",
        icon: Code2,
        color: "text-purple-500",
    },
    {
        title: "Arch Studio",
        description:
            "Professional-grade IDE and development environment built for the modern developer",
        icon: Terminal,
        color: "text-green-500",
    },
    {
        title: "Built-in Version Control",
        description: "Track changes and manage versions of your projects with our integrated version control system",
        icon: GitBranch,
        color: "text-orange-500",
    },
    {
        title: "GitHub Integration",
        description: "Connect and sync your projects directly with GitHub repositories for seamless collaboration",
        icon: Github,
        color: "text-cyan-500",
    },
];

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => (
  <motion.div
    key={feature.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
    className="p-6 rounded-2xl bg-zinc-800/50 backdrop-blur border border-zinc-700 hover:scale-105 transition-transform duration-300"
  >
    <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
    <p className="text-zinc-400">{feature.description}</p>
  </motion.div>
);

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
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

      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl font-bold text-white mb-4"
          >
            The Ultimate DevOps Platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            From project management to deployment, Arch provides everything you
            need to build, test, and ship your applications.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard feature={feature} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
