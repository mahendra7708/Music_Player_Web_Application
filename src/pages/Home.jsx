import MusicList from "../components/MusicList";
import "../App.css";

function Home({
  songs = [],
  onPlay,
  currentSong,
  favorites = [],
  onFavorite,
  onAddToPlaylist,
  loggedIn,
}) {
  const displayedSongs = currentSong
    ? [
        currentSong,
        ...songs.filter((song) => song.id !== currentSong.id),
      ]
    : songs;

  return (
    <div className="page-content">
      <section className="welcome-banner">
        <p className="home-label">WELCOME TO TUNEWAVE</p>
        <h1>Music for every mood.</h1>
        <p>Your music, your world.</p>
      </section>

      {currentSong && (
        <section className="now-playing-card">
          <img src={currentSong.cover} alt={currentSong.title} />

          <div>
            <span>NOW PLAYING</span>
            <h2>{currentSong.title}</h2>
            <p>{currentSong.artist}</p>
          </div>

          <button onClick={() => onPlay?.(currentSong)}>
            ▶ Play
          </button>
        </section>
      )}

      <section className="home-section">
        <h2>Featured Albums</h2>

        <div className="album-grid">
          {displayedSongs.map((song) => (
            <div className="album-card" key={song.id}>
              <div className="cover-container">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="album-cover"
                />

                <button
                  className="cover-play"
                  onClick={() => onPlay?.(song)}
                  aria-label={`Play ${song.title}`}
                >
                  ▶
                </button>
              </div>

              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section" id="all-songs">
        <h2>All Songs</h2>

        <MusicList
          songs={displayedSongs}
          onPlay={onPlay}
          favorites={favorites}
          onFavorite={onFavorite}
          onAddToPlaylist={onAddToPlaylist}
        />
      </section>
    </div>
  );
}

export default Home;
