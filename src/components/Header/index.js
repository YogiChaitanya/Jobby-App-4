import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

// eslint-disable-next-line
import {FiLogOut} from 'react-icons/fi'
// eslint-disable-next-line
import {AiFillHome} from 'react-icons/ai'
// eslint-disable-next-line
import {BsFillBriefcaseFill} from 'react-icons/bs'

const Header = props => {
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <div className="nav-bar-desktop-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
        </Link>

        <ul className="link-card">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
          <li>
            <button
              onClick={onClickLogoutBtn}
              className="logout-btn"
              type="button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="nav-bar-mobile-logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
        </Link>

        <ul className="link-card">
          <li>
            <Link to="/" className="nav-link">
              <AiFillHome aria-label="close" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              <BsFillBriefcaseFill aria-label="close" />
            </Link>
          </li>
          <li>
            <button
              onClick={onClickLogoutBtn}
              className="logout-btn"
              type="button"
            >
              <FiLogOut aria-label="close" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
