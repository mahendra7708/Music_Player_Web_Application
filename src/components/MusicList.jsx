
function MusicList({
  songs = [],
  onPlay,
  favorites = [],
  onFavorite,
  onAddToPlaylist,
}) {
  if (!songs.length) {
    return <p className="empty-message">No songs found.</p>;
  }

  return (
    <div className="music-list">
      {songs.map((song) => (
        <div className="music-list-item" key={song.id}>
          <div className="music-list-info">
            {song.cover && (
              <img
                className="music-list-cover"
                src={song.cover}
                alt={song.title}
              />
            )}

            <div>
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
          </div>

          <div className="music-list-actions">
            <button
              type="button"
              className="play-btn"
              onClick={() => onPlay?.(song)}
            >
              ▶ Play
            </button>

            <button
              type="button"
              className="favorite-btn"
              onClick={() => onFavorite?.(song.id)}
            >
              {favorites.includes(song.id)
                ? "♥ Favorited"
                : "♡ Favorite"}
            </button>

            <button
              type="button"
              className="playlist-btn"
              onClick={() => onAddToPlaylist?.(song)}
            >
              + Playlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MusicList;