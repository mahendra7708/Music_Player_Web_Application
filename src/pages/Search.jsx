
import { useState } from "react";
import MusicList from "../components/MusicList";

function Search({ songs, onPlay }) {
  const [query, setQuery] = useState("");

  const results = songs.filter((song) =>
    `${song.title} ${song.artist}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="page-content">
      <h1>Search Music</h1>

      <input
        className="search-input"
        type="search"
        placeholder="Search songs or artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <MusicList songs={results} onPlay={onPlay} />
    </div>
  );
}

export default Search;
