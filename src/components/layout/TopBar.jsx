import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  PlayCircle, 
  Search, 
  History, 
  Upload, 
  Settings, 
  FileText, 
  HelpCircle, 
  MessageSquare,
  LogOut 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/layout/TopBar.module.css';

const TopBar = ({ onMenuClick, isSidebarExpanded = true }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isProfileOpen]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
    }
  };

  const handleMenuClick = (action) => {
    setIsProfileOpen(false);
    if (action === 'history') {
      navigate('/history');
    } else if (action === 'upload') {
      navigate('/upload');
    } else if (action === 'logout') {
      navigate('/login');
    }
  };

  return (
    <header className={styles.topBar}>
      <div className={`${styles.leftSection} ${isSidebarExpanded ? styles.expanded : styles.collapsed}`}>
        <button className={styles.menuButton} onClick={onMenuClick} aria-label="Menu">
          <Menu size={24} strokeWidth={1.5} />
        </button>
        {isSidebarExpanded && (
          <div className={styles.brand} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <PlayCircle size={28} className={styles.brandIcon} fill="currentColor" stroke="white" />
            <span className={styles.brandText}>Music</span>
          </div>
        )}
      </div>

      <div className={styles.centerSection}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Search songs, albums, artists, podcasts" 
            className={styles.searchInput}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* History Icon on the left side of profile icon */}
        <button 
          className={styles.historyBtn}
          onClick={() => navigate('/history')}
          title="History"
          aria-label="History"
        >
          <History size={20} strokeWidth={1.8} />
        </button>

        {/* Profile Avatar and Dropdown Popup */}
        <div className={styles.profileWrapper} ref={profileRef}>
          <div 
            className={styles.userAvatar} 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            title="Account"
            aria-haspopup="true"
            aria-expanded={isProfileOpen}
          >
            M
          </div>

          {isProfileOpen && (
            <div className={styles.profilePopup}>
              {/* Header: Full Name and Username */}
              <div className={styles.profileHeader}>
                <div className={styles.popupAvatar}>M</div>
                <div className={styles.profileInfo}>
                  <span className={styles.profileFullName}>Mohan Divekar</span>
                  <span className={styles.profileUsername}>@mohandivekar125</span>
                </div>
              </div>

              <div className={styles.divider} />

              {/* Menu List */}
              <div className={styles.menuList}>
                <button 
                  className={styles.menuItem}
                  onClick={() => handleMenuClick('upload')}
                >
                  <span className={styles.menuIcon}>
                    <Upload size={18} strokeWidth={1.8} />
                  </span>
                  <span>Upload music</span>
                </button>

                <button 
                  className={styles.menuItem}
                  onClick={() => handleMenuClick('history')}
                >
                  <span className={styles.menuIcon}>
                    <History size={18} strokeWidth={1.8} />
                  </span>
                  <span>History</span>
                </button>

                <button 
                  className={styles.menuItem}
                  onClick={() => handleMenuClick('settings')}
                >
                  <span className={styles.menuIcon}>
                    <Settings size={18} strokeWidth={1.8} />
                  </span>
                  <span>Setting</span>
                </button>

                <button 
                  className={styles.menuItem}
                  onClick={() => handleMenuClick('terms')}
                >
                  <span className={styles.menuIcon}>
                    <FileText size={18} strokeWidth={1.8} />
                  </span>
                  <span>Terms and condition</span>
                </button>

                <button 
                  className={styles.menuItem}
                  onClick={() => handleMenuClick('help')}
                >
                  <span className={styles.menuIcon}>
                    <HelpCircle size={18} strokeWidth={1.8} />
                  </span>
                  <span>Help</span>
                </button>

                <button 
                  className={styles.menuItem}
                  onClick={() => handleMenuClick('feedback')}
                >
                  <span className={styles.menuIcon}>
                    <MessageSquare size={18} strokeWidth={1.8} />
                  </span>
                  <span>Send feedback</span>
                </button>

                <div className={styles.divider} />

                <button 
                  className={styles.menuItem}
                  onClick={() => handleMenuClick('logout')}
                >
                  <span className={styles.menuIcon}>
                    <LogOut size={18} strokeWidth={1.8} />
                  </span>
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
