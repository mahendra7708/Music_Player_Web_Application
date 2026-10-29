
import MusicList from "../components/MusicList.jsx";

function Favorites({
  songs = [],
  favorites = [],
  onFavorite,
  onPlay,
  onAddToPlaylist,
}) {
  const favoriteSongs = songs.filter((song) =>
    favorites.includes(song.id)
  );

  return (
    <main className="page-container">
      <h1>My Favorites</h1>

      {favoriteSongs.length === 0 ? (
        <p>No favorite songs yet.</p>
      ) : (
        <div className="favorite-list">
          {favoriteSongs.map((song) => (
            <div className="favorite-item" key={song.id}>
              <div>
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>

              <div className="favorite-actions">
                <button
                  type="button"
                  onClick={() => onPlay?.(song)}
                >
                  ▶ Play
                </button>

                <button
                  type="button"
                  onClick={() => onFavorite?.(song.id)}
                >
                  Remove ♥
                </button>

                <button
                  type="button"
                  onClick={() => onAddToPlaylist?.(song)}
                >
                  + Playlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites;
