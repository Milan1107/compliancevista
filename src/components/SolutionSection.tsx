import { FileCheck, AlertTriangle, GitBranch, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const solutions = [
  {
    icon: "chart",
    image: "/company-images/cv-key-capabilities-features.webp",
    title: "Unified Compliance Dashboard",
    desc: "Get a single-pane view of your entire compliance landscape. Monitor all regulatory requirements, policy adherence, and audit readiness from one centralized dashboard built natively in Salesforce.",
    benefits: ["Real-time compliance status", "Custom KPI tracking", "Executive reporting"],
  },
  {
    icon: FileCheck,
    image: "/company-images/cv-key-capabilities-compliance-testing.webp",
    title: "Automated Audit Trails",
    desc: "Eliminate manual documentation with fully automated audit trails. Every action, approval, and change is captured automatically, making audit preparation effortless and comprehensive.",
    benefits: ["Complete audit history", "Automated evidence capture", "Report generation"],
  },
  {
    icon: AlertTriangle,
    image: "/company-images/cv-key-capabilities-audit-risk.webp",
    title: "Risk & Issue Management",
    desc: "Proactively identify, assess, and mitigate compliance risks. Our intelligent risk scoring engine helps you prioritize issues and track remediation efforts in real-time.",
    benefits: ["Risk scoring automation", "Remediation workflow", "Exception tracking"],
  },
  {
    icon: GitBranch,
    image: "/company-images/cv-key-capabilities-vendor-risk.webp",
    title: "Workflow & Approval Automation",
    desc: "Design and deploy custom compliance workflows with multi-level approval chains. Automate reminders, escalations, and sign-off management to keep everything on track.",
    benefits: ["Custom approval chains", "Automated reminders", "Sign-off management"],
  },
];

const SolutionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalItems = solutions.length;

  // Auto-carousel every 2.5 seconds, but pauses on hover
  useEffect(() => {
    if (isHovered) return; // Don't auto-scroll when hovering

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered, totalItems]);

  const active = solutions[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-br from-sky-50/40 via-white to-blue-50/30 py-16 sm:py-20 md:py-24"
    >
      {/* Subtle decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl -z-10" />

      <div className="container relative px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">
              Our Solution
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 px-4 mt-4">
            How ComplianceVista Solves This
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4 mt-3">
            Comprehensive solutions for every compliance challenge
          </p>
        </motion.div>

        <div 
          className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Visual */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-auto md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-slate-200"
            >
              <img
                src={active.image}
                alt={`ComplianceVista ${active.title} - ${active.desc.substring(0, 80)}...`}
                loading="lazy"
                decoding="async"
                width={480}
                height={384}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 flex flex-col">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-2 md:space-y-3 h-auto md:h-80 lg:h-96 flex flex-col shadow-sm"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#37C643]">{active.title}</h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mt-1 mb-2">{active.desc}</p>
              <ul className="space-y-2 md:space-y-3">
                {active.benefits.map((b, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm md:text-base text-slate-700">
                    <div className="w-5 h-5 rounded-lg bg-[#37C643]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-[#37C643]" />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
