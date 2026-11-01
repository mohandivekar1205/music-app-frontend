import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ThumbsUp, 
  Podcast, 
  Clock, 
  LayoutGrid, 
  List as ListIcon, 
  Play, 
  MoreVertical,
  Check
} from 'lucide-react';
import styles from '../styles/pages/Library.module.css';
import Pill from '../components/common/Pill';
import Card from '../components/common/Card';

const FILTERS = ['Playlists', 'Podcasts', 'Songs', 'Albums', 'Artists', 'Profiles'];

const SORT_OPTIONS = [
  { id: 'activity', label: 'Recent activity' },
  { id: 'played', label: 'Recently played' },
  { id: 'saved', label: 'Recently saved' },
];

const SPECIAL_PLAYLISTS = [
  {
    id: 'special-liked',
    type: 'liked',
    category: 'Playlists',
    title: 'Liked Music',
    subtitle: 'Auto playlist • 120 tracks',
    trackCount: '120 songs',
    icon: ThumbsUp,
    bgClass: styles.likedBg,
    to: '/playlist/1',
    activity: 100,
    lastPlayed: 100,
    dateSaved: 100,
  },
  {
    id: 'special-episodes',
    type: 'episodes',
    category: 'Podcasts',
    title: 'New Episodes',
    subtitle: 'Auto playlist • 10 episodes',
    trackCount: '10 eps',
    icon: Podcast,
    bgClass: styles.episodesBg,
    to: '/podcast/1',
    activity: 95,
    lastPlayed: 90,
    dateSaved: 95,
  },
  {
    id: 'special-later',
    type: 'later',
    category: 'Podcasts',
    title: 'Episodes for Later',
    subtitle: 'Auto playlist • 1 episode',
    trackCount: '1 ep',
    icon: Clock,
    bgClass: styles.laterBg,
    to: '/podcast/1',
    activity: 90,
    lastPlayed: 85,
    dateSaved: 90,
  }
];

