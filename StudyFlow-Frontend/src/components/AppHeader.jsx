import fotoProfil from "../assets/profile.jpg";
import logo from "../assets/studyflow-logo.png";

function AppHeader() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <a href="#dashboard" className="brand">
          <img
            src={logo}
            alt="Logo StudyFlow"
            className="brand-mark"
          />
          <span>StudyFlow</span>
        </a>

        <nav className="header-nav">
          <a className="nav-link active" href="#dashboard">
            Dashboard
          </a>

          <a className="nav-link" href="#daftar-tugas">
            Daftar Tugas
          </a>
        </nav>

        <div className="profile">
          <img
            src={fotoProfil}
            alt="Foto profil Muhammad Akbar Ivanka"
            className="profile-avatar-image"
          />

          <span className="profile-name">
            Muhammad Akbar Ivanka
          </span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;