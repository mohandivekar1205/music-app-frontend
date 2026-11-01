import React from 'react';
import { Bookmark, Play, MoreVertical } from 'lucide-react';
import styles from '../styles/pages/Playlist.module.css';
import ListRow from '../components/common/ListRow';

const MOCK_TRACKS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=50&h=50&fit=crop', title: 'Raaton Mein Aana (From "Vibe")', subtitle: 'Amit Trivedi & Kumaar • Raaton Mein Aana (From "Vibe")', duration: '6:12' },
  { id: 2, image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=50&h=50&fit=crop', title: 'Tera Mera Rishta', subtitle: 'Sayeed Quadri, Mustafa Zahid & Pritam', duration: '4:13' },
  { id: 3, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=50&h=50&fit=crop', title: 'Vaaroon Forever (Official Video) | Mirzapur The Movie | Shreya Gh...', subtitle: 'Anand Bhaskar', duration: '4:50' },
  { id: 4, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50&h=50&fit=crop', title: 'Toh Phir Aao', subtitle: 'Sayeed Quadri, Mustafa Zahid & Pritam', duration: '4:40' },
  { id: 5, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=50&h=50&fit=crop', title: 'Barsaat Lagdi Ae', subtitle: 'Youngveer, Simran Choudhary & Darshan Raval', duration: '4:48' },
  { id: 6, image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=50&h=50&fit=crop', title: 'KALYANI (Remix)', subtitle: 'ARJN, KDS, FIFTY4 & Shreya Ghoshal', duration: '3:49' },
  { id: 7, image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=50&h=50&fit=crop', title: 'Aankhon Se Tune 2.0 (From "Bhai Tera Star Hai")', subtitle: 'Dev Negi, Palak Muchhal, Kumar Sanu & Alka Yagnik', duration: '4:29' },
  { id: 8, image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=50&h=50&fit=crop', title: 'Tabaahi', subtitle: 'Vishal Mishra • Jul 8, 2026', duration: '2:53' },
  { id: 9, image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=50&h=50&fit=crop', title: 'Banger', subtitle: 'Sharvi Yadav, Badshah & Hiten', duration: '3:15' },
];

const Playlist = () => {
  return (
    <div className={styles.playlistPage}>
      <div className={styles.leftColumn}>
        <img 
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=320&h=320&fit=crop" 
          alt="New Music Hindi" 
          className={styles.coverImage} 
        />
        
        <div className={styles.metadataContainer}>
          <h1 className={styles.title}>New Music Hindi</h1>
          <div className={styles.author}>YouTube Music</div>
          <div className={styles.metadata}>Playlist • 2026</div>
          <div className={styles.metadata}>70 songs • 4 hours, 21 minutes</div>
          
          <div className={styles.description}>
            Listen to brand new Hindi releases of the moment. #bollywood #new...
          </div>
          
          <div className={styles.actionRow}>
            <button className={styles.iconBtn} aria-label="Save">
              <Bookmark size={20} />
            </button>
            <button className={styles.playBtn} aria-label="Play all">
              <Play size={28} fill="currentColor" />
            </button>
            <button className={styles.iconBtn} aria-label="More options">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.rightColumn}>
        {MOCK_TRACKS.map(track => (
          <ListRow key={track.id} {...track} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