const MOCK_LIBRARY = [
  { 
    id: 1, 
    image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=200&h=200&fit=crop', 
    title: 'ONCE UPON A TIME IN MUMBAAI', 
    subtitle: 'Album • AJAY DEVGAN', 
    category: 'Albums',
    trackCount: '12 songs',
    to: '/album/1',
    activity: 80,
    lastPlayed: 50,
    dateSaved: 85,
  },
  { 
    id: 2, 
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&h=200&fit=crop', 
    title: 'Karan Aujla', 
    subtitle: 'Artist • 160M listeners', 
    category: 'Artists',
    trackCount: '5.74M fans',
    isArtist: true,
    to: '/artist/1',
    activity: 85,
    lastPlayed: 88,
    dateSaved: 80,
  },
  { 
    id: 3, 
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop', 
    title: '20 June 2026', 
    subtitle: 'Playlist • Mohan Divekar', 
    category: 'Playlists',
    trackCount: '16 songs',
    to: '/playlist/1',
    activity: 78,
    lastPlayed: 60,
    dateSaved: 82,
  },
  { 
    id: 4, 
    image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=200&h=200&fit=crop', 
    title: 'Figuring Out With Raj Shamani', 
    subtitle: 'Podcast • Raj Shamani', 
    category: 'Podcasts',
    trackCount: '84 eps',
    to: '/podcast/1',
    activity: 75,
    lastPlayed: 82,
    dateSaved: 70,
  },
  { 
    id: 5, 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop', 
    title: 'Jogi (Now Playing)', 
    subtitle: 'Song • Yasser Desai & Aakanksha Sharma', 
    category: 'Songs',
    trackCount: '4:34',
    to: '/album/1',
    activity: 89,
    lastPlayed: 92,
    dateSaved: 65,
  },
  { 
    id: 6, 
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&h=200&fit=crop', 
    title: 'World Order Is a Lie (Ep)', 
    subtitle: 'Episode • Prof. Jiang', 
    category: 'Podcasts',
    trackCount: '2 hr 31 min',
    to: '/episode/1',
    activity: 72,
    lastPlayed: 79,
    dateSaved: 68,
  },
  { 
    id: 7, 
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop', 
    title: 'Veer (Original Motion Picture)', 
    subtitle: 'Album • Sajid Wajid • 2009', 
    category: 'Albums',
    trackCount: '8 songs',
    to: '/album/1',
    activity: 68,
    lastPlayed: 45,
    dateSaved: 76,
  },
  { 
    id: 8, 
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop', 
    title: '90s Bollywood Dance', 
    subtitle: 'Playlist • YouTube Music', 
    category: 'Playlists',
    trackCount: '61 songs',
    to: '/playlist/1',
    activity: 65,
    lastPlayed: 71,
    dateSaved: 62,
  },
  { 
    id: 9, 
    image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=200&h=200&fit=crop', 
    title: 'Relaxing tunes/beats', 
    subtitle: 'Playlist • Mohan Divekar', 
    category: 'Playlists',
    trackCount: '36 songs',
    to: '/playlist/1',
    activity: 62,
    lastPlayed: 55,
    dateSaved: 60,
  },
  { 
    id: 10, 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', 
    title: 'Satinder Sartaaj', 
    subtitle: 'Artist • 2.05M subscribers', 
    category: 'Artists',
    trackCount: '2.05M fans',
    isArtist: true,
    to: '/artist/1',
    activity: 58,
    lastPlayed: 64,
    dateSaved: 54,
  },
  { 
    id: 11, 
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=200&h=200&fit=crop', 
    title: 'Aap Kaa Surroor', 
    subtitle: 'Album • Himesh Reshammiya', 
    category: 'Albums',
    trackCount: '16 songs',
    to: '/album/1',
    activity: 54,
    lastPlayed: 40,
    dateSaved: 52,
  },
  { 
    id: 12, 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', 
    title: 'Full Dopamine songs', 
    subtitle: 'Playlist • Mohan Divekar', 
    category: 'Playlists',
    trackCount: '54 songs',
    to: '/playlist/1',
    activity: 50,
    lastPlayed: 48,
    dateSaved: 49,
  }
];

