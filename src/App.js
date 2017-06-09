import React, { Component } from 'react';
import './App.css';
import clientAuth from './clientAuth'

//App components
import Signup from './signup'
import Login from './login'
import Home from './home'
import Profile from './profile'
import ImageUploader from './imageupload'
import Post from './post'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      loggedIn: false,
      view: 'home'
    }
  }
  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
      view: currentUser ? 'posts' : 'home'
    })
  }

  _signup(newUser) {
    clientAuth.signUp(newUser).then((data)=>{
      console.log(data);
      this.setState({
        currentUser: data,
        loggedIn: true,
        view: 'posts'
      })
    })
  }

  _login(credentials) {
    clientAuth.logIn(credentials).then((user) =>{
      console.log(user)
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: 'posts'
      })
    })
  }

  _banana(credentials) {
    console.log("BANANANANANANA...")
    console.log(credentials)
  }
  _logOut() {
    clientAuth.logOut().then(message => {
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'home'
      })
    })
  }
  _setView(evt) {
    evt.preventDefault()
    const view = evt.target.name
    this.setState({
      view: view
    })
  }

  render() {
    return (
        <div className="container-fluid">
          <div className='text-center page-header'>
            <ul className="nav navbar-nav">
              <li><button className="btn btn-default" name='home' onClick={this._setView.bind(this)}>Home</button></li>

            {/* <h2>{this.state.loggedIn ? this.state.currentUser.firstname : 'Not Logged In'}</h2> */}


              {!this.state.loggedIn && (
                <li><button type="button" className="btn btn-primary" name='signup' onClick={this._setView.bind(this)}>Sign Up</button></li>
              )}

              {!this.state.loggedIn && (
                <li><button name='login' className="btn btn-default" onClick={this._setView.bind(this)}>Log In</button></li>
              )}
              {this.state.loggedIn && (
                <li><button className="btn btn-default" onClick={this._logOut.bind(this)}>Log Out</button></li>
              )}
              
              {this.state.loggedIn && (
                <li><button className="btn btn-default" name='profile' onClick={this._setView.bind(this)}>Profile</button></li>
              )}
          </ul>


          {
          {
            home: <Home/>,
            login: <Login onLogin={this._login.bind(this)}/>,
            signup: <Signup onSignup={this._signup.bind(this)}/>,
            posts: <Post />,
            profile: <Profile/>
            // allposts: <AllPosts />
          }[this.state.view]}
          </div>
        </div>
    )
  }
}

export default App;
