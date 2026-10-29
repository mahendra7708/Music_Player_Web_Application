# 🎵 TuneWave — Music for Every Mood

<p align="center">
  A modern and interactive music web application built with React.
</p>

<p align="center">
  🎧 Discover Songs • ▶️ Play Music • ❤️ Save Favorites • 🎶 Create Playlists
</p>

---

## 📌 About the Project

**TuneWave** is a React-based music web application designed to provide a simple and enjoyable music-listening experience. Users can browse songs, play music, manage their favorite tracks, and create personalized playlists through an attractive dark-themed interface.

The application includes user login and signup functionality, music playback controls, and protected pages for selected features.

## ✨ Key Features

- 🏠 **Home Page** — Browse songs with cover images, titles, and artist names.
- 🔐 **Authentication** — Login and signup functionality.
- 🎧 **Music Player** — Play, pause, skip tracks, and control playback progress.
- 🔊 **Volume Control** — Adjust music volume.
- ❤️ **Favorites** — Add songs to Favorites and remove them whenever needed.
- 🎶 **Playlist Management** — Create playlists and add or remove songs.
- 🔍 **Search Page** — Access the search section to find music.
- 🛡️ **Protected Routes** — Require login to access selected pages and features.
- 🎨 **Modern UI** — Dark theme, colorful buttons, and interactive song cards.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Building reusable UI components |
| JavaScript | Application logic and interactions |
| HTML5 | Structuring web pages |
| CSS3 | Styling and responsive design |
| React Router | Navigation and protected routes |
| HTML Audio API | Playing audio and controlling playback |
| Local Storage | Storing login status in the browser |
| Vite / npm | Development and package management, if configured in the project |

## 📂 Project Structure

```text
TuneWave/
├── public/
│   └── songs/                 # Music files, if stored here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MusicPlayer.jsx
│   │   ├── MusicList.jsx
│   │   └── AddToPlaylistModal.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Search.jsx
│   │   ├── Library.jsx
│   │   ├── Playlist.jsx
│   │   ├── Favorites.jsx
│   │   └── Profile.jsx
│   ├── data/
│   │   └── songs.js
│   ├── App.jsx
│   └── App.css
├── package.json
└── README.md
```

## 🚀 Getting Started

Follow these steps to run TuneWave on your computer.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Open the Project Folder

```bash
cd TuneWave
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

If your project uses Vite, run:

```bash
npm run dev
```

Open the local URL displayed in your terminal to use the application.

## 🎼 How to Use

1. Open TuneWave in your browser.
2. Browse the available songs on the Home page.
3. Log in to access protected features.
4. Play songs using the music player.
5. Add songs to Favorites for quick access.
6. Create playlists and organize your favorite tracks.
7. Use the playback and volume controls while listening.

## 🎯 Project Objectives

- Build an interactive music application using React.
- Understand component-based development and state management.
- Implement navigation and login-based access control.
- Integrate browser audio playback.
- Practice handling favorites and playlist functionality.
- Create an attractive and user-friendly interface.

## 🔮 Future Enhancements

- 💾 Store favorites and playlists persistently.
- 🗄️ Integrate a backend and database.
- 🔎 Improve search with artist, album, and genre filters.
- 👤 Add complete user profile management.
- 🌐 Deploy the application online.
- 📱 Further improve mobile responsiveness.

## 👨‍💻 Developer

**Mahendra Ommi**

B.Tech — Computer Science and Engineering (Artificial Intelligence)

## ⭐ Acknowledgements

This project was developed as a practical learning experience in React, JavaScript, front-end development, and interactive web application design.

---

<p align="center">
  Made with ❤️ and React
</p>

<p align="center">
  🎵 <b>TuneWave — Your Music, Your World!</b> 🎵
</p>
