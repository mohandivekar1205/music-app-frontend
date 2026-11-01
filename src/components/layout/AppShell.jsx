import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../styles/layout/AppShell.module.css';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import BottomPlayer from './BottomPlayer';
import NewPlaylistModal from '../common/NewPlaylistModal';
import Song from '../../pages/Song'; // Import Song page to use as overlay

const AppShell = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSongOpen, setIsSongOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleSong = () => {
    setIsSongOpen(!isSongOpen);
  };

  if (isAuthPage) {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: 'var(--bg-secondary)', overflowY: 'auto' }}>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <div className={styles.topBarArea}>
        <TopBar onMenuClick={toggleSidebar} isSidebarExpanded={isSidebarExpanded} />
      </div>
      <div className={styles.mainArea}>
        <div className={styles.sidebarArea}>
          <Sidebar 
            isExpanded={isSidebarExpanded} 
            onNewPlaylist={() => setIsModalOpen(true)}
          />
        </div>
        <div className={styles.contentWrapper}>
          <main className={styles.contentArea}>
            {children}
          </main>
          
          <div className={`${styles.songOverlay} ${isSongOpen ? styles.songOpen : styles.songClosed}`}>
            <Song />
          </div>
        </div>
      </div>
      <div className={styles.bottomPlayerArea}>
        <BottomPlayer isSongOpen={isSongOpen} onToggleSong={toggleSong} />
      </div>
      
      <NewPlaylistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AppShell;
