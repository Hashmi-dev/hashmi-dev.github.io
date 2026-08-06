import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MaroonHeart } from '../icons/MaroonHeart';
import { LetterModal } from './LetterModal';
import styles from './LetterEnvelope.module.css';

export function LetterEnvelope({ envelopeRef, blocked }) {
  const [isOpen, setIsOpen] = useState(false);
  const sealButtonRef = useRef(null);

  const handleOpen = () => {
    if (blocked) return;
    setIsOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <motion.div
        ref={envelopeRef}
        className={styles.envelope}
        animate={isOpen ? { scale: 0.94, opacity: 0.6 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.flap} />
        <span className={styles.toLine}>for Hadiya</span>
        <button
          ref={sealButtonRef}
          type="button"
          className={styles.seal}
          aria-label="Open the letter"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          disabled={blocked}
          onClick={handleOpen}
        >
          <MaroonHeart className={styles.sealIcon} />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && <LetterModal onClose={() => setIsOpen(false)} returnFocusRef={sealButtonRef} />}
      </AnimatePresence>
    </div>
  );
}
