import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, ListPlus } from 'lucide-react';
import styles from '../styles/pages/Search.module.css';
import Pill from '../components/common/Pill';
import ListRow from '../components/common/ListRow';

const FILTERS = ['Songs', 'Artists', 'Videos', 'Episodes', 'Albums', 'Community playlists', 'Profiles'];

const MOCK_RESULTS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=50&h=50&fit=crop', title: 'Jogi', subtitle: 'Song • Yasser Desai & Aakanksha Sharma', duration: '4:34' },
  { id: 2, image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=50&h=50&fit=crop', title: 'Banke Tera Jogi', subtitle: 'Song • Alka Yagnik & Sonu Nigam', duration: '4:42' },
  { id: 3, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=50&h=50&fit=crop', title: 'Ramta Jogi', subtitle: 'Song • Sukhwinder Singh & Alka Yagnik', duration: '6:12' },
  { id: 4, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50&h=50&fit=crop', title: 'Mann Jogiya', subtitle: 'Song • Arijit Singh & Ishita Vishwakarma', duration: '3:58' },
  { id: 5, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=50&h=50&fit=crop', title: 'Jogi Mahi (From "Bachna Ae Haseeno")', subtitle: 'Song • Vishal and Sheykhar', duration: '4:54' },
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || 'jogi';
  const [activeTab, setActiveTab] = useState('yt');
  const [activeFilter, setActiveFilter] = useState('');

  return (
    <div className={styles.search}>
      <div className={styles.tabs}>
        <div 
          className={`${styles.tab} ${activeTab === 'yt' ? styles.active : ''}`}
          onClick={() => setActiveTab('yt')}
        >
          YT MUSIC
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'library' ? styles.active : ''}`}
          onClick={() => setActiveTab('library')}
        >
          LIBRARY
        </div>
      </div>

      <div className={styles.filters}>
        {FILTERS.map(f => (
          <Pill 
            key={f} 
            label={f} 
            isActive={activeFilter === f}
            onClick={() => setActiveFilter(f === activeFilter ? '' : f)}
          />
        ))}
      </div>

      <div className={styles.topResult}>
        <img 
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop" 
          alt="Top Result" 
          className={styles.topImage} 
        />
        <div className={styles.topInfo}>
          <div className={styles.topTitle}>{query.charAt(0).toUpperCase() + query.slice(1)}</div>
          <div className={styles.topSubtitle}>Song • Yasser Desai & Aakanksha Sharma • 4:34</div>
          <div className={styles.topActions}>
            <button className={styles.playBtn}>
              <Play size={20} fill="currentColor" /> Play
            </button>
            <button className={styles.saveBtn}>
              <ListPlus size={20} /> Save
            </button>
          </div>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Songs</h3>
      <div className={styles.resultsList}>
        {MOCK_RESULTS.map(item => (
          <ListRow key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Search;
