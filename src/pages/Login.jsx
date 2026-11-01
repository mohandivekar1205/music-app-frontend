import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PlayCircle, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import styles from '../styles/pages/Auth.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  const handleDemoFill = () => {
    setFormData({
      email: 'mohan@example.com',
      password: 'password123',
      rememberMe: true,
    });
    setError('');
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 500);
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
          <h1 className={styles.authTitle}>Sign in</h1>
          <p className={styles.authSubtitle}>to continue to YouTube Music</p>
        </div>

        {/* Social Authentication */}
        <div className={styles.socialButtons}>
          <button 
            type="button" 
            className={styles.googleBtn}
            onClick={handleGoogleLogin}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24Z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 10.02 0 12s.45 3.84 1.24 5.42l4.04-3.15Z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerSpan}>or with email</span>
        </div>

        {/* Login Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorText}>{error}</div>}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email or username</label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <Mail size={18} />
              </span>
              <input 
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`${styles.input} ${error ? styles.inputError : ''}`}
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
                placeholder="Enter your password"
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                autoComplete="current-password"
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
          </div>

          <div className={styles.optionsRow}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className={styles.forgotLink} onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered email.'); }}>
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className={styles.demoBox}>
          <span>Demo Account: <strong>mohan@example.com</strong></span>
          <button type="button" className={styles.demoBtn} onClick={handleDemoFill}>
            Auto Fill
          </button>
        </div>

        {/* Footer */}
        <div className={styles.authFooter}>
          Don't have an account? 
          <Link to="/signup" className={styles.authLink}>Sign up</Link>
        </div>
      </div>

      <Link to="/" className={styles.backHome}>
        <ArrowLeft size={16} />
        Back to YouTube Music
      </Link>
    </div>
  );
};

export default Login;
