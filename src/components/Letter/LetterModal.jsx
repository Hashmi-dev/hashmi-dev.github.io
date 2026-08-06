import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './LetterModal.module.css';

export function LetterModal({ onClose, returnFocusRef }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      returnFocusRef?.current?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.paper}
        role="dialog"
        aria-modal="true"
        aria-labelledby="letter-heading"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.close}
          aria-label="Close the letter"
          onClick={onClose}
        >
          &times;
        </button>

        <h1 id="letter-heading" className={styles.heading}>
          My Hadiya,
        </h1>

        <div className={styles.body}>
          <p>
            {/* Placeholder text — replace with your own words before sending. */}
            I wanted you to have something to open even from this far away, so here it is: a small
            corner of the internet that's just for you, scattered with the little things that
            remind me of you. I hope it makes you smile, and I hope it makes you feel a little closer to me.
          </p>
          <p>
            This distance is hard, but I want you to know that every day, in every way, I am thinking of you.
            Whether it's the way your scent lingers on my clothes, or the warmth of your hand in mine, you are always with me.
            I love the way your eyes light up when you talk about your dreams, and the way your heart is so full of kindness and love.
            It's in the way you care for others, the way you chase your passions, and the way you make me feel like the happiest person in the world.
            The tought and care you put into everything you do, making everyone feel loved around you. You truly are the most beautiful person I have ever met, inside and out.
          </p>
          <p>Every mile of it, still yours,</p>
        </div>

        <p className={styles.signature}>— Your Ahmad</p>
      </motion.div>
    </motion.div>
  );
}
