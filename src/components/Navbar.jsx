
import { NavLink, useNavigate } from "react-router-dom";

function Navbar({ loggedIn, onLogout }) {
  const navigate = useNavigate();

  const userName = localStorage.getItem("tunewaveName") || "User";
  const userEmail = localStorage.getItem("tunewaveEmail") || "";

  function handleLogout() {
    onLogout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="top-navbar">
      <NavLink to="/home" className="brand">
        ♫ TuneWave
      </NavLink>

      <div className="nav-actions">
        <NavLink to="/home">Home</NavLink>

        {loggedIn ? (
          <>
            <NavLink to="/search">Search</NavLink>
            <NavLink to="/library">Library</NavLink>
            <NavLink to="/playlist">Playlist</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>

            <NavLink to="/profile" className="profile-link">
              <span className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </span>
              <span>{userName}</span>
            </NavLink>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
