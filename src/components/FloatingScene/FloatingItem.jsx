import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import styles from './FloatingItem.module.css';

export function FloatingItem({ item, sceneRef, disableDrag, disableDrift }) {
  const controls = useAnimationControls();
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (disableDrift) {
      controls.set({ x: 0, y: 0, rotate: 0 });
      return;
    }
    const { range, duration, rotate } = item.drift;
    controls.start({
      x: [0, range, -range * 0.6, 0],
      y: [0, -range * 0.8, range * 0.5, 0],
      rotate: [0, rotate, -rotate, 0],
      transition: { duration, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [controls, disableDrift, item.drift]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    controls.stop();
  };

  return (
    <motion.div
      className={styles.item}
      style={{
        left: `${item.initial.xPct}%`,
        top: `${item.initial.yPct}%`,
        width: item.size,
        height: item.size,
        marginLeft: -item.size / 2,
        marginTop: -item.size / 2,
        zIndex: item.zIndex ?? 1,
      }}
      animate={controls}
      drag={!disableDrag}
      dragConstraints={sceneRef}
      dragElastic={0.12}
      dragMomentum={false}
      onDragStart={handleDragStart}
      whileDrag={{ scale: 1.12 }}
      whileHover={disableDrag ? undefined : { scale: 1.06 }}
      aria-hidden="true"
    >
      <img
        src={item.image}
        alt=""
        className={item.framed ? `${styles.icon} ${styles.framed}` : styles.icon}
        draggable="false"
      />
    </motion.div>
  );
}
