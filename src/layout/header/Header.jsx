import './header.css'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/WealthHealth-logo.png'

function Navbar() {

    const location = useLocation()
    const isOnUserPage = location.pathname === '/'

    return (
        <nav className="nav">
            <Link to="/" className="logo-container">
                <img
                    className="logo"
                    src={Logo}
                    alt="Wealth Health Logo"
                />
            </Link>

            <Link to="/" className="nav-item title center-title">HRnet</Link>

            <div className="set-items">
                {isOnUserPage ? (
                    <Link className="nav-item" to="/employees">View Current Employees</Link>
                ) : (
                    <Link className="nav-item" to="/">Create An Employee</Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar