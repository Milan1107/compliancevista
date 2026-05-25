import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CALENDLY_URL = "https://calendly.com/d/zzy-699-f8v/book-a-demo";

const CalendlyModal = ({ isOpen, onClose }: CalendlyModalProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/80 text-white hover:bg-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Spinner — only shown while iframe is loading, transparent bg */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
            </div>
          )}

          {/* Iframe — scrollable internally on small screens */}
          <motion.iframe
            src={`${CALENDLY_URL}?embed_domain=${window.location.hostname}&embed_type=Inline`}
            width="100%"
            frameBorder="0"
            title="Schedule a demo"
            scrolling="yes"
            onClick={(e) => e.stopPropagation()}
            onLoad={() => setIsLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              maxWidth: "1100px",
              height: "750px",
              border: "none",
              outline: "none",
              boxShadow: "none",
              borderRadius: "0",
              background: "transparent",
              margin: "0 16px",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;