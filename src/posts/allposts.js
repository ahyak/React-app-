import React, {Component} from 'react'
import clientAuth from './clientAuth.js'

var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

class Newpost extends Component {

  state = {
    posts: [],
    showModal: false
  }
  componentDidMount() {
    //make a call to retrieve posts...
    clientAuth.getPosts().then(res => {
      this.setState({
        posts: res.data
      })
    })
  }
  _addPost(evt) {
    evt.preventDefault()
    const newPost = {
      title: this.refs.title.value,
      image: this.refs.image.value,
      body: this.refs.body.value
    }
    console.log('Creating a new Post in the database')
    clientAuth.addPost(newPost).then(res =>{
      this.setState({
        posts: [
          res.data.post,
          ...this.state.posts
        ],
      showModal: false
      })
    })
  }
  openModal() {
    this.setState({
      showModal: true
    })
  }
  closeModal() {
    this.setState({
      showModal: false
    })
  }
  render(){
    // console.log(this.state.posts)
    const posts = this.state.posts.map((post, i) =>{
      return (
        <div className="col-sm-6 col-md-4" key={i}>
          <div className="thumbnail">
            <img src={post.image} alt=" " className="zoom"/>
              <div className="caption">
                <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <button id={post._id} className="btn btn-default" name='editPost'
                    onClick={this._setEditing.bind(this, post._id)}>Edit</button>
                  {' '}
                  <button className="btn btn-danger"
                    onClick={this._deletePost.bind(this, post._id)}>Delete</button>
              </div>
          </div>
        </div>
      )
    })
    var formButton
      if (this.state.editing) {
        formButton = <Button type='submit'>Update Listing</Button>
      } else {
        formButton = <Button type='submit'>Add New Listing</Button>
      }
    return(
      <div className= 'container-fluid'>
        <div className='text-center page-header'>
          <h1> Posts </h1>
          <Button onClick={this._setEditing.bind(this)}>
            Create New Post!</Button>

          <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>What are you selling today?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this._formSubmit.bind(this)}>
                <div className='form-group'>
                  <input name='title' className="form-control" type='text' placeholder='Title' ref='title'
                  onChange={this._handleInputChange.bind(this)} value={this.state.currentEditing.title}/>
                </div>
                <div className='form-group'>
                  <textarea name='body' className="form-control" placeholder='Body' ref='body'
                    onChange={this._handleInputChange.bind(this)} value={this.state.currentEditing.body}/>
                </div>
                <div className='form-group'>
                  <input name='image' className="form-control" type='text' placeholder='Image' ref='image'
                    onChange={this._handleInputChange.bind(this)} value={this.state.currentEditing.image}/>
                </div>
              <div className="modal-footer">
              <Button onClick={this.closeModal.bind(this)}>Close</Button>
              {formButton}
              </div>
            </form>
          </Modal.Body>
          </Modal>
        </div>
          <div className="row">
            {posts}
          </div>

      </div>
    )
  }
}


export default Newpost
