import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/Card.module.css';

const Card = ({ image, title, subtitle, to }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <div className={styles.card} onClick={handleClick} style={to ? { cursor: 'pointer' } : {}}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.playOverlay}>
          <div className={styles.playButton}>
            <Play size={24} fill="currentColor" />
          </div>
        </div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

export default Card;
