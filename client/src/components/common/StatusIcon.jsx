import { motion } from "framer-motion";
import { ReceiptRussianRuble } from "lucide-react";

export const StatusIcon = ({ status, color }) => {
  if (status === "PENDING") {
    return (
      <div className="flex items-center gap-1 mx-1">
        {[0, 0.2, 0.4].map((delay, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
            animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  if (status === "IN_PROGRESS") {
    return (
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 mx-1"
        viewBox="0  0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9" strokeOpacity="0.2" />
        <path d="M12 3a9 9 0 0 1 9 9" />
      </motion.svg>
    );
  }

  if (status === "DONE") {
    return (
      <svg
        className="w-8 h-8 mx-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.8))" }}
      >
        {/* Circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          strokeOpacity="0.25"
          strokeDasharray="4 6" // tạo nét đứt xoay quanh
          animate={{
            rotate: [0, 360], // xoay vòng
            scale: [1, 1.08, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Check */}
        <motion.path
          d="M6 12l4 4L18 8"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
            y: [0, -1, 0], // rung nhẹ theo trục Y
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    );
  }
};
