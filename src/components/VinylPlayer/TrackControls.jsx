import styles from './VinylPlayer.module.css';

export function TrackControls({ tracks, currentIndex, currentTrack, isPlaying, onToggle, onNext, onPrev, onSelect }) {
  return (
    <div className={styles.controls}>
      <div className={styles.trackInfo}>
        <span className={styles.trackTitle} title={currentTrack.title}>
          {currentTrack.title}
        </span>
        {currentTrack.artist && <span className={styles.trackArtist}>{currentTrack.artist}</span>}
      </div>

      <div className={styles.buttons}>
        <button type="button" onClick={onPrev} aria-label="Previous song" className={styles.iconButton}>
          &#8249;
        </button>
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className={`${styles.iconButton} ${styles.playButton}`}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button type="button" onClick={onNext} aria-label="Next song" className={styles.iconButton}>
          &#8250;
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Choose a song">
        {tracks.map((track, index) => (
          <button
            key={track.id}
            type="button"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Play ${track.title}`}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}
