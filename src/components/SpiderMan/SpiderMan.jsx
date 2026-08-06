import { motion, useTransform } from 'framer-motion';
import styles from './SpiderMan.module.css';

// The thread pays out first as you scroll; the character himself stays
// hidden above the viewport a little longer, then catches up so both
// land together once you've scrolled all the way down.
const THREAD_RANGE = ['0vh', '42vh'];
const SPIDER_RANGE = ['-14vh', '42vh'];

export function SpiderMan({ scrollYProgress, spiderRef, onSayHi, hasScrolled }) {
  const threadHeight = useTransform(scrollYProgress, [0, 1], THREAD_RANGE);
  const spiderTop = useTransform(scrollYProgress, [0, 1], SPIDER_RANGE);

  // Hard gate on top of the scroll-driven position: no matter what the
  // scroll math says, he stays invisible and unclickable until a real
  // scroll has actually happened this session.
  return (
    <>
      <motion.div
        className={styles.thread}
        style={{ height: threadHeight, opacity: hasScrolled ? 1 : 0 }}
        aria-hidden="true"
      />
      <motion.button
        ref={spiderRef}
        type="button"
        className={styles.spider}
        style={{ top: spiderTop, opacity: hasScrolled ? 1 : 0, pointerEvents: hasScrolled ? 'auto' : 'none' }}
        tabIndex={hasScrolled ? 0 : -1}
        onClick={onSayHi}
        aria-label="Say hi to the crocheted Spider-Man"
      >
        <img src="/floating-images/Spiderman-crocheted.png" alt="" className={styles.spiderImg} draggable="false" />
      </motion.button>
    </>
  );
}
