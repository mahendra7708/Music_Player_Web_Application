
import MusicList from "../components/MusicList.jsx";

function Library({ songs, onPlay }) {
  return (
    <div className="page-content">
      <section className="welcome-banner">
        <p>YOUR MUSIC COLLECTION</p>
        <h1>My Library</h1>
        <p>Explore your music and play your favorite tracks.</p>
      </section>

      <h2>All Songs</h2>

      <MusicList
        songs={songs}
        onPlay={onPlay}
      />
    </div>
  );
}

export default Library;
