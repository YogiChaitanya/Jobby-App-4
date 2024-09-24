import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({
      showSubmitError: true,
      errorMsg: errorMessage,
    })
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      console.log(`jwtToken : ${data.jwt_token}`)
    } else {
      this.onSubmitFailure(data.error_msg)
      console.log(`error Message : ${data.error_msg}`)
    }
  }

  onChangeUserInput = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  render() {
    const {usernameInput, passwordInput} = this.state
    const {showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="login-card" onSubmit={this.onSubmitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <label htmlFor="usernameId" className="label-name">
            USERNAME
          </label>
          <input
            id="usernameId"
            type="text"
            placeholder="Username"
            className="username-input-field"
            value={usernameInput}
            onChange={this.onChangeUserInput}
          />
          <label htmlFor="passwordId" className="label-name">
            PASSWORD
          </label>
          <input
            id="passwordId"
            type="password"
            placeholder="password"
            className="password-input-field"
            value={passwordInput}
            onChange={this.onChangePasswordInput}
          />
          <button className="login-btn" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
