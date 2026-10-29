
import { useState } from "react";

function AddToPlaylistModal({
  song,
  playlists = [],
  onAdd,
  onCreate,
  onClose,
}) {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(
    playlists[0]?.id || ""
  );
  const [newPlaylistName, setNewPlaylistName] = useState("");

  if (!song) return null;

  function handleAdd() {
    if (!selectedPlaylistId) {
      alert("Please select a playlist or create a new one.");
      return;
    }

    onAdd?.(selectedPlaylistId, song);
  }

  function handleCreate() {
    if (!newPlaylistName.trim()) {
      alert("Please enter a playlist name.");
      return;
    }

    onCreate?.(newPlaylistName, song);
  }

  return (
    <div
      className="playlist-modal-overlay"
      onClick={onClose}
    >
      <div
        className="playlist-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="playlist-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close popup"
        >
          ×
        </button>

        <h2 id="playlist-modal-title">Add to Playlist</h2>
        <p>
          Song: <strong>{song.title}</strong>
        </p>

        <label htmlFor="playlist-select">
          Choose an existing playlist
        </label>

        <select
          id="playlist-select"
          value={selectedPlaylistId}
          onChange={(event) =>
            setSelectedPlaylistId(event.target.value)
          }
        >
          <option value="">Select a playlist</option>
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="modal-primary-button"
          onClick={handleAdd}
          disabled={!selectedPlaylistId}
        >
          Add Song
        </button>

        <div className="modal-divider">OR</div>

        <label htmlFor="new-playlist-name">
          Create a new playlist
        </label>

        <input
          id="new-playlist-name"
          type="text"
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(event) =>
            setNewPlaylistName(event.target.value)
          }
        />

        <button
          type="button"
          className="modal-secondary-button"
          onClick={handleCreate}
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;
