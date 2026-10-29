
import { Link } from "react-router-dom";

function Profile() {
  const name = localStorage.getItem("tunewaveName") || "User";
  const email = localStorage.getItem("tunewaveEmail") || "Not available";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar-large">
          {name.charAt(0).toUpperCase()}
        </div>

        <h1>My Profile</h1>
        <p className="profile-subtitle">Your TuneWave account</p>

        <div className="profile-detail">
          <span>Full Name</span>
          <strong>{name}</strong>
        </div>

        <div className="profile-detail">
          <span>Email Address</span>
          <strong>{email}</strong>
        </div>

        <Link to="/home" className="profile-home-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Profile;
