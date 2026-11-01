import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share, Bookmark, MoreVertical, ArrowUpDown, ChevronDown } from 'lucide-react';
import styles from '../styles/pages/Podcast.module.css';
import Pill from '../components/common/Pill';
import EpisodeRow from '../components/common/EpisodeRow';

const MOCK_EPISODES = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=150&h=80&fit=crop', 
    title: 'World Order Is a Lie: The Next 50 Years Will Change Everything | Prof. Jiang | FO547 Raj Shamani', 
    description: 'Checkout the ASUS Experbook series:- https://www.flipkart.com/asus-expertbook-core-ultra-store Get your hand-picked playbook here: https://www.figuringout.co/pdf/fo-547 Professor Jiang Xueqin on...', 
    metadata: '389K views • 19h ago • 2 hr 31 min' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150&h=80&fit=crop', 
    title: 'How To Build & Scale a Brand: Walmart, Retail & Product Strategy | Puneet Nanda | FO546 Raj Shamani', 
    description: 'Check out GuruNanda: https://gurunanda.com/ ———————— Get your hand-picked playbook here: https://www.figuringout.co/pdf/fo-546 ———————— Guest Suggestion Form:...', 
    metadata: '196K views • 3d ago • 1 hr 29 min' 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&h=80&fit=crop', 
    title: 'Top Geopolitical Expert: Why America Is No Longer The World\'s Leader | Ian Bremmer | FO545 Raj Shamani', 
    description: 'Get your hand-picked playbook here: https://www.figuringout.co/pdf/fo-545 Geopolitical scientist Ian Bremmer explains why Trump is a bigger global risk than Xi Jinping and who really runs the world now....', 
    metadata: '790K views • 5d ago • 1 hr 44 min' 
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=150&h=80&fit=crop', 
    title: 'Former CIA Agent\'s Warning: China Doesn\'t Need A War To Beat America | John Sipher | FO544 Raj Shamani', 
    description: 'Check out Gurunanda: https://gurunanda.com/ ———————— Get your hand-picked playbook here:...', 
    metadata: '450K views • 1w ago • 1 hr 55 min' 
  }
];

const FILTERS = ['In progress', 'Unplayed', 'Played'];

const Podcast = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const navigate = useNavigate();

  return (
    <div className={styles.playlistPage}>
      <div className={styles.leftColumn}>
        <div className={styles.artistBadge}>
          <img 
            src="https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=50&h=50&fit=crop" 
            alt="Raj Shamani" 
            className={styles.artistAvatar}
          />
          Raj Shamani
        </div>
        
        <img 
          src="https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=320&h=320&fit=crop" 
          alt="Figuring Out With Raj Shamani" 
          className={styles.coverImage} 
        />
        
        <div className={styles.metadataContainer}>
          <h1 className={styles.title}>Figuring Out With Raj Shamani</h1>
          
          <div className={styles.actionRow} style={{ marginTop: '24px' }}>
            <button className={styles.iconBtn} aria-label="Share">
              <Share size={20} />
            </button>
            <button className={styles.saveWideBtn} aria-label="Saved to library">
              <Bookmark size={18} fill="currentColor" /> Saved to library
            </button>
            <button className={styles.iconBtn} aria-label="More options">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.rightColumn}>
        <div className={styles.filterHeader}>
          <div className={styles.filterGroup}>
            <Pill 
              label={<span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>Latest <ChevronDown size={16} /></span>} 
              isActive={false} 
            />
            {FILTERS.map(f => (
              <Pill 
                key={f} 
                label={f} 
                isActive={activeFilter === f}
                onClick={() => setActiveFilter(f === activeFilter ? '' : f)}
              />
            ))}
          </div>
          <ArrowUpDown size={20} className={styles.sortIcon} />
        </div>
        
        {MOCK_EPISODES.map(ep => (
          <EpisodeRow 
            key={ep.id} 
            {...ep}
            onClick={() => navigate(`/episode/${ep.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Podcast;
