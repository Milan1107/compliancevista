import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(55, 198, 67, 0.08)" }}
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(55, 198, 67, 0.08)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-md"
      >
        {/* 404 Number */}
        <motion.h1
          className="text-7xl md:text-8xl font-bold mb-4"
          style={{ color: "#37C643" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          404
        </motion.h1>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Page Not Found</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border text-foreground transition-all duration-300 font-medium"
            style={{
              backgroundColor: "rgba(55, 198, 67, 0.1)",
              borderColor: "rgba(55, 198, 67, 0.3)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(55, 198, 67, 0.2)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#37C643";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(55, 198, 67, 0.1)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(55, 198, 67, 0.3)";
            }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </motion.button>

          {/* Home Button */}
          <motion.button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium text-black"
            style={{ backgroundColor: "#37C643" }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(55,198,67,0.4)")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.boxShadow = "none")
            }
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-4 h-4" />
            Return Home
          </motion.button>
        </motion.div>

        {/* Path Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-xs md:text-sm text-muted-foreground break-all"
        >
          Requested path:{" "}
          <span className="font-mono" style={{ color: "#37C643" }}>
            {location.pathname}
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;