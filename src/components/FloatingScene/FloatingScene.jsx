import { useRef } from 'react';
import floatingItems from '../../data/floatingItems';
import { FloatingItem } from './FloatingItem';
import { useIsMobile } from '../../hooks/useIsMobile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './FloatingScene.module.css';

export function FloatingScene() {
  const sceneRef = useRef(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const items = floatingItems.filter((item) => !(isMobile && item.hideOnMobile));

  return (
    <div className={styles.scene} ref={sceneRef}>
      {items.map((item) => (
        <FloatingItem
          key={item.id}
          item={item}
          sceneRef={sceneRef}
          disableDrag={isMobile}
          disableDrift={prefersReducedMotion}
        />
      ))}
    </div>
  );
}
