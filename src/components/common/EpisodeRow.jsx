import React from 'react';
import { Play, MoreVertical } from 'lucide-react';
import styles from '../../styles/components/EpisodeRow.module.css';

const EpisodeRow = ({ image, title, description, metadata, onClick }) => {
  return (
    <div className={styles.row} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={styles.headerRow}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
          <div 
            className={styles.playOverlay} 
            onClick={(e) => { e.stopPropagation(); /* Handle play */ }}
          >
            <Play size={20} fill="currentColor" className={styles.playIcon} />
          </div>
        </div>
        
        <div className={styles.titleArea}>
          <div className={styles.title}>{title}</div>
          <button 
            className={styles.actionBtn}
            onClick={(e) => { e.stopPropagation(); /* Handle more */ }}
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      <div className={styles.metadata}>{metadata}</div>
    </div>
  );
};

export default EpisodeRow;
