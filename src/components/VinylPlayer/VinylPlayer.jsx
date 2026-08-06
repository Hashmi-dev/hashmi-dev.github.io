import songs from '../../data/songs';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { VinylDisc } from './VinylDisc';
import { Tonearm } from './Tonearm';
import { TrackControls } from './TrackControls';
import styles from './VinylPlayer.module.css';

export function VinylPlayer() {
  const { audioRef, currentTrack, currentIndex, isPlaying, toggle, next, prev, selectTrack, handleEnded } =
    useAudioPlayer(songs);

  if (!currentTrack) {
    return (
      <div className={styles.player}>
        <div className={styles.turntableWrap}>
          <VinylDisc isPlaying={false} cover={null} />
          <Tonearm isPlaying={false} />
        </div>
        <div className={styles.controls}>
          <div className={styles.trackInfo}>
            <span className={styles.trackTitle}>No songs yet</span>
            <span className={styles.trackArtist}>Add some to public/media/songs</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src={currentTrack.src} onEnded={handleEnded} preload="metadata" />

      <div className={styles.turntableWrap}>
        <VinylDisc isPlaying={isPlaying} cover={currentTrack.cover} />
        <Tonearm isPlaying={isPlaying} />
      </div>

      <TrackControls
        tracks={songs}
        currentIndex={currentIndex}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onToggle={toggle}
        onNext={next}
        onPrev={prev}
        onSelect={selectTrack}
      />
    </div>
  );
}
