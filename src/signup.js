import React, { Component } from 'react'

class Signup extends Component {

  _handleSignup(evt) {
    evt.preventDefault()
    const newUser = {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onSignup(newUser)
  }

  render() {
    return (
      <div className='container'>
        <h2>Sign Up</h2>
        <form onSubmit={this._handleSignup.bind(this)}>
          <input type='text' placeholder='First Name' ref='firstname' />
          <input type='text' placeholder='Last Name' ref='lastname' />
          <input type='text' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button type='submit'>Create Account</button>
        </form>
      </div>
    )
  }
}

export default Signup;
