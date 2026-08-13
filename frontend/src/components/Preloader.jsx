import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/LanguageContext";

export const Preloader = () => {
  const { t } = useI18n();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2300);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(timer); document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0A0A0A]"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 grain-overlay opacity-[0.12] pointer-events-none" />

          <motion.div
            className="relative bg-white px-8 py-6 rounded-sm overflow-hidden"
            initial={{ scale: 0.85, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/logo-trim.png" alt="My Labels UAE" className="h-16 sm:h-20 w-auto object-contain" />
            {/* red wipe sweeping across the logo */}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: "110%" }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />
          </motion.div>

          <motion.div
            className="mt-8 h-[3px] w-56 bg-white/15 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="mt-4 overline text-primary tracking-[0.35em]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {t("common.alwaysOnTime")}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
