import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Bookmark, Plus } from 'lucide-react';
import styles from '../../styles/layout/Sidebar.module.css';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
  { id: 'library', label: 'Library', icon: Bookmark, path: '/library' },
];

const mockPlaylists = [
  { id: 1, title: 'Liked Music', sub: 'Auto playlist' },
  { id: 2, title: 'New Episodes', sub: 'Auto playlist' },
  { id: 3, title: '20 June 2026', sub: 'Mohan Divekar' },
  { id: 4, title: '90s Bollywood Dance', sub: 'YouTube Music' },
  { id: 5, title: 'Relaxing tunes/beats', sub: 'Mohan Divekar' },
];

const Sidebar = ({ isExpanded, onNewPlaylist }) => {
  return (
    <nav className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.navGroup}>
        {navItems.map((item) => (
          <NavLink 
            key={item.id} 
            to={item.path} 
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <item.icon size={24} strokeWidth={1.5} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className={styles.divider} />

      {isExpanded && (
        <button className={styles.newPlaylistBtn} onClick={onNewPlaylist}>
          <Plus size={20} />
          <span className={styles.btnText}>New playlist</span>
        </button>
      )}

      <div className={styles.playlistList}>
        {mockPlaylists.map((pl) => (
          <div key={pl.id} className={styles.playlistItem}>
            <div className={styles.playlistTitle}>{pl.title}</div>
            <div className={styles.playlistSub}>{pl.sub}</div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
