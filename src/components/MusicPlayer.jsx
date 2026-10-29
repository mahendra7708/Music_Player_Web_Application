
import { useEffect, useRef, useState } from "react";

function MusicPlayer({ currentSong, onNext, onPrevious }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!currentSong) {
      audio.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    setError("");
    setCurrentTime(0);
    setDuration(0);

    audio.src = currentSong.audio || "";
    audio.load();

    if (!currentSong.audio) {
      setIsPlaying(false);
      setError("Audio file path is missing for this song.");
      return;
    }

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
        setError("Unable to play this song. Check its MP3 path.");
      });
  }, [currentSong]);

  async function togglePlay() {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
        setError("");
      } catch {
        setIsPlaying(false);
        setError("Unable to play this song. Check its audio file.");
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function changeVolume(event) {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }

  function formatTime(time) {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) =>
          setDuration(event.currentTarget.duration)
        }
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => onNext?.()}
        onError={() => {
          setIsPlaying(false);
          if (currentSong) {
            setError("Audio file not found or unsupported.");
          }
        }}
      />

      <div className="player-song-info">
        {currentSong ? (
          <>
            <strong>{currentSong.title}</strong>
            <p>{currentSong.artist}</p>
            {error && <p className="player-error">{error}</p>}
          </>
        ) : (
          <span>Choose a song to start listening</span>
        )}
      </div>

      <div className="player-controls">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!currentSong}
          aria-label="Previous song"
        >
          ◀
        </button>

        <button
          type="button"
          onClick={togglePlay}
          disabled={!currentSong}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!currentSong}
          aria-label="Next song"
        >
          ▶|
        </button>

        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(event.target.value);
            }
          }}
          disabled={!duration}
          aria-label="Song progress"
        />

        <span>{formatTime(currentTime)}</span>
      </div>

      <div className="player-volume">
        <span>♫</span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          aria-label="Volume"
          title={`Volume: ${Math.round(volume * 100)}%`}
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
