import React, { useState } from 'react';
import styles from '../../styles/components/Modal.module.css';

const NewPlaylistModal = ({ isOpen, onClose }) => {
  const [isCollaborative, setIsCollaborative] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.surface} onClick={e => e.stopPropagation()}>
        <h2 className={styles.header}>New playlist</h2>
        
        <div className={styles.formGroup}>
          <input 
            type="text" 
            placeholder="Title" 
            className={styles.inputField} 
            autoFocus
          />
          <input 
            type="text" 
            placeholder="Description" 
            className={styles.inputField} 
          />
          <select className={styles.inputField} style={{ color: 'var(--text-secondary)' }}>
            <option value="public">🌐 Public</option>
            <option value="unlisted">🔗 Unlisted</option>
            <option value="private">🔒 Private</option>
          </select>
        </div>

        <div className={styles.toggleRow}>
          <span>Collaborate</span>
          <input 
            type="checkbox" 
            className={styles.toggleSwitch} 
            checked={isCollaborative}
            onChange={(e) => setIsCollaborative(e.target.checked)}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.createBtn} onClick={onClose}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default NewPlaylistModal;
