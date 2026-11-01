import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  Music, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  Globe, 
  Link2, 
  Lock 
} from 'lucide-react';
import styles from '../styles/pages/UploadSong.module.css';

const GENRES = [
  'Bollywood',
  'Punjabi Pop',
  'Indie & Acoustic',
  'Classical',
  'Lo-Fi & Chill',
  'Hip-Hop & Rap',
  'EDM & Dance',
  'Sufi & Devotional',
  'Rock',
  'Podcast Episode'
];

const UploadSong = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Audio file state
  const [audioFile, setAudioFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Artwork state
  const [artworkPreview, setArtworkPreview] = useState(
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop'
  );

  // Metadata form state
  const [metadata, setMetadata] = useState({
    title: '',
    artist: 'Mohan Divekar',
    album: '',
    genre: 'Bollywood',
    language: 'Hindi',
    year: '2026',
    description: '',
    visibility: 'public', // 'public' | 'unlisted' | 'private'
    allowDownloads: true,
    isExplicit: false,
    enableComments: true,
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Handle Drag & Drop for Audio
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleAudioSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleAudioSelection(e.target.files[0]);
    }
  };

  const handleAudioSelection = (file) => {
    setAudioFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      duration: '3:45', // simulated metadata
    });
    // Auto-fill song title if blank
    if (!metadata.title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setMetadata(prev => ({ ...prev, title: cleanName }));
    }
    setError('');
  };

  // Handle Artwork Selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setArtworkPreview(url);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMetadata(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!metadata.title) {
      setError('Please provide a song title.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 700);
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upload Song</h1>
        <p className={styles.subtitle}>Upload your tracks to share with listeners or add to your personal library</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Audio File Upload Zone */}
        {!audioFile ? (
          <div 
            className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept="audio/*" 
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            <div className={styles.uploadCloudIcon}>
              <UploadCloud size={30} strokeWidth={2} />
            </div>
            <div className={styles.dropTitle}>Drag and drop your audio files here</div>
            <div className={styles.dropSubtitle}>Supports MP3, WAV, FLAC, AAC (Up to 100MB)</div>
            <button type="button" className={styles.browseBtn}>Browse Files</button>
          </div>
        ) : (
          <div className={styles.audioFileCard}>
            <div className={styles.audioFileInfo}>
              <div className={styles.musicIconBox}>
                <Music size={22} />
              </div>
              <div className={styles.audioDetails}>
                <span className={styles.audioName}>{audioFile.name}</span>
                <span className={styles.audioMeta}>{audioFile.size} • Ready to upload</span>
              </div>
            </div>
            <button 
              type="button" 
              className={styles.removeFileBtn}
              onClick={() => setAudioFile(null)}
              title="Remove audio file"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {error && (
          <div style={{ color: 'var(--brand-primary)', marginBottom: '16px', fontSize: '14px', fontWeight: 500 }}>
            {error}
          </div>
        )}

        {/* Details & Metadata Section */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionHeading}>Song Details</h2>
          
          <div className={styles.twoColumnLayout}>
            {/* Artwork Upload */}
            <div className={styles.artworkBox}>
              <div 
                className={styles.artworkPreview}
                onClick={() => imageInputRef.current?.click()}
              >
                <input 
                  ref={imageInputRef}
                  type="file" 
                  accept="image/*" 
                  className={styles.fileInput}
                  onChange={handleImageChange}
                />
                {artworkPreview ? (
                  <>
                    <img src={artworkPreview} alt="Cover preview" className={styles.artworkImage} />
                    <div className={styles.changeArtworkOverlay}>Change Cover</div>
                  </>
                ) : (
                  <div className={styles.artworkPlaceholder}>
                    <ImageIcon size={32} />
                    <span>Upload Cover Art</span>
                  </div>
                )}
              </div>
              <span className={styles.artworkHint}>Recommended 1000x1000px JPG or PNG</span>
            </div>

            {/* Form Fields */}
            <div className={styles.fieldsGrid}>
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="title">
                    Song Title<span className={styles.required}>*</span>
                  </label>
                  <input 
                    id="title"
                    type="text" 
                    name="title"
                    value={metadata.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Kesariya (Acoustic)"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="artist">
                    Artist / Performer
                  </label>
                  <input 
                    id="artist"
                    type="text" 
                    name="artist"
                    value={metadata.artist}
                    onChange={handleInputChange}
                    placeholder="e.g. Mohan Divekar"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="album">
                    Album / Single
                  </label>
                  <input 
                    id="album"
                    type="text" 
                    name="album"
                    value={metadata.album}
                    onChange={handleInputChange}
                    placeholder="e.g. Acoustic Sessions 2026"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="genre">
                    Genre
                  </label>
                  <select 
                    id="genre"
                    name="genre"
                    value={metadata.genre}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    {GENRES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="language">
                    Language / Region
                  </label>
                  <input 
                    id="language"
                    type="text" 
                    name="language"
                    value={metadata.language}
                    onChange={handleInputChange}
                    placeholder="e.g. Hindi, English, Instrumental"
                    className={styles.input}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="year">
                    Release Year
                  </label>
                  <input 
                    id="year"
                    type="text" 
                    name="year"
                    value={metadata.year}
                    onChange={handleInputChange}
                    placeholder="2026"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="description">
                  Description & Lyrics
                </label>
                <textarea 
                  id="description"
                  name="description"
                  value={metadata.description}
                  onChange={handleInputChange}
                  placeholder="Add lyrics, production credits, or song notes..."
                  className={styles.textarea}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visibility & Settings Section */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionHeading}>Visibility & Permissions</h2>

          {/* Privacy Radios */}
          <div className={styles.visibilityOptions}>
            <label className={`${styles.visibilityCard} ${metadata.visibility === 'public' ? styles.visibilityActive : ''}`}>
              <input 
                type="radio" 
                name="visibility" 
                value="public"
                checked={metadata.visibility === 'public'}
                onChange={handleInputChange}
                className={styles.radioInput}
              />
              <div className={styles.visibilityDetails}>
                <span className={styles.visibilityTitle}>
                  <Globe size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
                  Public
                </span>
                <span className={styles.visibilityDesc}>Anyone can search for and listen to this track on YouTube Music</span>
              </div>
            </label>

            <label className={`${styles.visibilityCard} ${metadata.visibility === 'unlisted' ? styles.visibilityActive : ''}`}>
              <input 
                type="radio" 
                name="visibility" 
                value="unlisted"
                checked={metadata.visibility === 'unlisted'}
                onChange={handleInputChange}
                className={styles.radioInput}
              />
              <div className={styles.visibilityDetails}>
                <span className={styles.visibilityTitle}>
                  <Link2 size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
                  Unlisted
                </span>
                <span className={styles.visibilityDesc}>Anyone with the link can listen to this track</span>
              </div>
            </label>

            <label className={`${styles.visibilityCard} ${metadata.visibility === 'private' ? styles.visibilityActive : ''}`}>
              <input 
                type="radio" 
                name="visibility" 
                value="private"
                checked={metadata.visibility === 'private'}
                onChange={handleInputChange}
                className={styles.radioInput}
              />
              <div className={styles.visibilityDetails}>
                <span className={styles.visibilityTitle}>
                  <Lock size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
                  Private
                </span>
                <span className={styles.visibilityDesc}>Only you can listen to this track in your personal library</span>
              </div>
            </label>
          </div>

          {/* Toggle Switches */}
          <div className={styles.togglesList}>
            <div className={styles.toggleRow}>
              <div className={styles.toggleLabelBlock}>
                <span className={styles.toggleLabelTitle}>Allow offline downloads</span>
                <span className={styles.toggleLabelSub}>Allow listeners to save this track for offline playback</span>
              </div>
              <input 
                type="checkbox"
                name="allowDownloads"
                checked={metadata.allowDownloads}
                onChange={handleInputChange}
                className={styles.toggleSwitch}
              />
            </div>

            <div className={styles.toggleRow}>
              <div className={styles.toggleLabelBlock}>
                <span className={styles.toggleLabelTitle}>Explicit content</span>
                <span className={styles.toggleLabelSub}>Track contains explicit language or themes</span>
              </div>
              <input 
                type="checkbox"
                name="isExplicit"
                checked={metadata.isExplicit}
                onChange={handleInputChange}
                className={styles.toggleSwitch}
              />
            </div>

            <div className={styles.toggleRow}>
              <div className={styles.toggleLabelBlock}>
                <span className={styles.toggleLabelTitle}>Enable comments</span>
                <span className={styles.toggleLabelSub}>Allow listeners to leave comments and feedback</span>
              </div>
              <input 
                type="checkbox"
                name="enableComments"
                checked={metadata.enableComments}
                onChange={handleInputChange}
                className={styles.toggleSwitch}
              />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className={styles.actionBar}>
          <button 
            type="button" 
            className={styles.cancelBtn}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className={styles.draftBtn}
            onClick={() => {
              alert('Draft saved to your library!');
              navigate('/library');
            }}
          >
            Save Draft
          </button>
          <button 
            type="submit" 
            className={styles.publishBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Song'}
          </button>
        </div>
      </form>

      {/* Success Confirmation Modal */}
      {isSuccessModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.successModal}>
            <div className={styles.successIconBadge}>
              <CheckCircle2 size={36} />
            </div>
            <h2 className={styles.successTitle}>Song Published!</h2>
            <p className={styles.successSubtitle}>
              Your song has been successfully uploaded and is now available in your music library.
            </p>

            <div className={styles.publishedCard}>
              <img src={artworkPreview} alt="Published Cover" className={styles.publishedCover} />
              <div className={styles.publishedMeta}>
                <span className={styles.publishedTrackTitle}>{metadata.title || 'Untitled Track'}</span>
                <span className={styles.publishedArtist}>{metadata.artist} • {metadata.genre}</span>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button 
                type="button"
                className={styles.modalSecondaryBtn}
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  setAudioFile(null);
                  setMetadata(prev => ({ ...prev, title: '' }));
                }}
              >
                Upload Another
              </button>
              <button 
                type="button"
                className={styles.modalPrimaryBtn}
                onClick={() => navigate('/library')}
              >
                Go to Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadSong;
