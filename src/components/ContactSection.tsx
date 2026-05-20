import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { useRecaptcha } from "../hooks/useRecaptcha";



const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loadRecaptcha, executeRecaptcha } = useRecaptcha();

  const formRef = useRef<HTMLFormElement>(null);
  const [rightSideHeight, setRightSideHeight] = useState<string>("auto");

  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current && window.innerWidth >= 768) {
        setRightSideHeight(`${formRef.current.offsetHeight}px`);
      } else {
        setRightSideHeight("auto");
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (formRef.current) {
      resizeObserver.observe(formRef.current);
    }

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      resizeObserver.disconnect();
    };
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[\d\s\-+()]+$/.test(form.phone)) e.phone = "Invalid phone number";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Execute reCAPTCHA V3
      const token = await executeRecaptcha("contact_form");

      // Send form data to PHP backend
      const API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact.php';

      const payload = {
        ...form,
        recaptcha_token: token,
        source_url: window.location.href
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      toast.success("Thank you! We'll be in touch shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#37C643]/40 focus:border-[#37C643] transition-all duration-300 ${errors[name] ? "border-red-500" : "border-slate-200"
    }`;

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-teal-50/40 via-white to-green-50/30">
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Subtle decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-100/20 rounded-full blur-3xl -z-10" />

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-xs md:text-sm font-semibold text-[#37C643] uppercase tracking-wider">
              Contact
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 px-4 mt-4">Get in Touch</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4 mt-3">
            Reach out to us and we'll respond as soon as possible
          </p>
        </motion.div>

        {/* Two Column Layout - Form Left (Sticky), Info + Map Right (Fixed Height) */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto items-start">
          {/* Form - Left Side - Sticky Position, Static Size */}
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-4 md:space-y-5 h-fit flex flex-col shadow-sm hover:shadow-md transition-all duration-300 md:sticky md:top-20"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">Your Name <span className="text-red-500">*</span></label>
              <input type="text" value={form.name} onFocus={loadRecaptcha} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass("name")} placeholder="John Doe" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">Your Email <span className="text-red-500">*</span></label>
              <input type="email" value={form.email} onFocus={loadRecaptcha} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass("email")} placeholder="john@company.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">Phone <span className="text-red-500">*</span></label>
              <input type="tel" value={form.phone} onFocus={loadRecaptcha} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass("phone")} placeholder="Enter your phone number" />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="flex-grow">
              <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wider">Your Message</label>
              <textarea value={form.message} onFocus={loadRecaptcha} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className={`${inputClass("message")} resize-none h-24 sm:h-32 md:h-40`} placeholder="Tell us about your compliance needs..." />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#37C643] text-white py-3 sm:py-4 rounded-full font-semibold overflow-hidden shadow-md hover:shadow-lg hover:shadow-[#37C643]/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 mt-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md text-sm sm:text-base"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Send"}
            </button>

            {/* reCAPTCHA Badge Notice */}
            <p className="text-xs text-slate-500 text-center mt-4">
              This site is protected by reCAPTCHA and the Google
              <br />
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#37C643] transition-colors">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-[#37C643] transition-colors">Terms of Service</a> apply.
            </p>
          </motion.form>

          {/* Right Side - Info + Map (Fixed Height matching form, Scrolls silently) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 overflow-hidden scrollbar-hide shadow-sm hover:shadow-md transition-all duration-300"
            style={{ maxHeight: rightSideHeight }}
          >
            {/* Contact Info Box - TOP */}
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
                Quick Contact
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
                Get in touch with a representative to see a demo or simply learn more about the product.
              </p>

              <div className="space-y-3 md:space-y-4">
                {/* Address */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=2040+Martin+Ave,+Santa+Clara,+CA+95050,+United+States"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#37C643] hover:bg-[#37C643]/5 transition-all duration-300 cursor-pointer no-underline"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#37C643]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#37C643]" />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <p className="font-bold text-slate-900">2040 Martin Ave, Santa Clara, CA</p>
                    <p className="text-slate-600">95050 United States</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+16697776838"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#37C643] hover:bg-[#37C643]/5 transition-all duration-300 cursor-pointer no-underline"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#37C643]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#37C643]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">1.669.777.6838</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@ardira.com"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#37C643] hover:bg-[#37C643]/5 transition-all duration-300 cursor-pointer no-underline"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#37C643]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#37C643]" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">info@ardira.com</span>
                </a>

                {/* Support Note */}
                <a
                  href="mailto:support@ardira.com"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-[#37C643] hover:bg-[#37C643]/5 transition-all duration-300 cursor-pointer no-underline"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#37C643]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#37C643]">?</span>
                  </div>
                  <div className="text-sm">
                    <p className="text-slate-600">For customer support, email us directly at</p>
                    <p><span className="text-slate-900 font-bold">support@ardira.com</span></p>
                  </div>
                </a>
              </div>
            </div>

            {/* Google Maps - BOTTOM */}
            <div className="rounded-lg overflow-hidden shadow-sm border border-slate-200 h-48 sm:h-56 md:h-64 w-full" style={{ minHeight: "224px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6342.08172427285!2d-121.96206399999998!3d37.36521!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fca3b29bd16bd%3A0x1b7e4bbf55b3700b!2s2040%20Martin%20Ave%2C%20Santa%20Clara%2C%20CA%2095050%2C%20USA!5e0!3m2!1sen!2sin!4v1775548501571!5m2!1sen!2sin"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ComplianceVista Office - Santa Clara, CA"
                style={{ border: "none", width: "100%", height: "100%", minHeight: "224px" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
