import { useEffect, useRef, useState } from 'react';

export function useAudioPlayer(tracks) {
  const audioRef = useRef(null);
  const shouldPlayRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = tracks[currentIndex];

  // isPlaying tracks what the audio element is actually doing (native play/
  // pause/error events), not just what we last asked it to do — so a missing
  // file or a blocked autoplay can't leave the disc/tonearm stuck mid-state.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setIsPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // when the track changes, resume playback if we were mid-song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldPlayRef.current) return;
    audio.play().catch(() => {});
  }, [currentIndex]);

  const play = () => {
    shouldPlayRef.current = true;
    audioRef.current?.play().catch(() => {});
  };

  const pause = () => {
    shouldPlayRef.current = false;
    audioRef.current?.pause();
  };

  const toggle = () => (isPlaying ? pause() : play());

  const selectTrack = (index) => {
    shouldPlayRef.current = true;
    setCurrentIndex(index);
  };

  const next = () => setCurrentIndex((index) => (index + 1) % tracks.length);
  const prev = () => setCurrentIndex((index) => (index - 1 + tracks.length) % tracks.length);

  const handleEnded = () => next();

  return {
    audioRef,
    currentTrack,
    currentIndex,
    isPlaying,
    play,
    pause,
    toggle,
    next,
    prev,
    selectTrack,
    handleEnded,
  };
}
