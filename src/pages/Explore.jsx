import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Heart, 
  Share2, 
  Compass, 
  LayoutGrid, 
  RotateCcw 
} from 'lucide-react';
import styles from '../styles/pages/Explore.module.css';

const UNIT_SIZE = 220; // 200px cell + 20px gap
const GAP = 20;
const BLOCK_COLS = 6;
const BLOCK_ROWS = 4;
const BLOCKS_X = 3;
const BLOCKS_Y = 3;
const TOTAL_COLS = BLOCKS_X * BLOCK_COLS; // 18 columns
const TOTAL_ROWS = BLOCKS_Y * BLOCK_ROWS; // 12 rows
const TOTAL_W = TOTAL_COLS * UNIT_SIZE; // 3960px
const TOTAL_H = TOTAL_ROWS * UNIT_SIZE; // 2640px

// The 13 interlocking mosaic tiles filling the 6x4 (24-cell) grid
const MOSAIC_TEMPLATE = [
  { col: 0, row: 0, colSpan: 2, rowSpan: 2, type: 'featured' },
  { col: 2, row: 0, colSpan: 2, rowSpan: 1, type: 'banner' },
  { col: 2, row: 1, colSpan: 1, rowSpan: 1, type: 'standard' },
  { col: 3, row: 1, colSpan: 1, rowSpan: 1, type: 'standard' },
  { col: 4, row: 0, colSpan: 1, rowSpan: 2, type: 'artist' },
  { col: 5, row: 0, colSpan: 1, rowSpan: 1, type: 'standard' },
  { col: 5, row: 1, colSpan: 1, rowSpan: 1, type: 'standard' },
  { col: 0, row: 2, colSpan: 1, rowSpan: 2, type: 'artist' },
  { col: 1, row: 2, colSpan: 2, rowSpan: 1, type: 'banner' },
  { col: 1, row: 3, colSpan: 1, rowSpan: 1, type: 'standard' },
  { col: 2, row: 3, colSpan: 1, rowSpan: 1, type: 'standard' },
  { col: 3, row: 2, colSpan: 2, rowSpan: 2, type: 'featured' },
  { col: 5, row: 2, colSpan: 1, rowSpan: 2, type: 'podcast' },
];

