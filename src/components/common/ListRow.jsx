import React from 'react';
import { Play, MoreVertical, ThumbsUp, ThumbsDown, Volume2 } from 'lucide-react';
import styles from '../../styles/components/ListRow.module.css';

const ListRow = ({ index, image, title, subtitle, duration, isActive, onClick }) => {
  return (
    <div 
      className={`${styles.row} ${isActive ? styles.activeRow : ''}`}
      onClick={onClick}
    >
      {index !== undefined && !image && (
        <div className={styles.indexCol}>
          {isActive ? <Volume2 size={16} fill="currentColor" /> : index}
        </div>
      )}
      
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
          <div className={styles.playOverlay} style={{ opacity: isActive ? 1 : '' }}>
            {isActive ? (
              <Volume2 size={20} fill="currentColor" className={styles.playIcon} />
            ) : (
              <Play size={20} fill="currentColor" className={styles.playIcon} />
            )}
          </div>
        </div>
      )}
      
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      
      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <button className={styles.actionBtn} aria-label="Like">
          <ThumbsUp size={18} />
        </button>
        <button className={styles.actionBtn} aria-label="Dislike">
          <ThumbsDown size={18} />
        </button>
        <button className={styles.actionBtn} aria-label="More options">
          <MoreVertical size={18} />
        </button>
      </div>
      
      {duration && <div className={styles.duration}>{duration}</div>}
    </div>
  );
};

export default ListRow;
