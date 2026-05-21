import { motion } from "framer-motion";
import { Shield, Zap, Eye, TrendingUp, Award } from "lucide-react";

const IconComponent = ({ iconType }: { iconType: string }) => {
  const iconMap: { [key: string]: JSX.Element } = {
    dartboard: <Shield className="w-8 h-8" strokeWidth={1.5} />,
    lightning: <Zap className="w-8 h-8" strokeWidth={1.5} />,
    magnifying: <Eye className="w-8 h-8" strokeWidth={1.5} />,
    chart: <TrendingUp className="w-8 h-8" strokeWidth={1.5} />,
    clipboard: <Award className="w-8 h-8" strokeWidth={1.5} />,
  };

  return (
    <div className="drop-shadow-md flex items-center justify-center w-full h-full">
      {iconMap[iconType] || iconMap.dartboard}
    </div>
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
    <section id="benefits" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-50">
      {/* Subtle accent decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-300/15 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 text-slate-900 px-4 mt-4">
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
                  className={`card-hover-primary relative rounded-2xl p-6 md:p-8 h-full overflow-hidden bg-white ${
                    idx === 1 
                      ? 'border border-slate-200 shadow-lg' 
                      : 'border border-slate-200 shadow-sm'
                  }`}
                  aria-label={`${benefit.title}: ${benefit.description}`}
                  role="article"
                >

                  {/* Icon */}
                  <div
                    className={`card-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform relative z-10 transform-none ${
                      idx === 1
                        ? 'bg-[#37C643]/15 border border-[#37C643]/30'
                        : 'bg-[#37C643]/10 border border-[#37C643]/20'
                    }`}
                  >
                    <div className="text-[#37C643] flex items-center justify-center w-full h-full">
                      <IconComponent iconType={benefit.icon} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-3 relative z-10 -mt-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed relative z-10">
                    {benefit.description}
                  </p>


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
