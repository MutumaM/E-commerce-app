import { NavLink } from 'react-router-dom'
import './Navbar.css'


function Navbar() {
  return (
    <nav className="navbar">

      <span className="nav-logo">
        Nu<span>Shop</span>
      </span>

      <NavLink to="/" className="nav-link" end>
        Home
      </NavLink>

      <NavLink to="/shop" className="nav-link">
        Shop
      </NavLink>

      <NavLink to="/admin" className="nav-link">
        Admin Portal
      </NavLink>

    </nav>
  )
}

export default Navbar
