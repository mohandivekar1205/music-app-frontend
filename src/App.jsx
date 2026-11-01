import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Library = lazy(() => import('./pages/Library'));
const History = lazy(() => import('./pages/History'));
const Search = lazy(() => import('./pages/Search'));
const Playlist = lazy(() => import('./pages/Playlist'));
const Album = lazy(() => import('./pages/Album'));
const Podcast = lazy(() => import('./pages/Podcast'));
const Episode = lazy(() => import('./pages/Episode'));
const Artist = lazy(() => import('./pages/Artist'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const UploadSong = lazy(() => import('./pages/UploadSong'));

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<div style={{ padding: '24px' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/library" element={<Library />} />
            <Route path="/history" element={<History />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/upload" element={<UploadSong />} />
            <Route path="/upload-song" element={<UploadSong />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/podcast/:id" element={<Podcast />} />
            <Route path="/episode/:id" element={<Episode />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
