import { AnimatePresence, motion } from 'framer-motion';
import styles from './SpiderMessage.module.css';

export function SpiderMessage({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.p
          className={styles.message}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Scroll back up dear.
        </motion.p>
      )}
    </AnimatePresence>
  );
}
