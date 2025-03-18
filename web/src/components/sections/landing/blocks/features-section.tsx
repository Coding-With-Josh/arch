import { motion } from "framer-motion"
import { Code2, Boxes, Terminal } from "lucide-react"

const features = [
    {
        title: "Multi-Ecosystem Integration",
        description: "Seamlessly work across different blockchain ecosystems and development environments",
        icon: Boxes,
        color: "text-blue-500"
    },
    {
        title: "No-Code Builder",
        description: "Build complex applications without writing a single line of code",
        icon: Code2,
        color: "text-purple-500"
    },
    {
        title: "Arch Studio",
        description: "Professional-grade IDE and development environment built for the modern developer",
        icon: Terminal,
        color: "text-green-500"
    }
]

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Add tech pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Add floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-2xl bg-zinc-800/50 backdrop-blur border border-zinc-700"
            >
              <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-zinc-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
