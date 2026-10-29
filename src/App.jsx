import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";

import songsData from "./data/songs.js";

import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Library from "./pages/Library.jsx";
import Playlist from "./pages/Playlist.jsx";
import Favorites from "./pages/Favorites.jsx";
import Profile from "./pages/Profile.jsx";

import Navbar from "./components/Navbar.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import AddToPlaylistModal from "./components/AddToPlaylistModal.jsx";

import "./App.css";

// Protect pages that require login
function ProtectedRoute({ loggedIn }) {
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

function AppLayout({ loggedIn, onLogout }) {
  const navigate = useNavigate();

  const [currentSong, setCurrentSong] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlistMessage, setPlaylistMessage] = useState("");

  const [playlists, setPlaylists] = useState([
    { id: "my-favorites-mix", name: "My Favorite Mix", songIds: [] },
    { id: "chill-vibes", name: "Chill Vibes", songIds: [] },
  ]);

  const songs = Array.isArray(songsData) ? songsData : [];

  const currentIndex = songs.findIndex(
    (song) => song.id === currentSong?.id
  );

  // Play a song only when logged in
  function handlePlay(song) {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    setCurrentSong(song);
  }

  function playNext() {
    if (!loggedIn || !songs.length) return;

    const nextIndex =
      currentIndex < 0 ? 0 : (currentIndex + 1) % songs.length;

    setCurrentSong(songs[nextIndex]);
  }

  function playPrevious() {
    if (!loggedIn || !songs.length) return;

    const previousIndex =
      currentIndex < 0
        ? 0
        : (currentIndex - 1 + songs.length) % songs.length;

    setCurrentSong(songs[previousIndex]);
  }

  function toggleFavorite(songId) {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const wasFavorite = favorites.includes(songId);

    setFavorites((previous) =>
      wasFavorite
        ? previous.filter((id) => id !== songId)
        : [...previous, songId]
    );

    setPlaylistMessage(
      wasFavorite
        ? "Song removed from Favorites."
        : "Song added to Favorites."
    );
  }

  function removeFavorite(songId) {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    setFavorites((previous) =>
      previous.filter((id) => id !== songId)
    );

    setPlaylistMessage("Song removed from Favorites.");
  }

  function openPlaylistPopup(song) {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    if (!song || song.id === undefined) return;

    setPlaylistMessage("");
    setSelectedSong(song);
  }

  function addSongToPlaylist(playlistId, song) {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    if (!song) return;

    const target = playlists.find(
      (playlist) => playlist.id === playlistId
    );

    if (!target) {
      setPlaylistMessage("Please select a valid playlist.");
      return;
    }

    if (target.songIds.includes(song.id)) {
      setPlaylistMessage(
        `"${song.title}" is already in "${target.name}".`
      );
      return;
    }

    setPlaylists((previous) =>
      previous.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              songIds: [...playlist.songIds, song.id],
            }
          : playlist
      )
    );

    setPlaylistMessage(
      `Added "${song.title}" to "${target.name}".`
    );

    setSelectedSong(null);
  }

  function createPlaylist(name, song) {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const cleanName = name.trim();

    if (!cleanName || !song) {
      setPlaylistMessage("Please enter a playlist name.");
      return;
    }

    const existing = playlists.find(
      (playlist) =>
        playlist.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (existing) {
      addSongToPlaylist(existing.id, song);
      return;
    }

    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name: cleanName,
      songIds: [song.id],
    };

    setPlaylists((previous) => [...previous, newPlaylist]);

    setPlaylistMessage(
      `Created "${cleanName}" and added "${song.title}".`
    );

    setSelectedSong(null);
  }

  function removeSongFromPlaylist(playlistId, songId) {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    setPlaylists((previous) =>
      previous.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              songIds: playlist.songIds.filter(
                (id) => id !== songId
              ),
            }
          : playlist
      )
    );

    setPlaylistMessage("Song removed from playlist.");
  }

  const pageProps = {
    songs,
    currentSong,
    onPlay: handlePlay,
    favorites,
    onFavorite: toggleFavorite,
    onRemoveFavorite: removeFavorite,
    playlists,
    onAddToPlaylist: openPlaylistPopup,
    onRemoveFromPlaylist: removeSongFromPlaylist,
  };

  return (
    <div className="app-layout">
      <Navbar loggedIn={loggedIn} onLogout={onLogout} />

      <Routes>
        {/* Home is accessible even after logout */}
        <Route
          path="/home"
          element={<Home {...pageProps} loggedIn={loggedIn} />}
        />

        {/* Login is required for these pages */}
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path="/search" element={<Search {...pageProps} />} />
          <Route path="/library" element={<Library {...pageProps} />} />
          <Route path="/playlist" element={<Playlist {...pageProps} />} />
          <Route path="/favorites" element={<Favorites {...pageProps} />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />
      </Routes>

      {loggedIn && (
        <MusicPlayer
          currentSong={currentSong}
          onNext={playNext}
          onPrevious={playPrevious}
        />
      )}

      {loggedIn && selectedSong && (
        <AddToPlaylistModal
          song={selectedSong}
          playlists={playlists}
          onAdd={addSongToPlaylist}
          onCreate={createPlaylist}
          onClose={() => setSelectedSong(null)}
        />
      )}

      {playlistMessage && loggedIn && (
        <div className="playlist-toast" role="status">
          <span>{playlistMessage}</span>
          <button
            type="button"
            onClick={() => setPlaylistMessage("")}
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("tunewaveLoggedIn") === "true"
  );

  function handleLogin() {
    localStorage.setItem("tunewaveLoggedIn", "true");
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("tunewaveLoggedIn");
    setLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />

        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Signup />
            )
          }
        />

        <Route
          path="/*"
          element={
            <AppLayout
              loggedIn={loggedIn}
              onLogout={handleLogout}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
