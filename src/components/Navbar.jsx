import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-badge">V</div>
          <span>Valorant Agents</span>
        </div>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/agents">Agents</NavLink>
        </div>
      </div>
    </nav>
  )
}
