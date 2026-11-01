import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  MoreVertical, 
  Radio, 
  ListPlus 
} from 'lucide-react';
import styles from '../styles/pages/Home.module.css';
import Pill from '../components/common/Pill';
import Card from '../components/common/Card';

const FILTERS = [
  'Podcasts', 
  'Feel good', 
  'Party', 
  'Energize', 
  'Relax', 
  'Romance', 
  'Workout', 
  'Commute', 
  'Sad', 
  'Focus', 
  'Sleep'
];

// Section 1: Listen Again (From PDF Page 1)
const LISTEN_AGAIN = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop', 
    title: 'Shekhar Ravjiani Hanuman Chalisa', 
    subtitle: 'Song • Shekhar Ravjiani', 
    to: '/album/1' 
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', 
    title: 'Jogi', 
    subtitle: 'Song • Yasser Desai & Aakanksha Sharma', 
    to: '/album/1' 
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', 
    title: 'Gurbani (From "Bhaag Milkha Bhaag")', 
    subtitle: 'Song • Shankar Ehsaan Loy & Daler Mehndi', 
    to: '/album/1' 
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop', 
    title: 'GO MAKE IT HAPPEN', 
    subtitle: 'Song • MAKAVELI MOTIVATION', 
    to: '/playlist/1' 
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', 
    title: 'Twin Strings Lounge - Sufiyana Sham 2', 
    subtitle: 'Twin Strings • 8.1M views', 
    to: '/playlist/1' 
  },
  { 
    id: 6, 
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', 
    title: 'Vada', 
    subtitle: 'Song • Shivr', 
    to: '/album/1' 
  },
  { 
    id: 7, 
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop', 
    title: 'Karan Aujla', 
    subtitle: 'Artist • 160M listeners', 
    to: '/artist/1' 
  },
  { 
    id: 8, 
    image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop', 
    title: 'Shershaah', 
    subtitle: 'Album • Tanishk Bagchi', 
    to: '/album/1' 
  },
  { 
    id: 9, 
    image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=300&h=300&fit=crop', 
    title: 'Figuring Out With Raj Shamani', 
    subtitle: 'Podcast • Raj Shamani', 
    to: '/podcast/1' 
  }
];

