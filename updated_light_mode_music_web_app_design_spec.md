# Music Web Application — Light Mode Design & UI/UX Specification (Updated)

> **Target Audience for this document:** AI Coding Agents, Frontend Engineers, and UI/UX Developers.  
> **Purpose:** Comprehensive, production-ready design specification to implement a full-featured music streaming web application in **Light Mode**, derived and adapted from all provided reference screens.

---

## 1. Executive Summary & Light Mode Transformation

The application layout follows a 3-zone desktop shell:
1. **Top Navigation Bar:** Persistent global search, brand identity, casting/device connect, and user profile.
2. **Left Sidebar:** Primary app navigation (Home, Explore, Library), "New playlist" action, and scrollable personal library playlists. Supports an expanded and collapsed (rail) state.
3. **Main Content Viewport:** Dynamic router area supporting multiple page archetypes (Home Feed, Now Playing, Playlist, Album, Podcast, Explore, Search Results, Library, and Modals).
4. **Persistent Bottom Player Bar:** Global audio control bar pinned to the bottom of the viewport with track metadata, progress scrubber, playback controls, and actions.

### Light Mode Transformation Philosophy
- **Surfaces & Backgrounds:** Layered, soft, neutral light surfaces (`#FFFFFF` base, `#F8F9FA` sidebar/bar background, `#F1F3F4` hover/cards).
- **Typography & Icons:** High contrast primary text (`#1A1A1A` / `#202124`), secondary metadata text (`#5F6368`), subtle muted text (`#80868B`).
- **Brand Accent:** Retain the signature Red accent (`#FF0000` / `#E50914`) for active progress, play states, and primary highlights.
- **Elevation & Dividers:** Subtle borders (`#E0E0E0` / `#E8EAED`) and soft drop shadows (`0 2px 8px rgba(0,0,0,0.06)`) instead of dark surface elevation. Menus and Modals use deeper shadows (`0 8px 24px rgba(0,0,0,0.12)`).

---

## 2. Design System & Design Tokens (Light Theme)

### 2.1 Color Palette

```css
:root {
  /* Surface & Backgrounds */
  --bg-primary: #FFFFFF;              /* Main viewport background */
  --bg-secondary: #F8F9FA;            /* Sidebar, top nav bar, bottom player bar */
  --bg-tertiary: #F1F3F4;             /* Inactive filter pills, cards, table hover */
  --bg-elevated: #FFFFFF;             /* Dropdowns, floating menus, modals */
  --bg-overlay: rgba(0, 0, 0, 0.5);   /* Dimmer for modals/dialogs */

  /* Text & Content */
  --text-primary: #1A1A1A;            /* Headings, primary song titles, active items */
  --text-secondary: #5F6368;          /* Artist names, view counts, duration, subheaders */
  --text-tertiary: #80868B;           /* Inactive hints, timestamps, placeholders */
  --text-inverse: #FFFFFF;            /* Text inside dark buttons or red pills */

  /* Primary Brand & Accents */
  --brand-primary: #FF0000;           /* YouTube Red / Primary Accent */
  --accent-blue: #1A73E8;             /* Links, focus rings, active toggles */
  
  /* Interactive & Component States */
  --pill-bg-inactive: #F1F3F4;
  --pill-text-inactive: #3C4043;
  --pill-bg-active: #202124;          /* Inverted dark pill for active filter */
  --pill-text-active: #FFFFFF;
  --pill-hover: #E8EAED;

  /* Borders & Dividers */
  --border-light: #E8EAED;
  --border-medium: #DADCE0;
  --border-input: #1A1A1A;            /* Bottom border for text inputs */

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12); /* Menus, dropdowns */
  --shadow-player: 0 -2px 10px rgba(0, 0, 0, 0.05);
}
```

### 2.2 Component Dimensions & Spacing
- **Top Navigation Height:** `64px`
- **Left Sidebar Width:** `240px` (Expanded) / `72px` (Collapsed/Rail Mode)
- **Bottom Player Height:** `72px`
- **Modal Max-Width:** `480px` (Standard dialogs)

---

## 3. Global Shell & Layout Structure

### 3.1 Left Navigation Sidebar (Expanded & Collapsed States)
- **Expanded State (`240px` width):** Full text labels, wide "New playlist" pill, scrollable list of user playlists.
- **Collapsed Rail State (`72px` width):** 
  - Hamburger menu toggles this state.
  - Links ("Home", "Explore", "Library") stack vertically: Icon on top, `10px` text label below.
  - Sub-menus and playlist list are hidden.

---

## 4. Detailed Screen Specifications (Light Mode)

### Screen 1: Search Experience & Active Inputs
1. **Search Input Dropdown (Search History):**
   - Floating absolute container (`width: 480px`, `background: var(--bg-elevated)`, `border-radius: 8px`, `box-shadow: var(--shadow-lg)`).
   - List Items: `Height: 40px`, padding `0 16px`. Hover state: `--bg-tertiary`.
   - Content: Left History Icon (`↺`) + Search Term (`"jogi"`, `--text-primary`) + Right Delete Icon (`🗑`, visible on hover).
