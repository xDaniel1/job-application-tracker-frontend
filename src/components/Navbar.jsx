import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Job Application Tracker</Link>
      <Link to="/applications/new">Add Application</Link>
    </nav>
  )
}

export default Navbar
