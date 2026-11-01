import React from 'react';
import { Bookmark, Play, MoreVertical, Download, Share } from 'lucide-react';
import styles from '../styles/pages/Album.module.css';
import ListRow from '../components/common/ListRow';

const MOCK_TRACKS = [
  { id: 1, title: 'Raataan Lambiyan', subtitle: 'Tanishk Bagchi, Jubin Nautiyal & Asees Kaur • 1.3B plays', duration: '3:51' },
  { id: 2, title: 'Ranjha', subtitle: 'Jasleen Royal, B Praak & Romy • 985M plays', duration: '3:49' },
  { id: 3, title: 'Kabhii Tumhhe', subtitle: 'Javed - Mohsin, Darshan Raval & Rashmi Virag • 240M plays', duration: '3:51' },
  { id: 4, title: 'JaiHind Ki Senaa', subtitle: 'Vikram Montrose • 20M plays', duration: '2:32' },
  { id: 5, title: 'Kabhii Tumhhe (Female Version)', subtitle: 'Javed - Mohsin & Palak Muchhal • 85M plays', duration: '3:39' },
  { id: 6, title: 'Mann Bharryaa 2.0', subtitle: 'B Praak & Jaani • 28M plays', duration: '4:27' },
  { id: 7, title: 'Raataan Lambiyan (Lofi Flip)', subtitle: 'VIBIE, Jubin Nautiyal, Asees Kaur & Tanishk Bagchi • 4.5M plays', duration: '3:51' },
  { id: 8, title: 'Ranjha (Sid X Kiara Wedding Version)', subtitle: 'Jasleen Royal, Anvita Dutt, Shraddha Sehgal, Prerna Arora, and ... • 31M plays', duration: '1:59' },
  { id: 9, title: 'Ranjha (Lofi Flip)', subtitle: 'VIBIE, Jasleen Royal, B Praak, Romy & Anvita Dutt • 4.1M plays', duration: '3:49' },
];

const Album = () => {
  return (
    <div className={styles.playlistPage}>
      <div className={styles.leftColumn}>
        <div className={styles.artistBadge}>
          <img 
            src="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=50&h=50&fit=crop" 
            alt="Tanishk Bagchi" 
            className={styles.artistAvatar}
          />
          Tanishk Bagchi
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=320&h=320&fit=crop" 
          alt="Shershaah (Original Motion Picture..." 
          className={styles.coverImage} 
        />
        
        <div className={styles.metadataContainer}>
          <h1 className={styles.title}>Shershaah (Original Motion Picture...</h1>
          <div className={styles.metadata}>Album • 2024</div>
          <div className={styles.metadata}>11 songs • 38 minutes</div>
          
          <div className={styles.actionRow} style={{ marginTop: '24px' }}>
            <button className={styles.iconBtn} aria-label="Download">
              <Download size={20} />
            </button>
            <button className={styles.iconBtn} aria-label="Save">
              <Bookmark size={20} />
            </button>
            <button className={styles.playBtn} aria-label="Play all">
              <Play size={28} fill="currentColor" />
            </button>
            <button className={styles.iconBtn} aria-label="Share">
              <Share size={20} />
            </button>
            <button className={styles.iconBtn} aria-label="More options">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.rightColumn}>
        {MOCK_TRACKS.map(track => (
          <ListRow 
            key={track.id} 
            index={track.id}
            title={track.title}
            subtitle={track.subtitle}
            duration={track.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default Album;
