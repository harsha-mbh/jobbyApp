import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
      </Link>

      <ul className="nav-menu">
        <Link className="nav-link" to="/">
          <li className="nav-item">Home</li>
        </Link>
        <Link className="nav-link" to="/jobs">
          <li className="nav-item">Jobs</li>
        </Link>
        <li className="nav-link">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
