import React from 'react';
import styles from '../../styles/components/Pill.module.css';

const Pill = ({ label, isActive, onClick }) => {
  return (
    <button 
      className={`${styles.pill} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Pill;
