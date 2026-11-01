import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle, 
  ThumbsUp, 
  ThumbsDown, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import styles from '../../styles/layout/BottomPlayer.module.css';

const BottomPlayer = ({ isSongOpen, onToggleSong }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const handlePlayerClick = () => {
    onToggleSong();
  };

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (!isLiked) setIsDisliked(false);
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    setIsDisliked(!isDisliked);
    if (!isDisliked) setIsLiked(false);
  };

  const handlePrevent = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={styles.player} 
      onClick={handlePlayerClick}
      title={isSongOpen ? "Collapse now playing" : "Open now playing"}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onToggleSong();
        }
      }}
    >
      {/* Progress Bar */}
      <div className={styles.progressBarContainer} onClick={handlePrevent}>
        <div className={styles.progressFill}></div>
      </div>
      
      {/* Left Playback Controls */}
      <div className={styles.leftControls}>
        <div className={styles.centerControls} style={{ flex: 'none', justifyContent: 'flex-start' }}>
          <button 
            className={styles.iconButton} 
            aria-label="Skip Back"
            onClick={handlePrevent}
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button 
            className={styles.iconButton} 
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={handleTogglePlay}
          >
            {isPlaying ? (
              <Pause size={28} fill="currentColor" />
            ) : (
              <Play size={28} fill="currentColor" />
            )}
          </button>
          <button 
            className={styles.iconButton} 
            aria-label="Skip Forward"
            onClick={handlePrevent}
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
          <span className={styles.timeText} onClick={handlePrevent}>1:55 / 4:00</span>
        </div>
      </div>

      {/* Center Track Info */}
      <div className={styles.centerControls}>
        <div className={styles.trackInfo}>
          <img 
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50&h=50&fit=crop" 
            alt="Album Cover" 
            className={styles.cover} 
          />
          <div className={styles.trackText}>
            <span className={styles.trackTitle}>Jara Jara (Reprise)</span>
            <span className={styles.trackArtist}>Aarya Ambekar • Ti Saddhya Kay Karte • 2016</span>
          </div>
          <button 
            className={styles.iconButton} 
            aria-label="Thumbs Up"
            onClick={handleLike}
          >
            <ThumbsUp size={18} fill={isLiked ? "currentColor" : "none"} color={isLiked ? "var(--brand-primary)" : "currentColor"} />
          </button>
          <button 
            className={styles.iconButton} 
            aria-label="Thumbs Down"
            onClick={handleDislike}
          >
            <ThumbsDown size={18} fill={isDisliked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className={styles.rightControls}>
        <button 
          className={`${styles.iconButton} ${isRepeat ? styles.activeBtn : ''}`} 
          aria-label="Repeat"
          onClick={(e) => {
            e.stopPropagation();
            setIsRepeat(!isRepeat);
          }}
          title={isRepeat ? "Repeat is on" : "Repeat is off"}
        >
          <Repeat size={18} />
        </button>
        <button 
          className={`${styles.iconButton} ${isShuffle ? styles.activeBtn : ''}`} 
          aria-label="Shuffle"
          onClick={(e) => {
            e.stopPropagation();
            setIsShuffle(!isShuffle);
          }}
          title={isShuffle ? "Shuffle is on" : "Shuffle is off"}
        >
          <Shuffle size={18} />
        </button>
        <button 
          className={styles.iconButton} 
          aria-label={isSongOpen ? "Close Song Page" : "Open Song Page"} 
          onClick={(e) => {
            e.stopPropagation();
            onToggleSong();
          }}
          title={isSongOpen ? "Collapse now playing" : "Open now playing"}
        >
          {isSongOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
    </div>
  );
};

export default BottomPlayer;