const CURATED_BLOCKS_DATA = [
  // Block 0
  [
    { title: 'Top 50 Hindi Hits', subtitle: 'YouTube Music • 50 Songs', badge: 'FEATURED PLAYLIST', stats: '2.4M Saves', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop' },
    { title: 'Jogi (From Shaadi Mein Zaroor Aana)', subtitle: 'Yasser Desai & Aakanksha Sharma', badge: 'TRENDING SONG', duration: '4:34', category: 'Songs', to: '/album/1', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=400&h=200&fit=crop' },
    { title: 'Hanuman Chalisa', subtitle: 'Shekhar Ravjiani', category: 'Songs', to: '/album/1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
    { title: 'Sufiyana Soul', subtitle: 'Soulful Sufi gems', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
    { title: 'Karan Aujla', subtitle: '160M Monthly Listeners', category: 'Artists', to: '/artist/1', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=600&fit=crop' },
    { title: '90s Bollywood Dance', subtitle: 'All-time retro party', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { title: 'Rockstar (Deluxe)', subtitle: 'A.R. Rahman', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&h=300&fit=crop' },
    { title: 'Arijit Singh', subtitle: '240M Monthly Listeners', category: 'Artists', to: '/artist/1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=600&fit=crop' },
    { title: 'Raataan Lambiyan', subtitle: 'Tanishk Bagchi & Jubin Nautiyal', badge: 'TOP SINGLE', duration: '3:51', category: 'Songs', to: '/album/1', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=200&fit=crop' },
    { title: 'Yeh Jawaani Hai Deewani', subtitle: 'Pritam', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
    { title: 'Aashiqui 2 Remastered', subtitle: 'Mithoon & Ankit Tiwari', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop' },
    { title: 'Shershaah (Soundtrack)', subtitle: 'B Praak, Jasleen Royal', badge: 'MASTERPIECE ALBUM', stats: '11 Songs', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=600&h=600&fit=crop' },
    { title: 'Figuring Out', subtitle: '196K Views • 1 hr 29 min', host: 'Raj Shamani', category: 'Podcasts', to: '/podcast/1', image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=300&h=600&fit=crop' }
  ],
  // Block 1
  [
    { title: 'Punjabi Hits 2026', subtitle: 'Karan Aujla, AP Dhillon, Diljit', badge: 'CHART TOPPERS', stats: '40 Songs', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=600&h=600&fit=crop' },
    { title: 'Winning Speech', subtitle: 'Karan Aujla & Mxrci', badge: 'VIRAL HIT', duration: '3:22', category: 'Songs', to: '/artist/1', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=200&fit=crop' },
    { title: 'Kabir Singh', subtitle: 'Sachet-Parampara & Vishal Mishra', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop' },
    { title: 'Midnight Drive Lofi', subtitle: 'Deep night acoustic beats', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
    { title: 'Diljit Dosanjh', subtitle: '110M Monthly Listeners', category: 'Artists', to: '/artist/1', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=600&fit=crop' },
    { title: 'Relaxing Tunes', subtitle: 'Mohan Divekar', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
    { title: 'ONCE UPON A TIME IN MUMBAAI', subtitle: 'Pritam • Ajay Devgn', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1593697821252-0cbfabc39c10?w=300&h=300&fit=crop' },
    { title: 'Shreya Ghoshal', subtitle: '185M Monthly Listeners', category: 'Artists', to: '/artist/1', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=600&fit=crop' },
    { title: 'Kesariya (Dance Mix)', subtitle: 'Pritam & Arijit Singh', badge: 'EXCLUSIVE AUDIO', duration: '4:15', category: 'Songs', to: '/album/1', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=200&fit=crop' },
    { title: 'Sita Ramam Melodies', subtitle: 'Vishal Chandrashekhar', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&h=300&fit=crop' },
    { title: 'Barfi (Original)', subtitle: 'Pritam & Swanand Kirkire', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop' },
    { title: 'Chill Vibes & Acoustic', subtitle: 'Smooth beats to unwind', badge: 'DAILY MIX', stats: '35 Songs', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop' },
    { title: 'The Ranveer Show', subtitle: '520K Views • Top Episode', host: 'Ranveer Allahbadia', category: 'Podcasts', to: '/podcast/1', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&h=600&fit=crop' }
  ],
  // Block 2
  [
    { title: 'New Music Bollywood', subtitle: 'Fresh Bollywood releases', badge: 'NEW THIS WEEK', stats: '65 Songs', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop' },
    { title: 'Sab Tera', subtitle: 'Armaan Malik & Shraddha Kapoor', badge: 'ROMANTIC HIT', duration: '3:49', category: 'Songs', to: '/album/1', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=200&fit=crop' },
    { title: 'Animal (Original Score)', subtitle: 'Harshavardhan Rameshwar', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop' },
    { title: 'Gym Workout Beast', subtitle: 'High energy workout boost', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
    { title: 'Tanishk Bagchi', subtitle: '95M Monthly Listeners', category: 'Artists', to: '/artist/1', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=600&fit=crop' },
    { title: 'Coffee & Acoustic', subtitle: 'Warm vocal sessions', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
    { title: 'Highway Soundtrack', subtitle: 'A.R. Rahman & Alia Bhatt', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f14e?w=300&h=300&fit=crop' },
    { title: 'Bela Shende', subtitle: '48M Monthly Listeners', category: 'Artists', to: '/artist/1', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=600&fit=crop' },
    { title: 'Aayat (Soulful Version)', subtitle: 'Sanjay Leela Bhansali & Arijit', badge: 'CLASSIC GEM', duration: '4:22', category: 'Songs', to: '/album/1', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop' },
    { title: 'Brahmastra Part One', subtitle: 'Pritam', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop' },
    { title: 'Jawan (Original Score)', subtitle: 'Anirudh Ravichander', category: 'Albums', to: '/album/1', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { title: 'Global Viral 50', subtitle: 'Trending tracks across the world', badge: 'VIRAL SPOTLIGHT', stats: '50 Songs', category: 'Playlists', to: '/playlist/1', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop' },
    { title: 'World Order Is a Lie', subtitle: 'Prof. Jiang Xueqin • Geopolitics', host: 'Figuring Out Extra', category: 'Podcasts', to: '/episode/1', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=600&fit=crop' }
  ]
];

// Generate total items by combining the 3x3 blocks with coordinate data
const generateMosaicGridItems = () => {
  const items = [];
  let globalId = 0;

  for (let by = 0; by < BLOCKS_Y; by++) {
    for (let bx = 0; bx < BLOCKS_X; bx++) {
      const blockDataIndex = (by * BLOCKS_X + bx) % CURATED_BLOCKS_DATA.length;
      const blockData = CURATED_BLOCKS_DATA[blockDataIndex];

      MOSAIC_TEMPLATE.forEach((template, idx) => {
        const itemInfo = blockData[idx % blockData.length];
        const col = bx * BLOCK_COLS + template.col;
        const row = by * BLOCK_ROWS + template.row;
        const baseX = col * UNIT_SIZE;
        const baseY = row * UNIT_SIZE;
        const width = template.colSpan * UNIT_SIZE - GAP;
        const height = template.rowSpan * UNIT_SIZE - GAP;

        items.push({
          id: globalId++,
          ...template,
          ...itemInfo,
          col,
          row,
          baseX,
          baseY,
          width,
          height,
        });
      });
    }
  }

  return items;
};

const ALL_MOSAIC_ITEMS = generateMosaicGridItems();
const CATEGORIES = ['All', 'Playlists', 'Songs', 'Albums', 'Artists', 'Podcasts'];

const Explore = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('canvas'); // 'canvas' | 'grid'

  // Physics / Pan state for infinite canvas
  const pan = useRef({ x: 0, y: 0 });
  const targetPan = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  const wrap = (val, max) => ((val % max) + max) % max;

  // Render loop using lerp and modulo wrapping
  useEffect(() => {
    if (viewMode !== 'canvas') return;

    let animId;
    const updateTransforms = () => {
      // Linear interpolation for smooth gliding motion
      pan.current.x += (targetPan.current.x - pan.current.x) * 0.12;
      pan.current.y += (targetPan.current.y - pan.current.y) * 0.12;

      const maxShift = 500; // Extra buffer exceeding largest card dimension (420px)

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const item = ALL_MOSAIC_ITEMS[i];
        if (!item) return;

        const x = wrap(item.baseX + pan.current.x + maxShift, TOTAL_W) - maxShift;
        const y = wrap(item.baseY + pan.current.y + maxShift, TOTAL_H) - maxShift;

        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      animId = requestAnimationFrame(updateTransforms);
    };

    animId = requestAnimationFrame(updateTransforms);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [viewMode]);

  // Pointer dragging handlers
  const handlePointerDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    startPos.current = { x: e.clientX, y: e.clientY };
    lastMouse.current = { x: e.clientX, y: e.clientY };

    if (canvasRef.current) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    if (Math.hypot(e.clientX - startPos.current.x, e.clientY - startPos.current.y) > 6) {
      hasDragged.current = true;
    }

    targetPan.current.x += dx;
    targetPan.current.y += dy;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    if (canvasRef.current) {
      try {
        canvasRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already released
      }
    }
  };

  const handleWheel = (e) => {
    if (viewMode !== 'canvas') return;
    targetPan.current.x -= e.deltaX;
    targetPan.current.y -= e.deltaY;
  };

  const handleResetPan = () => {
    targetPan.current = { x: 0, y: 0 };
  };

  // Click card handler (ignores clicks triggered by dragging)
  const handleCardClick = (item) => {
    if (hasDragged.current) return;
    if (item.to) {
      navigate(item.to);
    }
  };

  const handlePlayClick = (item, e) => {
    e.stopPropagation();
    if (hasDragged.current) return;
    if (item.to) {
      navigate(item.to);
    }
  };

  // Render individual card based on mosaic tile type
  const renderCardContent = (item, isDimmed) => {
    switch (item.type) {
      case 'featured': // 2x2
        return (
          <div className={`${styles.mosaicCard} ${isDimmed ? styles.dimmed : ''}`}>
            <img src={item.image} alt={item.title} className={styles.cardImage} draggable="false" />
            <div className={styles.cardOverlayGradient} />
            <div className={styles.cardTopBadge}>
              <span className={styles.pillBadge}>{item.badge || 'FEATURED'}</span>
              <span className={styles.statsBadge}>{item.stats || 'Trending'}</span>
            </div>
            <div className={styles.centerPlayOverlay}>
              <button 
                className={styles.largePlayBtn}
                onClick={(e) => handlePlayClick(item, e)}
                title="Play"
              >
                <Play size={28} fill="currentColor" />
              </button>
            </div>
            <div className={styles.cardBottomContent}>
              <h3 className={styles.featuredTitle}>{item.title}</h3>
              <p className={styles.featuredSubtitle}>{item.subtitle}</p>
              <div className={styles.cardActions}>
                <button className={styles.actionBtn} title="Save to library"><Heart size={16} /></button>
                <button className={styles.actionBtn} title="Share"><Share2 size={16} /></button>
              </div>
            </div>
          </div>
        );

      case 'artist': // 1x2
        return (
          <div className={`${styles.mosaicCard} ${styles.artistCard} ${isDimmed ? styles.dimmed : ''}`}>
            <img src={item.image} alt={item.title} className={styles.cardImage} draggable="false" />
            <div className={styles.artistGradient} />
            <div className={styles.cardTopBadge}>
              <span className={styles.pillBadge}>ARTIST</span>
            </div>
            <div className={styles.centerPlayOverlay}>
              <button 
                className={styles.mediumPlayBtn}
                onClick={(e) => handlePlayClick(item, e)}
                title="Play Artist"
              >
                <Play size={22} fill="currentColor" />
              </button>
            </div>
            <div className={styles.cardBottomContent}>
              <h3 className={styles.artistName}>{item.title}</h3>
              <p className={styles.artistStats}>{item.subtitle}</p>
              <div className={styles.artistPillBtn}>Explore Artist</div>
            </div>
          </div>
        );

      case 'banner': // 2x1
        return (
          <div className={`${styles.mosaicCard} ${styles.bannerCard} ${isDimmed ? styles.dimmed : ''}`}>
            <div className={styles.bannerThumbWrapper}>
              <img src={item.image} alt={item.title} className={styles.bannerThumb} draggable="false" />
              <button 
                className={styles.bannerPlayOverlay}
                onClick={(e) => handlePlayClick(item, e)}
                title="Play Track"
              >
                <Play size={22} fill="currentColor" />
              </button>
            </div>
            <div className={styles.bannerDetails}>
              <div className={styles.bannerBadge}>{item.badge || 'TRENDING'}</div>
              <h4 className={styles.bannerTitle}>{item.title}</h4>
              <p className={styles.bannerSubtitle}>{item.subtitle}</p>
              <div className={styles.bannerWaveform}>
                <span className={styles.waveBar} style={{ height: '40%' }} />
                <span className={styles.waveBar} style={{ height: '85%' }} />
                <span className={styles.waveBar} style={{ height: '60%' }} />
                <span className={styles.waveBar} style={{ height: '100%' }} />
                <span className={styles.waveBar} style={{ height: '50%' }} />
                <span className={styles.waveDuration}>{item.duration || '3:45'}</span>
              </div>
            </div>
          </div>
        );

      case 'podcast': // 1x2
        return (
          <div className={`${styles.mosaicCard} ${styles.podcastCard} ${isDimmed ? styles.dimmed : ''}`}>
            <img src={item.image} alt={item.title} className={styles.cardImage} draggable="false" />
            <div className={styles.podcastGradient} />
            <div className={styles.cardTopBadge}>
              <span className={`${styles.pillBadge} ${styles.podcastBadge}`}>PODCAST</span>
            </div>
            <div className={styles.centerPlayOverlay}>
              <button 
                className={styles.mediumPlayBtn}
                onClick={(e) => handlePlayClick(item, e)}
                title="Play Episode"
              >
                <Play size={22} fill="currentColor" />
              </button>
            </div>
            <div className={styles.cardBottomContent}>
              <span className={styles.podcastHost}>{item.host || 'Show Host'}</span>
              <h3 className={styles.podcastTitle}>{item.title}</h3>
              <p className={styles.podcastStats}>{item.subtitle}</p>
            </div>
          </div>
        );

      case 'standard': // 1x1
      default:
        return (
          <div className={`${styles.mosaicCard} ${styles.standardCard} ${isDimmed ? styles.dimmed : ''}`}>
            <img src={item.image} alt={item.title} className={styles.cardImage} draggable="false" />
            <div className={styles.standardGradient} />
            <div className={styles.standardTag}>{item.category}</div>
            <div className={styles.centerPlayOverlay}>
              <button 
                className={styles.smallPlayBtn}
                onClick={(e) => handlePlayClick(item, e)}
                title="Play"
              >
                <Play size={18} fill="currentColor" />
              </button>
            </div>
            <div className={styles.cardBottomContent}>
              <h4 className={styles.standardTitle}>{item.title}</h4>
              <p className={styles.standardSubtitle}>{item.subtitle}</p>
            </div>
          </div>
        );
    }
  };

  const getSpanClass = (item) => {
    if (item.colSpan === 2 && item.rowSpan === 2) return styles.span2x2;
    if (item.colSpan === 2 && item.rowSpan === 1) return styles.span2x1;
    if (item.colSpan === 1 && item.rowSpan === 2) return styles.span1x2;
    return styles.span1x1;
  };

  return (
    <div className={styles.explore}>
      {/* Floating Header Glass Overlay */}
      <div className={styles.headerOverlay}>
        <div className={styles.headerGlass}>
          <div className={styles.titleArea}>
            <Compass size={22} strokeWidth={2} color="var(--brand-primary)" />
            <h1>Explore</h1>
          </div>

          <div className={styles.filterPills}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterPill} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controlsGlass}>
          <div className={styles.hintBadge}>
            <span>{viewMode === 'canvas' ? 'Drag or scroll canvas' : 'Mosaic Grid View'}</span>
          </div>

          <button
            className={`${styles.controlBtn} ${viewMode === 'canvas' ? styles.active : ''}`}
            onClick={() => setViewMode('canvas')}
            title="Infinite Canvas View"
          >
            <Compass size={15} />
            <span>Canvas</span>
          </button>

          <button
            className={`${styles.controlBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
            title="Standard Mosaic Grid View"
          >
            <LayoutGrid size={15} />
            <span>Grid</span>
          </button>

          {viewMode === 'canvas' && (
            <button
              className={styles.controlBtn}
              onClick={handleResetPan}
              title="Reset view to center"
            >
              <RotateCcw size={14} />
              <span>Center</span>
            </button>
          )}
        </div>
      </div>

      {/* View Mode 1: Infinite Draggable Mosaic Canvas */}
      {viewMode === 'canvas' && (
        <div 
          className={styles.canvas}
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
        >
          {ALL_MOSAIC_ITEMS.map((item, i) => {
            const isDimmed = activeCategory !== 'All' && item.category !== activeCategory;
            return (
              <div 
                key={item.id}
                className={styles.cardWrapper}
                ref={el => cardRefs.current[i] = el}
                style={{
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                }}
                onClick={() => handleCardClick(item)}
              >
                {renderCardContent(item, isDimmed)}
              </div>
            );
          })}
        </div>
      )}

      {/* View Mode 2: Scrollable Responsive Mosaic Grid */}
      {viewMode === 'grid' && (
        <div className={styles.scrollableGridContainer}>
          <div className={styles.mosaicGrid}>
            {ALL_MOSAIC_ITEMS.slice(0, 39).map((item) => {
              const isDimmed = activeCategory !== 'All' && item.category !== activeCategory;
              return (
                <div 
                  key={item.id}
                  className={`${styles.gridItem} ${getSpanClass(item)}`}
                  onClick={() => handleCardClick(item)}
                >
                  {renderCardContent(item, isDimmed)}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
