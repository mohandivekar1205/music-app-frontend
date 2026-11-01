# React (Web) Code Standards — Agent Instructions

Follow these rules whenever writing, editing, or reviewing code in this React web project (Redux, React Router, component-heavy UI with lists/tables). Apply them by default, not only when asked.

---

## 1. Code Quality

- **No dead code.** Never leave unused variables, commented-out blocks, or leftover debug variables in committed code. Remove them as part of any edit that touches the surrounding function.
- **No placeholder file/component names.** Never name a file or component `temp`, `test`, `new`, `copy`, etc. Use a descriptive name matching the existing convention (`XPage.jsx`, `XForm.jsx`, `xService.js`).
- **Optional chaining on all API-derived data, consistently.** Any value from an API response must use `?.` at every level that could be null/undefined. Do not mix `user.profile.name` and `user.profile?.name` for the same data shape across files.
- **No duplicated business logic.** If the same mapping/logic (status-to-color, formatting, validation rules) is needed in more than one place, extract it into `utils/` or `helpers/` and import it everywhere it's used. Search for an existing utility before writing a new one with the same shape.
- **Remove `console.log` before finishing a task**, or gate it behind an environment check (`if (process.env.NODE_ENV !== 'production')`). Never leave bare `console.log` calls that run on every render in code presented as complete.
- **Keep list/row/card renderers as named, memoized components**, not inline arrow functions defined per-render inside a parent component, when rendered inside `.map()` over more than a handful of items.
- **Use stable, unique `key` props on all mapped/rendered lists.** Never use array index as a key when the list can reorder, filter, or have items inserted/removed; never use `Math.random()` as a key.
- **Prefer TypeScript (or PropTypes if the project is plain JS) for component props and API response shapes**, so a typo in a field name is caught at build time rather than failing silently at runtime.

## 2. Memory Efficiency

