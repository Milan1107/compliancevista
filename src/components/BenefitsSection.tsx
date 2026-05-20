import { motion } from "framer-motion";

const IconComponent = ({ iconType }: { iconType: string }) => {
  const iconMap: { [key: string]: string } = {
    dartboard: "/icons/SV-Dartboard.webp",
    lightning: "/icons/SV-LightningBolt.webp",
    magnifying: "/icons/SV-MagnifyingGlass.webp",
    chart: "/icons/SV-Chart.webp",
    clipboard: "/icons/SV-Clipboard.webp",
  };

  const altTextMap: { [key: string]: string } = {
    dartboard: "Dartboard icon representing risk minimization through compliance",
    lightning: "Lightning bolt icon representing operational efficiency gains",
    magnifying: "Magnifying glass icon representing improved compliance visibility",
    chart: "Chart icon representing business growth through compliance",
    clipboard: "Clipboard icon representing trust and reputation building",
  };

  return (
    <img
      src={iconMap[iconType]}
      alt={altTextMap[iconType] || iconType}
      loading="lazy"
      decoding="async"
      width={32}
      height={32}
      className="w-8 h-8 object-contain drop-shadow-md"
    />
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "dartboard",
      title: "Minimize Risk",
      description: "Proactively identify and mitigate compliance risks with real-time monitoring and automated assessments across your entire organization."
    },
    {
      icon: "lightning",
      title: "Increase Operational Efficiency",
      description: "Automate manual workflows and cut compliance cycle time significantly. Free your team to focus on strategic initiatives instead of repetitive tasks."
    },
    {
      icon: "magnifying",
      title: "Improve Visibility",
      description: "Gain complete transparency into your compliance landscape with centralized dashboards and real-time analytics for every department."
    },
    {
      icon: "chart",
      title: "Drive Business Growth",
      description: "Build compliance into your competitive strategy and accelerate market entry into regulated industries with confidence and authority."
    },
    {
      icon: "clipboard",
      title: "Build Trust & Reputation",
      description: "Demonstrate commitment to governance and ethical practices to customers, partners, and stakeholders for premium opportunities."
    }
  ];

  return (
    <section id="benefits" className="py-10 sm:py-12 md:py-14 relative overflow-hidden bg-white">
      {/* Background elements - Clean white background */}
      <div className="absolute inset-0 bg-white" />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-[#37C643]/10 border border-[#37C643]/30">
              <span className="text-xs md:text-sm font-semibold text-[#37C643]">
                Why Choose Us
              </span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-[#37C643] px-4 mt-4">
            Key Benefits
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Transform your compliance management and unlock competitive advantages
          </p>
        </motion.div>

        {/* Benefits Grid - Using flexbox to allow centering of the last two cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1.34rem)]"
              >
                {/* Card */}
                <div 
                  className={`relative rounded-2xl p-6 md:p-8 h-full overflow-hidden transition-all duration-300 bg-white ${
                    idx === 1 
                      ? 'border-2 border-[#37C643] shadow-lg' 
                      : 'border border-slate-200 shadow-sm hover:shadow-md'
                  }`}
                  aria-label={`${benefit.title}: ${benefit.description}`}
                  role="article"
                >

                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10 ${
                      idx === 1
                        ? 'bg-[#37C643]/15 border border-[#37C643]/30'
                        : 'bg-[#37C643]/10 border border-[#37C643]/20'
                    }`}
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <IconComponent iconType={benefit.icon} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-3 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed relative z-10">
                    {benefit.description}
                  </p>

                  {/* Bottom accent line - only for middle card */}
                  {idx === 1 && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#37C643]" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