2. **Search Results Page (`/search?q=...`):**
   - **Global Tabs:** `YT MUSIC` (Active, underlined) | `LIBRARY`.
   - **Filter Pills:** `Songs`, `Artists`, `Videos`, `Episodes`, `Albums`, `Community playlists`, etc.
   - **Top Result Card:** Large hero card (`border: 1px solid --border-medium`, `border-radius: 8px`). Contains large thumbnail, Title, Subtitle, and prominent `[▶ Play]` and `[+ Save]` buttons.
   - **List Results:** Standard table rows featuring `48x48px` circular avatars (for artists) or square covers (for songs/videos).

### Screen 2: User Library View (`/library`)
1. **Library Header:**
   - Tabs: `LIBRARY` | `DOWNLOADS`.
   - Filter Chips: `Playlists`, `Podcasts`, `Songs`, `Albums`, `Artists`, `Profiles`.
   - Sort Dropdown: `"Recent activity ⌄"` (Right-aligned).
2. **Library Grid:**
   - Multi-column grid of square cards.
   - Distinctive "Liked Music" and "New Episodes" cards with custom gradient/solid color backgrounds and vector icons.
   - Metadata: Card Title (`14px`, bold), Subtitle (`12px`, type + creator/song count).

### Screen 3: User Account Menu (Dropdown)
1. **Menu Container:**
   - Positioned below user avatar (`width: ~280px`, `background: var(--bg-elevated)`, `box-shadow: var(--shadow-lg)`, `border-radius: 8px`, `padding: 8px 0`).
2. **Header Area:**
   - User Avatar + Name (`"Mohan Divekar"`) + Handle (`"@mohandivekar125"`).
   - "Manage your Google Account" (Link, `--accent-blue`).
   - Divider line (`1px solid --border-light`).
3. **Menu Items:**
   - Left Icon + Text label (`Your channel`, `Paid memberships`, `Switch account`, `Sign out`, etc.).
   - Standard item height (`40px`), hover state (`--bg-tertiary`).

### Screen 4: "New Playlist" Modal Dialog
1. **Dialog Overlay:** Fixed full-screen backdrop (`background: var(--bg-overlay)`, `z-index: 2000`).
2. **Dialog Surface:**
   - Centered container (`width: 480px`, `background: var(--bg-elevated)`, `border-radius: 8px`, `padding: 24px`).
   - Header: `"New playlist"` (`20px`, bold).
3. **Form Elements:**
   - **Inputs (Title & Description):** Standard Material-style floating label inputs. Light mode style: transparent background, `border-bottom: 1px solid var(--border-medium)`. Focus state: `border-bottom: 2px solid var(--text-primary)`.
   - **Privacy Dropdown:** Triggers a sub-menu (`Public - Anyone can search`, `Unlisted - Anyone with link`, `Private - Only you`).
   - **Collaborate Toggle:** Text label `"Collaborate"` + Toggle Switch (Inactive: grey track, white thumb. Active: Blue/Black track, right-aligned thumb).
4. **Action Buttons:**
   - Bottom right alignment.
   - `Cancel` (Ghost button, `--text-primary`).
   - `Create` (Pill button, `background: var(--text-primary)`, `color: var(--bg-primary)`).

### Screen 5: Extended Profile View (Video Shelf)
1. **Videos Category:**
   - Found on Artist/User profiles (e.g., "Mihika Sansare").
   - Horizontal scrollable list of Video Cards.
   - Video Card: `16:9` ratio thumbnail (`border-radius: 8px`), play icon overlay, 2-line title, and standard view count metadata.

---

## 5. CSS Components & Modals (Light Mode Implementation)

```css
/* Sidebar Rail Mode (Collapsed) */
.sidebar.rail-mode {
  width: 72px;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebar.rail-mode .nav-item {
  flex-direction: column;
  justify-content: center;
  height: 64px;
  font-size: 10px;
  padding: 0;
  margin-bottom: 8px;
  width: 100%;
}
.sidebar.rail-mode .nav-item svg {
  margin-bottom: 4px;
  margin-right: 0;
}

/* Modals & Dialogs */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: var(--bg-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-surface {
  background-color: var(--bg-elevated);
  width: 480px;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Material Input Fields */
.input-field {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-medium);
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-primary);
  transition: border-bottom-color 0.2s;
}
.input-field:focus {
  outline: none;
  border-bottom: 2px solid var(--text-primary);
}

/* Toggle Switch */
.toggle-switch {
  appearance: none;
  width: 36px;
  height: 20px;
  background-color: var(--text-tertiary);
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  outline: none;
}
.toggle-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background-color: #FFFFFF;
  border-radius: 50%;
  transition: transform 0.2s ease;
}
.toggle-switch:checked {
  background-color: var(--accent-blue);
}
.toggle-switch:checked::after {
  transform: translateX(16px);
}
```
