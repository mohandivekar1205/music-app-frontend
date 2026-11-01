import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ThumbsUp } from 'lucide-react';
import styles from '../styles/pages/History.module.css';
import Pill from '../components/common/Pill';

const FILTERS = ['Playlists', 'Podcasts', 'Songs', 'Albums', 'Artists', 'Profiles'];

const MOCK_HISTORY = [
  { 
    id: 1, 
    title: 'MAAHI VE', 
    artist: 'A.R. Rahman', 
    album: 'Highway (Original Motion Picture Soundtrack) • 2014', 
    duration: '4:01', 
    category: 'Songs',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
    to: '/album/1'
  },
  { 
    id: 2, 
    title: 'SAB TERA', 
    artist: 'ARMAAN MALIK, SHRADDHA KAPOOR', 
    album: 'BAAGHI', 
    duration: '3:49', 
    category: 'Songs',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop',
    to: '/album/1'
  },
  { 
    id: 3, 
    title: 'Jogi', 
    artist: 'Yasser Desai & Aakanksha Sharma', 
    album: 'Shaadi Mein Zaroor Aana • 2017', 
    duration: '4:34', 
    category: 'Songs',
    image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=100&h=100&fit=crop',
    to: '/album/1'
  },
  { 
    id: 4, 
    title: 'Jara Jara (Reprise)', 
    artist: 'Aarya Ambekar', 
    album: 'Ti Saddhya Kay Karte • 2016', 
    duration: '4:00', 
    category: 'Songs',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
    to: '/album/1'
  },
  { 
    id: 5, 
    title: 'Tere Naina (From "My Name Is Khan")', 
    artist: 'Shankar Ehsaan Loy & Shafqat Amanat Ali', 
    album: 'Kajol: Bollywood Darling', 
    duration: '4:39', 
    category: 'Songs',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop',
    to: '/album/1'
  },
  { 
    id: 6, 
    title: 'Rockstar (Original Soundtrack)', 
    artist: 'A.R. Rahman', 
    album: 'Rockstar Deluxe', 
    duration: '14 tracks', 
    category: 'Albums',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&h=100&fit=crop',
    to: '/album/1'
  },
  { 
    id: 7, 
    title: 'Karan Aujla', 
    artist: 'Artist • 160M listeners', 
    album: '5.74M subscribers', 
    duration: 'Profile', 
    category: 'Artists',
    isArtist: true,
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
    to: '/artist/1'
  },
  { 
    id: 8, 
    title: '90s Bollywood Dance', 
    artist: 'YouTube Music', 
    album: '61 songs', 
    duration: 'Playlist', 
    category: 'Playlists',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
    to: '/playlist/1'
  },
  { 
    id: 9, 
    title: 'World Order Is a Lie: The Next 50 Years', 
    artist: 'Prof. Jiang Xueqin & Raj Shamani', 
    album: 'Figuring Out • 2 hr 31 min', 
    duration: '2:31:00', 
    category: 'Podcasts',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=100&fit=crop',
    to: '/episode/1'
  },
  { 
    id: 10, 
    title: 'How To Build & Scale a Brand: Walmart & Retail', 
    artist: 'Puneet Nanda & Raj Shamani', 
    album: 'Figuring Out • 1 hr 29 min', 
    duration: '1:29:00', 
    category: 'Podcasts',
    image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=100&h=100&fit=crop',
    to: '/episode/1'
  }
];

const History = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('');
  const [likedIds, setLikedIds] = useState(new Set([1, 3]));

  const filteredItems = MOCK_HISTORY.filter(item => {
    if (!activeFilter) return true;
    return item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.history}>
      <div className={styles.header}>
        <h1 className={styles.title}>History</h1>
      </div>

      {/* Filter Chips identical to Library section */}
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

      <div className={styles.dateSection}>
        <h2 className={styles.sectionHeader}>Today</h2>
        <div className={styles.list}>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className={styles.row}
              onClick={() => item.to && navigate(item.to)}
            >
              <div className={`${styles.thumbWrapper} ${item.isArtist ? styles.artistThumb : ''}`}>
                <img src={item.image} alt={item.title} className={styles.thumb} />
                <div className={styles.playOverlay}>
                  <Play size={18} fill="currentColor" />
                </div>
              </div>

              <div className={styles.titleCol}>
                <div className={styles.songTitle}>{item.title}</div>
              </div>

              <div className={styles.artistCol}>
                {item.artist}
              </div>

              <div className={styles.albumCol}>
                {item.album}
              </div>

              <div className={styles.actionsCol}>
                <button 
                  className={`${styles.likeBtn} ${likedIds.has(item.id) ? styles.liked : ''}`}
                  onClick={(e) => toggleLike(item.id, e)}
                  title="Like"
                >
                  <ThumbsUp size={18} fill={likedIds.has(item.id) ? 'currentColor' : 'none'} />
                </button>
                <span className={styles.duration}>{item.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
