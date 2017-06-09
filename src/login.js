import React, { Component } from 'react'

class Login extends Component {

  _handleLogin= (evt) => {
    evt.preventDefault()
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    console.log(credentials)
    this.props.onLogin(credentials)
  }

  render() {
    return (
      <div className="container-fluid">
          <form onSubmit={this._handleLogin.bind(this)}>
            <div className='form-group'>
              <input type='text' className= "form-control" placeholder='Email' ref='email' />
            </div>
            <div className='form-group'>
              <input type='password' className= "form-control" placeholder='Password' ref='password' />
            </div>
            <div className='form-group'>
              <button type='submit'>Log In</button>
            </div>
          </form>
      </div>

    )
  }
}

export default Login;