- **Wrap list/row components in `React.memo`**, and wrap their event handlers in `useCallback`, for any list rendering more than a handful of items or containing images/complex children.
- **Wrap derived arrays/objects in `useMemo`** when computed from Redux state or props on every render (filtering, sorting, combining multiple state slices).
- **Narrow Redux/Context selectors.** Never subscribe to an entire slice or entire context value when only specific fields are used. Select each field independently (or use a memoized selector via `reselect`/`createSelector`) so unrelated state updates don't trigger re-renders.
- **Virtualize long lists and tables.** Any list/table expected to render more than roughly 50–100 rows should use a virtualization library (e.g. `react-window`, `react-virtualized`, or the data-grid's built-in virtualization) instead of rendering every row into the DOM at once.
- **Paginate, don't bulk-fetch.** Any new list-fetching action should support page-based or cursor-based fetching from the API, rather than fetching an entire table in one call, unless the data set is known to be small and bounded.
- **Clean up every subscription, event listener, interval, or timeout** registered in `useEffect` with a returned cleanup function (`removeEventListener`, `clearInterval`, unsubscribing from a socket/observable). Never register a listener without a matching cleanup.
- **Avoid recreating inline style objects, inline arrow functions, and inline array/object literals inside deeply nested or frequently re-rendered JSX** where they can be hoisted to a stable reference, memoized, or extracted to CSS (see Section 6).
- **Debounce or throttle expensive handlers** (scroll, resize, input-driven search/filter) instead of running the full handler on every event firing.

## 3. User Experience

- **Every component with async data must handle four states distinctly: loading, error, empty, and populated.** Never let a failed fetch silently render the same UI as a genuinely empty list.
- **Use a shared loading component/skeleton** (not ad hoc spinners duplicated per page) so loading UI is visually consistent across the app.
- **Add a refresh or retry action to any view showing data that can change server-side or from other users**, not just an initial fetch on mount with no way to manually refresh.
- **Give immediate visual feedback on every interactive element** (hover/focus/active states, disabled state during async actions) and disable/guard buttons that trigger async work to prevent duplicate submissions from repeated clicks.
- **Debounce any input that triggers filtering, search, or API calls** (~300ms), never fire a request per keystroke.
- **Keep route transitions and modal/drawer animations consistent per interaction type** (e.g. all modals use the same enter/exit animation, all route changes use the same transition), rather than leaving default/unset behavior mixed with explicit custom transitions across different pages.
- **Preserve scroll position and form state where a user would expect it** (e.g. navigating back from a detail page to a list shouldn't reset scroll or filters the user had set), rather than always resetting to a default state on remount.

## 4. UI Consistency

- **Never hardcode colors, spacing, or font sizes inline.** Always use the shared design tokens (theme file, CSS custom properties, or design-system constants). If a needed value doesn't exist yet, add it to the shared theme first, then reference it — do not inline a one-off hex code or pixel value in a component file.
- **Reuse existing shared components before creating new ones.** Before writing a new card, badge, modal, table, or form input, check the shared `components/` directory for something that already does this job. Extract a shared component if the same visual pattern appears in two or more places instead of letting each page re-implement its own version.
- **Keep status/badge/label color logic in one place.** All status-to-color or category-to-style mappings must resolve through a single shared utility, so the same status never renders with different colors on different pages.
- **Match layout and spacing conventions already established in sibling pages.** New pages following an existing pattern (list + filters + action button, detail + edit form, etc.) should reuse the same structural components and class names, rather than introducing a new layout pattern for the same kind of page.
- **Keep icon usage consistent** — same icon library, same sizing conventions for the same context (inline/detail icons vs. header/action icons) across the app.
- **Truncate long text consistently** using the same approach (CSS `text-overflow: ellipsis` with a defined max-width, or a shared `TruncatedText` component) rather than mixing manual string slicing and CSS truncation across sibling components for the same kind of field.
- **Keep empty-state, loading-state, and error-state visuals structurally identical across pages** (same icon/text hierarchy, same container styling), varying only the message text.

## 5. Error Handling

- **Every async call (API request, dispatch, route-guard side-effect) must be wrapped so failures are caught, not left to fail silently or crash the page.** Use try/catch around direct async calls, and ensure Redux thunks/services set an `error` field in state on failure rather than only toggling `loading` back to `false`.
- **Never swallow an error without surfacing it somewhere.** A `catch` block that only does `console.error` and nothing else is incomplete — it must also update UI state (`error` in Redux/local state) so the component can render an error state, or show a toast/notification for transient/action-triggered errors (e.g. failed form submit).
- **Distinguish error types where it affects what the user should do:** network/connectivity errors ("check your connection, try again") versus server/validation errors (show the specific message returned by the API) versus unexpected/unknown errors (generic fallback message, never a raw stack trace or technical error string shown to the user).
- **Guard against malformed API responses defensively** — check array/object shape before mapping or destructuring, rather than assuming the API always returns the expected structure.
- **Wrap top-level route/page components in an Error Boundary**, so a rendering error in one part of the tree doesn't take down the entire application with a blank white screen.
- **Provide a retry path for recoverable errors.** Any view with an error state should give the user a way to retry the failed action rather than requiring a full page reload.
- **Never let one failed section break an entire page.** If a page shows multiple independent data sources (e.g. a dashboard with several widgets), a failure in one widget's data must not prevent the other widgets from rendering correctly — isolate error state per data source, not globally per page.
- **Validate user input client-side before firing a network request**, and show inline validation errors near the relevant field rather than only a generic top-level or toast error after the request fails server-side.
- **Log errors with enough context to debug later** (which action failed, relevant IDs, not just the raw error object), and consider wiring a production error-tracking service (e.g. Sentry) rather than relying on `console.error` alone in production.

## 6. Project Structure Conventions (Thunks, Styles)

- **AsyncThunk functions (or equivalent async action creators) must live in a dedicated `redux/thunks/` folder, never inline inside a slice/reducer file.** Each domain gets its own thunk file (e.g. `redux/thunks/userThunks.js`, `redux/thunks/orderThunks.js`). The corresponding slice file contains only `createSlice` — state shape, sync reducers, and `extraReducers` wiring to the imported thunk's pending/fulfilled/rejected actions. It must never contain a `createAsyncThunk(...)` definition itself.
  - Example split:
    ```js
    // redux/thunks/userThunks.js
    import { createAsyncThunk } from '@reduxjs/toolkit';
    import api from '../../api';

    export const fetchUserList = createAsyncThunk(
      'users/fetchUserList',
      async (_, { rejectWithValue }) => {
        try {
          const response = await api.get('/users');
          return response.data;
        } catch (err) {
          return rejectWithValue(err.response?.data || err.message);
        }
      }
    );

    // redux/slices/userSlice.js
    import { createSlice } from '@reduxjs/toolkit';
    import { fetchUserList } from '../thunks/userThunks';

    const userSlice = createSlice({
      name: 'users',
      initialState: { list: [], loading: false, error: null },
      extraReducers: (builder) => {
        builder
          .addCase(fetchUserList.pending, (state) => { state.loading = true; state.error = null; })
          .addCase(fetchUserList.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
          .addCase(fetchUserList.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
      },
    });

    export default userSlice.reducer;
    ```
- **Component styles must live in a dedicated `styles/` folder (or co-located CSS Modules / styled-components file, whichever this project already uses — do not mix approaches), never as large blocks of inline `style={{...}}` objects inside a component file.** Mirror the source folder structure: `styles/pages/UserList.module.css` (or `.styles.js` for styled-components) for `pages/users/UserList.jsx`, `styles/components/Header.module.css` for `components/Header.jsx`.
  - CSS Modules example:
    ```css
    /* styles/pages/UserList.module.css */
    .container { display: flex; flex-direction: column; }
    .card { padding: 16px; border-radius: 8px; }
    ```
    ```jsx
    // pages/users/UserList.jsx
    import styles from '../../styles/pages/UserList.module.css';
    // usage: <div className={styles.container}>
    ```
  - styled-components example:
    ```js
    // styles/pages/UserList.styles.js
    import styled from 'styled-components';
    export const Container = styled.div`
      display: flex;
      flex-direction: column;
    `;
    ```
  - Shared/reused style patterns (card shells, badges, section headers) that appear across multiple pages must be extracted further into a shared styles file or shared component (see Section 4) rather than duplicated per page.
- **When creating a brand-new page or slice, create the companion styles file (and thunk file, if it needs async data) at the same time as the main file**, rather than starting inline and refactoring later.
- **When migrating an existing file to this structure, preserve existing public export/action names and CSS class names** so no other file's imports or class references need to change beyond the import path itself.
- **Apply this structure to every new page/slice created going forward**, and apply it to an existing file whenever that file is being substantively edited for another reason — do not perform a repo-wide refactor unprompted, but leave touched files in the correct structure rather than adding more inline styles or thunks to an already-mixed file.

## 7. Lazy Loading

- **Paginate list-fetching actions instead of bulk-fetching entire tables.** Any thunk/service that fetches a list must support page-based or cursor-based fetching, with the corresponding list/table wired to fetch more on scroll or on explicit "load more" / page-change interaction, rather than fetching the full data set in one call on mount. Required once a list can plausibly exceed ~50 records.
- **Never trigger a full re-fetch on every component mount if data is still fresh.** Add a staleness check (e.g. timestamp in Redux state) before dispatching a fetch in `useEffect` on mount, so navigating back to a page doesn't always re-request unchanged data.
- **Code-split routes with `React.lazy` + `Suspense`.** Every top-level route component should be dynamically imported (`const UserList = lazy(() => import('./pages/users/UserList'))`) rather than statically imported at the top of the router file, so the initial bundle only includes what's needed for the first route the user visits.
  ```jsx
  const UserList = React.lazy(() => import('./pages/users/UserList'));

  <Suspense fallback={<LoadingState />}>
    <Route path="/users" element={<UserList />} />
  </Suspense>
  ```
- **Lazy-load heavy in-page components**, not just routes. Any component that is expensive to render and not immediately visible (large charts, rich text editors, modals not yet opened, secondary tab content) should be deferred with `React.lazy` + `Suspense` instead of rendering unconditionally on mount.
- **Lazy-load below-the-fold images** using the native `loading="lazy"` attribute or an intersection-observer-based image component, rather than loading every image on the page immediately regardless of viewport visibility.
- **Do not lazy-load data or components needed immediately on first paint** (the current route's own primary content, the logged-in user's header info) — lazy loading applies to what is off-screen, not-yet-visited, or conditionally shown, never to what the user sees first.

## 8. Safe Editing and Reversibility

- **Never delete a file or folder as part of a restructure (moving thunks/styles, renaming, refactoring) without first confirming the new location works.** Move/copy first, verify the app still builds and the affected page still renders correctly, then remove the old file — never delete-then-recreate in the same step.
- **Before editing any shared/high-impact file** (root `App.jsx`, router configuration, Redux store setup, global theme/design-token file, shared Context providers, or any file more than one other file depends on), **keep a reference copy of the pre-edit version** so the exact prior state can be restored if the change causes a regression. This can be a `.bak` copy alongside the file during the session, a dedicated `_reference/` folder excluded from the build, or a committed state in version control immediately before the edit — pick whichever the project already uses, but do not proceed on a shared file without one.
- **Prefer additive changes over destructive ones when the outcome is uncertain.** When restructuring (splitting a slice into `slice` + `thunk` files, or a component into `component` + `styles` files), keep the original file's exports/behavior identical from the consuming file's point of view, so if the new structure needs to be reverted, only the internal file(s) need to change back — no consuming file's imports should need to change during a revert.
- **State plainly what was moved, renamed, or deleted, and where the previous version can still be found**, whenever a change involves relocating or removing a file, so the person driving the task always has a clear path back to the prior state without needing to reconstruct it from memory or git history alone.
- **When reverting a previously applied fix, re-check the whole chain the fix touched** (not just the one line reported broken) — fixes that depend on multiple files staying in sync (routing + context providers + store wiring) can produce a new, different error if only one file is reverted while the others remain updated.
- **Never overwrite a file wholesale when a targeted edit (single function, single style rule, single import) is sufficient.** Wholesale rewrites make it harder to see what actually changed and harder to revert precisely, compared to a small diff against the reference copy.
- **If a change is experimental or its impact is uncertain, say so explicitly and suggest testing before removing the old approach**, rather than presenting a risky structural change with the same confidence as a routine one.

## 9. When Editing Existing Files

- Before adding a new utility, log statement, or style, **check whether an equivalent already exists elsewhere in the file or a sibling component**, and reuse it instead of duplicating.
- When fixing a bug, **check whether the same pattern exists in sibling components/pages** and flag or fix both rather than only the one reported.
- When a fix depends on app-level wiring (e.g. router configuration, Context providers, global store setup), **verify the supporting file is actually in its expected state** before assuming the fix is complete — do not assume prior wiring survived unrelated edits.

## 10. Response Format for This Project

- When explaining a fix or addition, **state why the practice applies to this specific code**, not just what the general best practice is — reference the actual variable, file, or pattern involved.
- Do not silently reformat or "clean up" unrelated code in the same file beyond the scope of the requested change; call out separately if unrelated issues are noticed.