const Library = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('activity'); // 'activity' | 'played' | 'saved'
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };

    if (isSortOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSortOpen]);

  // Current active sort label
  const currentSortOption = SORT_OPTIONS.find(opt => opt.id === sortBy) || SORT_OPTIONS[0];

  // Sorter function based on active sort
  const sortItems = (a, b) => {
    if (sortBy === 'played') {
      return (b.lastPlayed || 0) - (a.lastPlayed || 0);
    }
    if (sortBy === 'saved') {
      return (b.dateSaved || 0) - (a.dateSaved || 0);
    }
    // Default 'activity'
    return (b.activity || 0) - (a.activity || 0);
  };

  // Filter and sort special playlists
  const filteredSpecial = SPECIAL_PLAYLISTS
    .filter(item => {
      if (!activeFilter) return true;
      return item.category.toLowerCase() === activeFilter.toLowerCase();
    })
    .sort(sortItems);

  // Filter and sort standard library items
  const filteredItems = MOCK_LIBRARY
    .filter(item => {
      if (!activeFilter) return true;
      return item.category.toLowerCase() === activeFilter.toLowerCase();
    })
    .sort(sortItems);

  const handleItemClick = (to) => {
    if (to) {
      navigate(to);
    }
  };

  const handlePlayClick = (e, to) => {
    e.stopPropagation();
    if (to) {
      navigate(to);
    }
  };

  return (
    <div className={styles.library}>
      {/* Top Header with Title & View Controls */}
      <div className={styles.header}>
        <h1 className={styles.title}>Library</h1>

        <div className={styles.headerRight}>
          {/* Sort By Dropdown Option */}
          <div className={styles.sortContainer} ref={sortRef}>
            <button 
              className={`${styles.sortBtn} ${isSortOpen ? styles.sortBtnActive : ''}`}
              onClick={() => setIsSortOpen(!isSortOpen)}
              aria-haspopup="true"
              aria-expanded={isSortOpen}
            >
              <span>{currentSortOption.label}</span>
              <ChevronDown size={16} className={`${styles.chevron} ${isSortOpen ? styles.chevronOpen : ''}`} />
            </button>

            {isSortOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>Sort by</div>
                {SORT_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className={`${styles.dropdownItem} ${sortBy === opt.id ? styles.activeDropdownItem : ''}`}
                    onClick={() => {
                      setSortBy(opt.id);
                      setIsSortOpen(false);
                    }}
                  >
                    <span className={styles.checkIcon}>
                      {sortBy === opt.id && <Check size={16} />}
                    </span>
                    <span>{opt.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Toggle option: List View to Grid View and vice versa */}
          <div className={styles.viewToggleGroup}>
            <button
              className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.activeToggle : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
              aria-label="Switch to grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.activeToggle : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
              aria-label="Switch to list view"
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
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

      {/* View Mode 1: Grid View */}
      {viewMode === 'grid' && (
        <div className={styles.grid}>
          {filteredSpecial.map(special => {
            const Icon = special.icon;
            return (
              <div 
                key={special.id} 
                className={styles.specialCard}
                onClick={() => handleItemClick(special.to)}
              >
                <div className={`${styles.specialBg} ${special.bgClass}`}>
                  <Icon size={48} fill="currentColor" />
                  <div className={styles.specialPlayOverlay}>
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
                <div className={styles.specialTitle}>{special.title}</div>
                <div className={styles.specialSubtitle}>{special.subtitle}</div>
              </div>
            );
          })}

          {filteredItems.map(item => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      )}

      {/* View Mode 2: List View */}
      {viewMode === 'list' && (
        <div className={styles.listView}>
          {filteredSpecial.map(special => {
            const Icon = special.icon;
            return (
              <div 
                key={special.id} 
                className={styles.listRow}
                onClick={() => handleItemClick(special.to)}
              >
                <div className={styles.listThumbWrapper}>
                  <div className={`${styles.listSpecialBg} ${special.bgClass}`}>
                    <Icon size={22} fill="currentColor" />
                  </div>
                  <div className={styles.listPlayOverlay}>
                    <Play size={18} fill="currentColor" />
                  </div>
                </div>

                <div className={styles.listInfo}>
                  <div className={styles.listTitle}>{special.title}</div>
                  <div className={styles.listSubtitle}>{special.subtitle}</div>
                </div>

                <div className={styles.listMeta}>
                  <span className={styles.listTrackCount}>{special.trackCount}</span>
                  <div className={styles.listActions}>
                    <button 
                      className={styles.listActionBtn}
                      onClick={(e) => handlePlayClick(e, special.to)}
                      title="Play"
                    >
                      <Play size={16} fill="currentColor" />
                    </button>
                    <button 
                      className={styles.listActionBtn}
                      onClick={(e) => e.stopPropagation()}
                      title="More options"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className={styles.listRow}
              onClick={() => handleItemClick(item.to)}
            >
              <div className={`${styles.listThumbWrapper} ${item.isArtist ? styles.artistThumb : ''}`}>
                <img src={item.image} alt={item.title} className={styles.listThumb} />
                <div className={styles.listPlayOverlay}>
                  <Play size={18} fill="currentColor" />
                </div>
              </div>

              <div className={styles.listInfo}>
                <div className={styles.listTitle}>{item.title}</div>
                <div className={styles.listSubtitle}>{item.subtitle}</div>
              </div>

              <div className={styles.listMeta}>
                <span className={styles.listTrackCount}>{item.trackCount}</span>
                <div className={styles.listActions}>
                  <button 
                    className={styles.listActionBtn}
                    onClick={(e) => handlePlayClick(e, item.to)}
                    title="Play"
                  >
                    <Play size={16} fill="currentColor" />
                  </button>
                  <button 
                    className={styles.listActionBtn}
                    onClick={(e) => e.stopPropagation()}
                    title="More options"
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