// Section 2: Quick Picks (4-Row Grid, From PDF Page 15)
const QUICK_PICKS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop', title: 'Zehnaseeb', subtitle: 'Vishal & Shekhar, Chinmayi • Hasee Toh Phasee', to: '/album/1' },
  { id: 2, image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=100&h=100&fit=crop', title: 'Tum Tak (From "Raanjhanaa")', subtitle: 'Javed Ali, Pooja Vaidyanath • Tum Tak', to: '/album/1' },
  { id: 3, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop', title: 'Aashiq Tera', subtitle: 'Sohail Sen & Altamash Faridi • Happy Bhag Jayegi', to: '/album/1' },
  { id: 4, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop', title: 'Kesariya', subtitle: 'Pritam & Arijit Singh • Brahmastra', to: '/album/1' },
  { id: 5, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop', title: 'Raataan Lambiyan', subtitle: 'Tanishk Bagchi, Jubin Nautiyal • Shershaah', to: '/album/1' },
  { id: 6, image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&h=100&fit=crop', title: 'Hawayein', subtitle: 'Pritam & Arijit Singh • Jab Harry Met Sejal', to: '/album/1' },
  { id: 7, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', title: 'Channa Mereya', subtitle: 'Pritam & Arijit Singh • Ae Dil Hai Mushkil', to: '/album/1' },
  { id: 8, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', title: 'Ilahi', subtitle: 'Pritam & Arijit Singh • Yeh Jawaani Hai Deewani', to: '/album/1' },
  { id: 9, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop', title: 'Sab Tera', subtitle: 'Armaan Malik, Shraddha Kapoor • Baaghi', to: '/album/1' },
  { id: 10, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop', title: 'Maahi Ve', subtitle: 'A.R. Rahman • Highway', to: '/album/1' },
  { id: 11, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop', title: 'Tera Mera Rishta', subtitle: 'Sayeed Quadri & Pritam • Awarapan', to: '/album/1' },
  { id: 12, image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop', title: 'Winning Speech', subtitle: 'Karan Aujla & Mxrci', to: '/artist/1' }
];

// Section 3: Similar to Bela Shende
const BELA_SHENDE_SHELF = [
  { id: 1, image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop', title: 'Ti Saddhya Kay Karte', subtitle: 'Album • Nilesh Moharir', to: '/album/1' },
  { id: 2, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', title: 'Natarang', subtitle: 'Album • Ajay-Atul', to: '/album/1' },
  { id: 3, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', title: 'Duniyadari', subtitle: 'Album • Pankaj Padghan', to: '/album/1' },
  { id: 4, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', title: 'Sairat', subtitle: 'Album • Ajay-Atul', to: '/album/1' },
  { id: 5, image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&h=300&fit=crop', title: 'Katyar Kaljat Ghusali', subtitle: 'Album • Shankar-Ehsaan-Loy', to: '/album/1' },
  { id: 6, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', title: 'Mitwaa', subtitle: 'Album • Shankar-Ehsaan-Loy', to: '/album/1' },
  { id: 7, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', title: 'Muramba', subtitle: 'Album • Jasraj, Saurabh, Hrishikesh', to: '/album/1' }
];

// Section 4: Playlist Mix Cards (Vertical Rectangle, identical to Chroma: Today's Dance Hits)
const PLAYLIST_MIXES = [
  {
    id: 'mix-chroma',
    name: "Chroma: Today's Dance Hits",
    creator: 'YouTube Music',
    songCount: '207 songs',
    description: 'A radiant display of recent Dance music',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop',
    to: '/playlist/1',
    songs: [
      { 
        title: 'Deep In Your Love', 
        artist: 'Alok & Bebe Rexha • 9.5M plays',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop'
      },
      { 
        title: "I'm Good (Blue)", 
        artist: 'David Guetta & Bebe Rexha • 701M plays',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop'
      },
      { 
        title: 'Thank You (Not So Bad)', 
        artist: 'Dimitri Vegas & Like Mike, Tiësto, Dido & W...',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: 'mix-2',
    name: 'My Mix 2',
    creator: 'YouTube Music',
    songCount: '25 songs',
    description: 'Your personalized mix with Jogi, Sab Tera, Maahi Ve and more',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop',
    to: '/playlist/1',
    songs: [
      { 
        title: 'Jogi', 
        artist: 'Yasser Desai & Aakanksha Sharma • 120M plays',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop'
      },
      { 
        title: 'Sab Tera', 
        artist: 'Armaan Malik & Shraddha Kapoor • 250M plays',
        image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=100&h=100&fit=crop'
      },
      { 
        title: 'Maahi Ve', 
        artist: 'A.R. Rahman • 85M plays',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: 'mix-1',
    name: 'My Mix 1',
    creator: 'YouTube Music',
    songCount: '30 songs',
    description: 'Spiritual, calm & soulful devotionals crafted for your daily rhythm',
    image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop',
    to: '/playlist/1',
    songs: [
      { 
        title: 'Hanuman Chalisa', 
        artist: 'Shekhar Ravjiani • 180M plays',
        image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=100&h=100&fit=crop'
      },
      { 
        title: 'Gurbani', 
        artist: 'Shankar-Ehsaan-Loy • 45M plays',
        image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&h=100&fit=crop'
      },
      { 
        title: 'Vada', 
        artist: 'Shivr • 12M plays',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: 'mix-3',
    name: 'My Mix 3',
    creator: 'YouTube Music',
    songCount: '20 songs',
    description: 'High-energy Punjabi rap and trap featuring Karan Aujla, Ikky, and MAKAVELI',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop',
    to: '/playlist/1',
    songs: [
      { 
        title: 'Winning Speech', 
        artist: 'Karan Aujla & Mxrci • 95M plays',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop'
      },
      { 
        title: 'GO MAKE IT HAPPEN', 
        artist: 'MAKAVELI • 30M plays',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop'
      },
      { 
        title: '52 Bars', 
        artist: 'Karan Aujla & Ikky • 110M plays',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop'
      }
    ]
  },
  {
    id: 'mix-chill',
    name: 'Chill Mix',
    creator: 'YouTube Music',
    songCount: '35 songs',
    description: 'Acoustic, lofi & relaxing acoustic melodies to help you unwind',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&h=300&fit=crop',
    to: '/playlist/1',
    songs: [
      { 
        title: 'Kesariya (Acoustic)', 
        artist: 'Pritam & Arijit Singh • 320M plays',
        image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&h=100&fit=crop'
      },
      { 
        title: 'Raataan Lambiyan', 
        artist: 'Tanishk Bagchi & Jubin • 410M plays',
        image: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=100&h=100&fit=crop'
      },
      { 
        title: 'Hawayein', 
        artist: 'Arijit Singh • 290M plays',
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&h=100&fit=crop'
      }
    ]
  }
];

// Section 5: Forgotten Favorites / Masterpiece Soundtracks
const FORGOTTEN_FAVORITES = [
  { id: 1, image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&h=300&fit=crop', title: 'Rockstar', subtitle: 'Album • A.R. Rahman • 2011', to: '/album/1' },
  { id: 2, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', title: 'Yeh Jawaani Hai Deewani', subtitle: 'Album • Pritam • 2013', to: '/album/1' },
  { id: 3, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', title: 'Kabir Singh', subtitle: 'Album • Sachet-Parampara • 2019', to: '/album/1' },
  { id: 4, image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop', title: 'Highway', subtitle: 'Album • A.R. Rahman • 2014', to: '/album/1' },
  { id: 5, image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop', title: 'Animal (Original Score)', subtitle: 'Album • Harshavardhan • 2023', to: '/album/1' },
  { id: 6, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', title: 'Sita Ramam', subtitle: 'Album • Vishal Chandrashekhar • 2022', to: '/album/1' }
];

// Section 6: Mixed for you (Personalized Playlists)
const MIXED_FOR_YOU = [
  { id: 1, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', title: 'My Supermix', subtitle: 'Auto playlist • 100 tracks', to: '/playlist/1' },
  { id: 2, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', title: 'Chill Mix', subtitle: 'Acoustic, lofi & relaxing beats', to: '/playlist/1' },
  { id: 3, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', title: 'Energy Boost Mix', subtitle: 'High tempo gym & party tracks', to: '/playlist/1' },
  { id: 4, image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop', title: 'Focus Instrumental Mix', subtitle: 'Ambient soundscapes & deep focus', to: '/playlist/1' },
  { id: 5, image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop', title: '90s Bollywood Dance', subtitle: 'Classic retro Bollywood hits', to: '/playlist/1' }
];

const Home = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('');
  const [savedMixes, setSavedMixes] = useState(new Set(['mix-2']));

  // Refs for smooth carousel scrolling
  const listenAgainRef = useRef(null);
  const quickPicksRef = useRef(null);
  const belaShendeRef = useRef(null);
  const playlistMixRef = useRef(null);
  const favoritesRef = useRef(null);
  const mixedRef = useRef(null);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollOffset = direction === 'left' ? -650 : 650;
      ref.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const toggleSaveMix = (id, e) => {
    e.stopPropagation();
    setSavedMixes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={styles.home}>
      {/* Top Filter Chips */}
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

      {/* 1. Listen Again Shelf */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.userAvatar}>M</div>
          <div className={styles.sectionTitleBlock}>
            <span className={styles.sectionSubtitle}>Mohan Divekar</span>
            <h2 className={styles.sectionTitle}>Listen again</h2>
          </div>
          <div className={styles.navButtons}>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(listenAgainRef, 'left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(listenAgainRef, 'right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className={styles.carousel} ref={listenAgainRef}>
          {LISTEN_AGAIN.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* 2. Quick Picks (4-Row Multi-Column Shelf) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleBlock}>
            <span className={styles.sectionSubtitle}>Start radio from a song</span>
            <h2 className={styles.sectionTitle}>Quick picks</h2>
          </div>
          <div className={styles.navButtons}>
            <button 
              className={styles.actionPillBtn}
              onClick={() => navigate('/album/1')}
            >
              <Play size={14} fill="currentColor" /> Play all
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(quickPicksRef, 'left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(quickPicksRef, 'right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.quickPicksGrid} ref={quickPicksRef}>
          {QUICK_PICKS.map(track => (
            <div 
              key={track.id} 
              className={styles.quickPickItem}
              onClick={() => navigate(track.to)}
            >
              <div className={styles.quickPickThumbWrapper}>
                <img src={track.image} alt={track.title} className={styles.quickPickThumb} />
                <div className={styles.quickPickPlayOverlay}>
                  <Play size={18} fill="currentColor" />
                </div>
              </div>
              <div className={styles.quickPickInfo}>
                <span className={styles.quickPickTitle}>{track.title}</span>
                <span className={styles.quickPickSubtitle}>{track.subtitle}</span>
              </div>
              <button 
                className={styles.quickPickMoreBtn}
                onClick={(e) => e.stopPropagation()}
                title="More"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Similar to Bela Shende */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleBlock}>
            <span className={styles.sectionSubtitle}>Similar to</span>
            <h2 className={styles.sectionTitle}>Bela Shende</h2>
          </div>
          <div className={styles.navButtons}>
            <button 
              className={styles.actionPillBtn}
              onClick={() => navigate('/artist/1')}
            >
              More
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(belaShendeRef, 'left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(belaShendeRef, 'right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className={styles.carousel} ref={belaShendeRef}>
          {BELA_SHENDE_SHELF.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* 4. Playlist Mix Cards Section (Cover image, Playlist Name, Top 3 Songs, Play & Save Buttons) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleBlock}>
            <span className={styles.sectionSubtitle}>Mixed for you</span>
            <h2 className={styles.sectionTitle}>Your Mixes</h2>
          </div>
          <div className={styles.navButtons}>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(playlistMixRef, 'left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(playlistMixRef, 'right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.mixCarousel} ref={playlistMixRef}>
          {PLAYLIST_MIXES.map(mix => (
            <div 
              key={mix.id} 
              className={styles.mixCard}
              onClick={() => navigate(mix.to)}
            >
              {/* Top Header: Square Cover on Left, Title + Creator + Count on Right */}
              <div className={styles.mixHeader}>
                <img src={mix.image} alt={mix.name} className={styles.mixHeaderCover} />
                <div className={styles.mixHeaderInfo}>
                  <h3 className={styles.mixTitle}>{mix.name}</h3>
                  <span className={styles.mixSub}>{mix.creator}</span>
                  <span className={styles.mixCount}>{mix.songCount}</span>
                </div>
              </div>

              {/* Description / Summary */}
              {mix.description && (
                <p className={styles.mixDescription}>{mix.description}</p>
              )}

              {/* 3 Song Rows */}
              <div className={styles.mixSongsList}>
                {mix.songs.map((song, idx) => (
                  <div 
                    key={idx} 
                    className={styles.mixSongRow}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(mix.to);
                    }}
                  >
                    <img src={song.image} alt={song.title} className={styles.mixSongThumb} />
                    <div className={styles.mixSongDetails}>
                      <span className={styles.mixSongTitle}>{song.title}</span>
                      <span className={styles.mixSongMeta}>{song.artist}</span>
                    </div>
                    <button 
                      className={styles.mixSongMenu}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      aria-label="More options"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Bottom Actions: Play (solid circle), Radio (circle), Save/Add (circle) */}
              <div className={styles.mixActions}>
                <button 
                  className={styles.mixPlayBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(mix.to);
                  }}
                  aria-label="Play playlist"
                >
                  <Play size={20} fill="currentColor" />
                </button>
                <button 
                  className={styles.mixActionBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  aria-label="Start radio"
                  title="Start radio"
                >
                  <Radio size={18} />
                </button>
                <button 
                  className={`${styles.mixActionBtn} ${savedMixes.has(mix.id) ? styles.saved : ''}`}
                  onClick={(e) => toggleSaveMix(mix.id, e)}
                  aria-label="Save to library"
                  title="Save to library"
                >
                  <ListPlus size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Forgotten Favorites / Masterpiece Soundtracks */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleBlock}>
            <span className={styles.sectionSubtitle}>Albums & Soundtracks</span>
            <h2 className={styles.sectionTitle}>Forgotten favorites</h2>
          </div>
          <div className={styles.navButtons}>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(favoritesRef, 'left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(favoritesRef, 'right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.carousel} ref={favoritesRef}>
          {FORGOTTEN_FAVORITES.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* 6. Mixed for you (Personalized Playlists) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleBlock}>
            <span className={styles.sectionSubtitle}>Personalized Feed</span>
            <h2 className={styles.sectionTitle}>Mixed for you</h2>
          </div>
          <div className={styles.navButtons}>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(mixedRef, 'left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scrollContainer(mixedRef, 'right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.carousel} ref={mixedRef}>
          {MIXED_FOR_YOU.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
