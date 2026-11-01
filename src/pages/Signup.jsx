import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlayCircle, User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import styles from '../styles/pages/Auth.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  // Calculate password strength score (0 to 3)
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(formData.password);

  const getStrengthLabel = () => {
    if (!formData.password) return '';
    if (strength === 1) return 'Weak password';
    if (strength === 2) return 'Good password';
    return 'Strong password';
  };

  const getBarColor = (index) => {
    if (strength <= index) return 'var(--border-light)';
    if (strength === 1) return '#EA4335'; // Red
    if (strength === 2) return '#FBBC05'; // Yellow
    return '#34A853'; // Green
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <div className={styles.brandLogo} onClick={() => navigate('/')}>
            <PlayCircle size={36} className={styles.brandIcon} fill="currentColor" stroke="white" />
            <span className={styles.brandText}>Music</span>
          </div>
          <h1 className={styles.authTitle}>Create account</h1>
          <p className={styles.authSubtitle}>Stream millions of songs and podcasts ad-free</p>
        </div>

        {/* Social Authentication */}
        <div className={styles.socialButtons}>
          <button 
            type="button" 
            className={styles.googleBtn}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                navigate('/');
              }, 500);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24Z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 10.02 0 12s.45 3.84 1.24 5.42l4.04-3.15Z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
            </svg>
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerSpan}>or with email</span>
        </div>

        {/* Signup Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorText}>{error}</div>}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Full name</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <User size={18} />
              </span>
              <input 
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mohan Divekar"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email address</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <Mail size={18} />
              </span>
              <input 
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mohan@example.com"
                className={styles.input}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <Lock size={18} />
              </span>
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={styles.input}
                autoComplete="new-password"
                required
              />
              <button 
                type="button" 
                className={styles.togglePasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {formData.password && (
              <div className={styles.strengthMeter}>
                <div className={styles.strengthBars}>
                  <div className={styles.strengthBar} style={{ backgroundColor: getBarColor(0) }} />
                  <div className={styles.strengthBar} style={{ backgroundColor: getBarColor(1) }} />
                  <div className={styles.strengthBar} style={{ backgroundColor: getBarColor(2) }} />
                </div>
                <span className={styles.strengthText}>{getStrengthLabel()}</span>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="confirmPassword">Confirm password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <Lock size={18} />
              </span>
              <input 
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={styles.input}
                autoComplete="new-password"
                required
              />
            </div>
          </div>

          <label className={styles.checkboxLabel} style={{ marginTop: '4px' }}>
            <input 
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <span style={{ fontSize: '13px', lineHeight: 1.4 }}>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.authFooter}>
          Already have an account? 
          <Link to="/login" className={styles.authLink}>Sign in</Link>
        </div>
      </div>

      <Link to="/" className={styles.backHome}>
        <ArrowLeft size={16} />
        Back to YouTube Music
      </Link>
    </div>
  );
};

export default Signup;
