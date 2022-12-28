import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      return this.onSubmitSuccess(data.jwt_token)
    }
    return this.onSubmitFailure(data.error_msg)
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <div className="login-page-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website-logo"
            className="website-logo"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                value={username}
                className="input-field"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="input-field"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
