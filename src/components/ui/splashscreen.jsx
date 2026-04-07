import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.8 }} // 2s turadi keyin yo‘qoladi
      className="fixed inset-0 z-[9999] bg-[#020617] flex items-center justify-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20, letterSpacing: "2px" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "6px" }}
        transition={{ duration: 1 }}
        className="text-white text-xl md:text-3xl font-light tracking-[6px]"
      >
        IPRO GROUP
      </motion.h1>
    </motion.div>
  );
};

export default SplashScreen;