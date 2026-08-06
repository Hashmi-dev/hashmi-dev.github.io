import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './LoadingScreen.module.css';

const TEXT = 'To Hadiya.';
const MIN_DWELL_MS = 2200;

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.2 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function LoadingScreen({ onFinish }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(onFinish, MIN_DWELL_MS);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className={styles.screen}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefersReducedMotion ? (
        <span className={styles.text}>{TEXT}</span>
      ) : (
        <motion.span
          className={styles.text}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={TEXT}
        >
          {TEXT.split('').map((char, i) => (
            <motion.span key={i} variants={letterVariants} className={styles.char} aria-hidden="true">
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.span>
      )}
    </motion.div>
  );
}
