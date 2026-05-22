import logo from "/ComplianceVista-logo.svg";
import { Link, useNavigate } from "react-router-dom";

const FooterSection = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const navigateToSection = (sectionId: string) => {
    if (window.location.pathname === '/') {
      // If already on home page, scroll to section
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
  };

  return (
  <footer className="relative overflow-hidden bg-navy text-navy-foreground pt-6 sm:pt-8 pb-1">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

    <div className="container relative pb-0">
      <div className="container pt-4 sm:pt-6 pb-0">
        {/* Company Info - Full width */}
        <div className="flex flex-col items-start mb-8 sm:mb-10 md:hidden">
          <button 
            onClick={() => navigateToSection('home')} 
            aria-label="ComplianceVista - Return to Home"
            className="flex items-center gap-2.5 mb-6 hover:opacity-80 transition-opacity bg-none border-none cursor-pointer p-0"
          >
            <img src={logo} alt="ComplianceVista" width={180} height={40} className="h-8 sm:h-10 w-auto" />
          </button>
          <p className="text-sm text-navy-foreground/80 text-left leading-relaxed">
            Enterprise governance simplified.<br className="hidden sm:inline" /> Salesforce-native compliance by Ardira.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-8 sm:mb-10">
          {/* Company Info - Left (Col 1) - Desktop only */}
          <div className="hidden md:flex flex-col items-start md:col-span-1 lg:col-span-2">
            <button 
              onClick={() => navigateToSection('home')} 
              aria-label="ComplianceVista - Return to Home"
              className="flex items-center gap-2.5 mb-6 hover:opacity-80 transition-opacity bg-none border-none cursor-pointer p-0"
            >
              <img src={logo} alt="ComplianceVista" width={180} height={40} className="h-8 sm:h-10 w-auto" />
            </button>
            <p className="text-sm text-navy-foreground/80 text-left leading-relaxed">
              Enterprise governance simplified.<br className="hidden sm:inline" /> Salesforce-native compliance by Ardira.
            </p>
          </div>



          {/* Quick Links - Center (Col 3) */}
          <div className="flex flex-col md:items-center lg:items-center md:col-span-1 lg:col-span-1 col-span-1">
            <div className="w-fit">
              <h3 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li>
                  <button onClick={() => navigateToSection('overview')} aria-label="Navigate to Overview section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                    Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSection('features')} aria-label="Navigate to Features section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSection('benefits')} aria-label="Navigate to Benefits section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                    Benefits
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSection('use-cases')} aria-label="Navigate to Use Cases section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                    Use Cases
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToSection('contact')} aria-label="Navigate to Contact Us section" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 bg-none border-none cursor-pointer p-0">
                    Contact Us
                  </button>
                </li>
                <li>
                  <a href="https://resources.surveyvista.com/knowledge-base/compliancevista/user-guide" target="_blank" rel="noopener noreferrer" aria-label="Open User Guide resources" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
          </div>



          {/* Contact Info - Right (Col 5) */}
          <div className="flex flex-col md:items-start lg:items-end md:col-span-1 lg:col-span-1 col-span-1 min-w-0">
            <div className="w-full md:w-fit">
              <h3 className="font-bold text-white mb-4 sm:mb-6 text-sm sm:text-base">Contact Info</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <svg className="shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <a 
                    href="https://compliance-quest-page.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Visit www.compliancevista.com" 
                    className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 break-all"
                  >
                    www.compliancevista.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:support@ardira.com" aria-label="Email support at support@ardira.com" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300 break-all">
                    support@ardira.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#37B44A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href="tel:+16697776838" aria-label="Call us at 1.669.777.6838" className="text-navy-foreground/80 hover:text-primary transition-colors duration-300">
                    1.669.777.6838
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-foreground/10 py-3 flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-navy-foreground/60 order-2 md:order-1">
            © 2026 Ardira Corporation. All Rights Reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs order-1 md:order-2">
            <Link to="/terms-of-use" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
              Terms of Use
            </Link>
            <Link to="/privacy-policy" className="text-navy-foreground/60 hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default FooterSection;
/* Add this to your src/index.css or global CSS file */
