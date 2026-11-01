import React from 'react';
import { Shuffle, Radio, MoreVertical, ThumbsUp } from 'lucide-react';
import styles from '../styles/pages/Artist.module.css';

const TOP_SONGS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=50&h=50&fit=crop', title: 'Boyfriend', artist: 'Karan Aujla & Ikky', plays: '366M plays', album: 'P-POP CULTURE', liked: true },
  { id: 2, image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=50&h=50&fit=crop', title: 'For A Reason', artist: 'Karan Aujla & Ikky', plays: '446M plays', album: 'P-POP CULTURE', liked: true },
  { id: 3, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=50&h=50&fit=crop', title: 'Low Fade', artist: 'Karan Aujla & Mxrci', plays: '45M plays', album: 'Low Fade', liked: false },
  { id: 4, image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=50&h=50&fit=crop', title: 'Wavy', artist: 'Karan Aujla & Jay Tr...', plays: '469M plays', album: 'Wavy', liked: true },
  { id: 5, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=50&h=50&fit=crop', title: 'Winning Speech', artist: 'Karan Aujla & Mxrci', plays: '357M plays', album: 'Winning Speech', liked: false },
];

const Artist = () => {
  return (
    <div className={styles.artistPage}>
      <div 
        className={styles.hero}
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=1200&h=400&fit=crop")' }}
      >
        <div className={styles.heroGradient}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Karan Aujla</h1>
          <div className={styles.audience}>160M monthly audience</div>
          
          <div className={styles.description}>
            Singer, Lyricist & Composer Born in Ghurala, India, Karan Aujla began song writing as a means of coping with the loss of his parents. After moving to Canada at 17, he penned songs for Punjabi artists...
          </div>
          <div className={styles.moreLink}>MORE</div>
          
          <div className={styles.actionRow}>
            <button className={styles.primaryBtn}>
              <Shuffle size={18} /> Shuffle
            </button>
            <button className={styles.primaryBtn}>
              <Radio size={18} /> Mix
            </button>
            <button className={styles.outlineBtn}>
              Subscribed 5.74M
            </button>
            <button className={styles.iconBtn}>
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Top songs</h2>
        
        <div className={styles.trackList}>
          {TOP_SONGS.map(track => (
            <div key={track.id} className={styles.trackRow}>
              <img src={track.image} alt={track.title} className={styles.trackImage} />
              <div className={styles.trackTitle}>{track.title}</div>
              <div className={styles.trackArtist}>{track.artist}</div>
              <div className={styles.trackPlays}>{track.plays}</div>
              <div className={styles.trackAlbum}>{track.album}</div>
              <div className={styles.trackAction}>
                {track.liked && <ThumbsUp size={18} fill="currentColor" />}
              </div>
            </div>
          ))}
        </div>
        
        <button className={styles.showAllBtn}>Show all</button>
      </div>
    </div>
  );
};

export default Artist;
