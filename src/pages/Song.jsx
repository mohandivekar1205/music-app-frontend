import React, { useState } from 'react';
import { Bookmark, Play, Pause, ThumbsUp, ThumbsDown, Shuffle, Repeat } from 'lucide-react';
import styles from '../styles/pages/Song.module.css';
import ListRow from '../components/common/ListRow';
import Pill from '../components/common/Pill';

const FILTERS = ['All', 'Familiar', 'Popular', 'Discover', 'Deep cuts'];

const QUEUE_TRACKS = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop', 
    title: 'Jogi', 
    subtitle: 'Yasser Desai & Aakanksha Sharma', 
    duration: '4:34',
    categories: ['Familiar', 'Popular']
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=100&h=100&fit=crop', 
    title: 'SAB TERA', 
    subtitle: 'ARMAAN MALIK, SHRADDHA KAPOOR,...', 
    duration: '3:49',
    categories: ['Familiar', 'Popular']
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop', 
    title: 'MAAHI VE', 
    subtitle: 'A.R. Rahman', 
    duration: '4:01',
    categories: ['Familiar', 'Deep cuts']
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop', 
    title: 'Aayat', 
    subtitle: 'Sanjay Leela Bhansali, Shreyas Puranik,...', 
    duration: '4:22',
    categories: ['Discover', 'Deep cuts']
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop', 
    title: 'Nazm Nazm(Ayushmann Khurrana Ver...)', 
    subtitle: 'Ayushmann Khurrana', 
    duration: '3:15',
    categories: ['Familiar', 'Popular']
  },
  { 
    id: 6, 
    image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=100&h=100&fit=crop', 
    title: 'Abhi Kuch Dino Se', 
    subtitle: 'Pritam, Mohit Chauhan, & Neelesh Misra', 
    duration: '4:46',
    categories: ['Discover', 'Familiar']
  },
  { 
    id: 7, 
    image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=100&h=100&fit=crop', 
    title: 'Tere Bin (From "Simmba")', 
    subtitle: 'Rahat Fateh Ali Khan, Asees Kaur, & Ta...', 
    duration: '3:51',
    categories: ['Popular', 'Familiar']
  },
  { 
    id: 8, 
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop', 
    title: 'Andekhi Anjaani', 
    subtitle: 'Lata Mangeshkar & Udit Narayan', 
    duration: '6:17',
    categories: ['Discover', 'Deep cuts']
  },
  { 
    id: 9, 
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&h=100&fit=crop', 
    title: 'Kesariya', 
    subtitle: 'Pritam, Arijit Singh, Amitabh Bhattacharya', 
    duration: '4:28',
    categories: ['Popular']
  },
  { 
    id: 10, 
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop', 
    title: 'Tum Se Hi', 
    subtitle: 'Pritam, Mohit Chauhan', 
    duration: '5:21',
    categories: ['Discover', 'Deep cuts']
  },
  { 
    id: 11, 
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&h=100&fit=crop', 
    title: 'Qaafirana', 
    subtitle: 'Amit Trivedi, Arijit Singh, Nikhita Gandhi', 
    duration: '5:42',
    categories: ['Discover', 'Familiar']
  },
  { 
    id: 12, 
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&h=100&fit=crop', 
    title: 'Phir Le Aya Dil (Redux)', 
    subtitle: 'Pritam, Rekha Bhardwaj', 
    duration: '4:55',
    categories: ['Deep cuts', 'Discover']
  }
];

const Song = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentTrack, setCurrentTrack] = useState({
    id: 1,
    title: 'Jogi',
    artist: 'Yasser Desai & Aakanksha Sharma',
    avatar: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=50&h=50&fit=crop',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop',
    year: '2024',
    duration: '4 minutes 34 seconds'
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [likeState, setLikeState] = useState(null); // 'like' | 'dislike' | null
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const filteredTracks = activeFilter === 'All'
    ? QUEUE_TRACKS
    : QUEUE_TRACKS.filter(t => t.categories?.includes(activeFilter));

  const handleTrackSelect = (track) => {
    setCurrentTrack({
      id: track.id,
      title: track.title,
      artist: track.subtitle,
      avatar: track.image,
      image: track.image.replace('w=100&h=100', 'w=500&h=500'),
      year: '2024',
      duration: `${track.duration} duration`
    });
    setIsPlaying(true);
  };

  return (
    <div className={styles.playlistPage}>
      {/* Left Column: Now Playing Hero Artwork and Controls */}
      <div className={styles.leftColumn}>
        <img 
          src={currentTrack.image} 
          alt={`${currentTrack.title} Cover`} 
          className={styles.coverImage} 
        />
        
        <div className={styles.metadataContainer}>
          <h1 className={styles.title}>{currentTrack.title}</h1>
          
          <div className={styles.artistBadge} style={{ marginBottom: '8px', marginTop: '8px' }}>
            <img 
              src={currentTrack.avatar} 
              alt={currentTrack.artist} 
              className={styles.artistAvatar}
            />
            {currentTrack.artist}
          </div>
          
          <div className={styles.metadata}>Song • {currentTrack.year}</div>
          <div className={styles.metadata}>{currentTrack.duration}</div>
          
          <div className={styles.actionRow}>
            <button 
              className={styles.playBtn} 
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
            </button>
            <button 
              className={`${styles.iconBtn} ${isSaved ? styles.activeIconBtn : ''}`}
              onClick={() => setIsSaved(!isSaved)}
              aria-label="Save"
            >
              <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button 
              className={`${styles.iconBtn} ${likeState === 'like' ? styles.activeIconBtn : ''}`}
              onClick={() => setLikeState(likeState === 'like' ? null : 'like')}
              aria-label="Like"
            >
              <ThumbsUp size={20} fill={likeState === 'like' ? "currentColor" : "none"} />
            </button>
            <button 
              className={`${styles.iconBtn} ${likeState === 'dislike' ? styles.activeIconBtn : ''}`}
              onClick={() => setLikeState(likeState === 'dislike' ? null : 'dislike')}
              aria-label="Dislike"
            >
              <ThumbsDown size={20} fill={likeState === 'dislike' ? "currentColor" : "none"} />
            </button>
            <button 
              className={`${styles.iconBtn} ${isShuffle ? styles.activeIconBtn : ''}`}
              onClick={() => setIsShuffle(!isShuffle)}
              aria-label="Shuffle"
            >
              <Shuffle size={20} />
            </button>
            <button 
              className={`${styles.iconBtn} ${isRepeat ? styles.activeIconBtn : ''}`}
              onClick={() => setIsRepeat(!isRepeat)}
              aria-label="Repeat"
            >
              <Repeat size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Right Column: Recommended Songs and Filter Chips */}
      <div className={styles.rightColumn}>
        <h2 className={styles.recommendationTitle}>
          Recommended Songs
        </h2>

        {/* Filter Chips Bar */}
        <div className={styles.filterChips}>
          {FILTERS.map(filter => (
            <Pill 
              key={filter} 
              label={filter} 
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>

        {/* Filtered Song List */}
        <div className={styles.tracksList}>
          {filteredTracks.map(track => (
            <ListRow 
              key={track.id} 
              image={track.image}
              title={track.title}
              subtitle={track.subtitle}
              duration={track.duration}
              isActive={currentTrack.id === track.id}
              onClick={() => handleTrackSelect(track)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Song;
