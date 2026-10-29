
import MusicList from "../components/MusicList.jsx";

function Playlist({
  songs = [],
  playlists = [],
  onPlay,
  favorites = [],
  onFavorite,
  onAddToPlaylist,
  onRemoveFromPlaylist,
}) {
  return (
    <main className="page-container">
      <h1>My Playlists</h1>

      {playlists.length === 0 && <p>No playlists available.</p>}

      {playlists.map((playlist) => {
        const playlistSongs = songs.filter((song) =>
          playlist.songIds.includes(song.id)
        );

        return (
          <section className="playlist-section" key={playlist.id}>
            <h2>{playlist.name}</h2>

            {playlistSongs.length === 0 ? (
              <p>No songs in this playlist yet.</p>
            ) : (
              playlistSongs.map((song) => (
                <div className="playlist-song" key={song.id}>
                  <div>
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>

                  <div className="playlist-song-actions">
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
                      {favorites.includes(song.id)
                        ? "♥ Favorited"
                        : "♡ Favorite"}
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveFromPlaylist?.(
                        playlist.id,
                        song.id
                      )}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            <hr />
          </section>
        );
      })}

      <h2>All Songs</h2>
      <MusicList
        songs={songs}
        onPlay={onPlay}
        favorites={favorites}
        onFavorite={onFavorite}
        onAddToPlaylist={onAddToPlaylist}
      />
    </main>
  );
}

export default Playlist;
