import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { FloatingScene } from './components/FloatingScene/FloatingScene';
import { LetterEnvelope } from './components/Letter/LetterEnvelope';
import { VinylPlayer } from './components/VinylPlayer/VinylPlayer';
import { SpiderMan } from './components/SpiderMan/SpiderMan';
import { SpiderMessage } from './components/SpiderMan/SpiderMessage';
import { ScrollHint } from './components/SpiderMan/ScrollHint';
import styles from './App.module.css';

const MESSAGE_DURATION_MS = 2600;
const SCROLL_HINT_DELAY_MS = 5000;
const SCROLL_PX_THRESHOLD = 4;

function rectsOverlap(a, b) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpiderBlocking, setIsSpiderBlocking] = useState(false);
  const [showSpiderMessage, setShowSpiderMessage] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const envelopeRef = useRef(null);
  const spiderRef = useRef(null);
  const hasScrolledRef = useRef(false);

  const { scrollYProgress } = useScroll();

  // Real geometry, not a guessed scroll threshold, so this stays correct
  // regardless of viewport size or where the envelope actually renders.
  useMotionValueEvent(scrollYProgress, 'change', () => {
    requestAnimationFrame(() => {
      const spider = spiderRef.current;
      const envelope = envelopeRef.current;
      if (!spider || !envelope || !hasScrolledRef.current) {
        setIsSpiderBlocking(false);
        return;
      }
      setIsSpiderBlocking(rectsOverlap(spider.getBoundingClientRect(), envelope.getBoundingClientRect()));
    });
  });

  useEffect(() => {
    if (!showSpiderMessage) return;
    const timer = setTimeout(() => setShowSpiderMessage(false), MESSAGE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [showSpiderMessage]);

  // The scroll spacer that lets Spider-Man drop only exists once the scene
  // mounts, so re-zero the scroll right then too — not just on initial load.
  useEffect(() => {
    if (isLoaded) window.scrollTo(0, 0);
  }, [isLoaded]);

  // Detect a real scroll via the browser's own scrollY, not framer-motion's
  // derived progress — that value can read a stale/bogus number for one
  // tick right when the tall spacer below first mounts (a content-height
  // change, not an actual scroll), which falsely looked like "the user
  // scrolled" and dropped Spider-Man in immediately on load.
  useEffect(() => {
    if (!isLoaded) return;
    const handleScroll = () => {
      if (!hasScrolledRef.current && window.scrollY > SCROLL_PX_THRESHOLD) {
        hasScrolledRef.current = true;
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  // Nudge her toward the scroll interaction if she hasn't found it yet.
  useEffect(() => {
    if (!isLoaded || hasScrolled) {
      setShowScrollHint(false);
      return;
    }
    const timer = setTimeout(() => setShowScrollHint(true), SCROLL_HINT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isLoaded, hasScrolled]);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <LoadingScreen onFinish={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {isLoaded && (
        <>
          <main className={styles.scene}>
            <FloatingScene />
            <LetterEnvelope envelopeRef={envelopeRef} blocked={isSpiderBlocking} />
            <VinylPlayer />
            <SpiderMan
              scrollYProgress={scrollYProgress}
              spiderRef={spiderRef}
              onSayHi={() => setShowSpiderMessage(true)}
              hasScrolled={hasScrolled}
            />
          </main>
          <SpiderMessage visible={showSpiderMessage} />
          <ScrollHint visible={showScrollHint} />
          <div className={styles.scrollSpacer} aria-hidden="true" />
        </>
      )}
    </>
  );
}

export default App;
