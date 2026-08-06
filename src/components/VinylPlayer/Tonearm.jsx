import styles from './VinylPlayer.module.css';

export function Tonearm({ isPlaying }) {
  return (
    <>
      <div className={styles.tonearmMount} aria-hidden="true" />
      <div className={`${styles.tonearm} ${isPlaying ? styles.tonearmDown : ''}`} aria-hidden="true">
        <div className={styles.tonearmShaft} />
        <div className={styles.tonearmHead} />
      </div>
    </>
  );
}
