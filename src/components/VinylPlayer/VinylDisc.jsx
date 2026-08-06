import styles from './VinylPlayer.module.css';

export function VinylDisc({ isPlaying, cover }) {
  return (
    <div className={styles.discWrap}>
      <div className={`${styles.disc} ${isPlaying ? styles.spinning : ''}`}>
        <div className={styles.vinylBase} />
        {cover && (
          <img
            key={cover}
            src={cover}
            alt=""
            className={styles.coverImg}
            draggable="false"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className={styles.grooves} />
        <div className={styles.spindle} />
        <div className={styles.gloss} />
      </div>
    </div>
  );
}
