import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, FileText, Shield, BarChart3, Zap, Search, Smartphone } from "lucide-react";

const features = [
	{
		icon: "clipboard",
		title: "Policy Management",
		desc: "Centralized repository with version control and policy lifecycle management.",
		benefits: ["Version control", "Centralized storage", "Lifecycle tracking"],
	},
	{
		icon: "dartboard",
		title: "Access Control",
		desc: "Role-based permissions and segregation of duties for enterprise security.",
		benefits: ["Role-based access", "Duty segregation", "Audit trails"],
	},
	{
		icon: "chart",
		title: "Compliance Reporting",
		desc: "Pre-built reports for SOC2, ISO, GDPR and custom regulatory frameworks.",
		benefits: ["Pre-built reports", "Multi-framework", "Custom exports"],
	},
	{
		icon: "lightning",
		title: "Deadline Tracking",
		desc: "Automated compliance reminders and deadline management with escalations.",
		benefits: ["Auto reminders", "Escalations", "Real-time updates"],
	},
	{
		icon: "magnifying",
		title: "Audit Management",
		desc: "Evidence collection, audit trail management, and finding resolution.",
		benefits: ["Evidence tracking", "Audit trails", "Finding manager"],
	},
	{
		icon: "mobile",
		title: "Mobile Access",
		desc: "Manage compliance on-the-go with full mobile Salesforce experience-driven visibility.",
		benefits: ["Mobile app", "Full sync", "Offline support"],
	},
];

const IconComponent = ({ iconType }: { iconType: string }) => {
	const iconMap: { [key: string]: JSX.Element } = {
		clipboard: <FileText className="w-8 h-8" strokeWidth={1.5} />,
		dartboard: <Shield className="w-8 h-8" strokeWidth={1.5} />,
		chart: <BarChart3 className="w-8 h-8" strokeWidth={1.5} />,
		lightning: <Zap className="w-8 h-8" strokeWidth={1.5} />,
		magnifying: <Search className="w-8 h-8" strokeWidth={1.5} />,
		circular: <Smartphone className="w-8 h-8" strokeWidth={1.5} />,
		mobile: <Smartphone className="w-8 h-8" strokeWidth={1.5} />
	};

	return (
		<div className="drop-shadow-md flex items-center justify-center w-full h-full">
			{iconMap[iconType] || iconMap.clipboard}
		</div>
	);
};

const FeaturesSection = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	// Show 2 cards at a time, so carouselIndex goes from 0 to 2 (3 groups total)
	const carouselIndex = Math.floor(activeIndex / 2);
	const visibleFeatures = [features[activeIndex], features[activeIndex + 1]].filter(Boolean);

	// Auto-carousel with 3-second interval, advancing by 2 each time
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prev) => {
				const nextIndex = prev + 2;
				return nextIndex >= features.length ? 0 : nextIndex;
			});
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const goToPrevious = () => {
		setActiveIndex((prev) => (prev === 0 ? Math.max(0, features.length - 2) : prev - 2));
	};

	const goToNext = () => {
		setActiveIndex((prev) => {
			const nextIndex = prev + 2;
			return nextIndex >= features.length ? 0 : nextIndex;
		});
	};

	return (
		<section id="features" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-green-50/50 via-white to-emerald-50/40">
			{/* Subtle accent decorations */}
			<div className="absolute top-0 left-0 w-72 h-72 bg-green-100/20 rounded-full blur-3xl -z-10" />
			<div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/25 rounded-full blur-3xl -z-10" />

			<div className="container relative z-10 px-4 sm:px-6">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="text-center mb-12 md:mb-16 lg:mb-20 px-4"
				>
					<div className="inline-block">
						<span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">
							Powerful Capabilities
						</span>
					</div>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 text-slate-900 px-4 mt-4">
						Enterprise Features
					</h2>
					<p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
						Comprehensive compliance management tools designed for modern enterprises.
					</p>
				</motion.div>

				{/* Carousel Container - 2 Cards Display */}
				<div className="max-w-6xl mx-auto">
					{/* Features Grid - 2 cards side by side, full width on mobile */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
						{visibleFeatures.map((feature, idx) => (
							<motion.div
								key={activeIndex + idx}
								initial={{ opacity: 0, scale: 0.95, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.5, delay: idx * 0.1 }}
								className="group relative h-[360px] sm:h-[320px] md:h-[300px] lg:h-[300px]"
							>
								<div className="card-hover-primary flex flex-col rounded-2xl border border-slate-200 bg-white p-6 md:p-8 h-full relative overflow-hidden shadow-sm">

									{/* Icon and title */}
									<div className="flex items-center gap-4 mb-3 flex-row text-left">
										<motion.div
											className="card-icon w-14 h-14 rounded-2xl bg-[#37C643]/10 border border-[#37C643]/20 flex items-center justify-center flex-shrink-0 transition-transform"
										>
											<div className="text-[#37C643] flex items-center justify-center w-full h-full">
												<IconComponent iconType={feature.icon} />
											</div>
										</motion.div>
										<motion.h3 className="text-lg md:text-xl font-bold text-slate-900">
											{feature.title}
										</motion.h3>
									</div>

									{/* Description Section */}
									<motion.p className="text-sm md:text-base text-slate-600 leading-relaxed mb-3 font-medium">
										{feature.desc}
									</motion.p>

									{/* Benefits Section */}
									<motion.div className="mt-4">
										<div className="space-y-2">
											{feature?.benefits && feature.benefits.length > 0 ? (
												feature.benefits.map((benefit, bidx) => (
													<motion.div
														key={bidx}
														className="flex items-start gap-2 text-xs md:text-sm"
														initial={{ opacity: 0, x: -10 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ delay: 0.2 + bidx * 0.1 }}
													>
														<CheckCircle className="w-4 h-4 text-[#37C643] flex-shrink-0 mt-0.5" />
														<span className="text-slate-700 leading-tight">{benefit}</span>
													</motion.div>
												))
											) : null}
										</div>
									</motion.div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Navigation Controls */}
					<div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
						{/* Previous Button */}
						<motion.button
							onClick={goToPrevious}
							aria-label="Previous features"
							className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#37C643] hover:bg-[#37C643]/5 transition-all duration-300"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#37C643]" />
						</motion.button>

						{/* Dots indicator - 3 groups for 6 cards shown 2 at a time */}
						<div className="flex gap-1.5 md:gap-2">
							{[0, 1, 2].map((index) => (
								<motion.button
									key={index}
									onClick={() => setActiveIndex(index * 2)}
									aria-label={`Go to features group ${index + 1}`}
									style={{ minHeight: 'unset' }}
									className={`transition-all duration-300 rounded-full relative min-h-0 ${
										carouselIndex === index
											? "bg-[#37C643] w-5 md:w-6 h-2 md:h-2.5"
											: "bg-slate-300 w-2 md:w-2.5 h-2 md:h-2.5 hover:bg-slate-400"
									}`}
									whileHover={{ scale: 1.2 }}
								>
									{/* Invisible touch target expansion */}
									<span className="absolute inset-[-8px] md:inset-[-12px]" aria-hidden="true" />
								</motion.button>
							))}
						</div>

						{/* Next Button */}
						<motion.button
							onClick={goToNext}
							aria-label="Next features"
							className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-[#37C643] hover:bg-[#37C643]/5 transition-all duration-300"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#37C643]" />
						</motion.button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
