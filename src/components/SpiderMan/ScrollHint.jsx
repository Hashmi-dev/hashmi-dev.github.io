import { AnimatePresence, motion } from 'framer-motion';
import styles from './ScrollHint.module.css';

export function ScrollHint({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.hint}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <span className={styles.chevron}>&#8595;</span>
          <span>Scroll down</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
