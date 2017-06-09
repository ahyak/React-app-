import React, {Component} from 'react'
import clientAuth from './clientAuth.js'

//required for react bootstrap to work
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

class Post extends Component {

  state = {
    posts: [],
    editing: '',
    currentEditing:{title:'', body:'', image:''},
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
  _handleInputChange(evt) {
    //When any of the input fields are changed, we are setting the new value to that
    var currentEditing = this.state.currentEditing
    currentEditing[evt.target.name] = evt.target.value
    this.setState({
      currentEditing: currentEditing
    })
  }
    _setModal(id){
        var _currentEditing= this.state.posts.find(p => p._id === id)
        _currentEditing = Object.assign({}, _currentEditing)
        this.setState({
          editing: id,
          currentEditing: _currentEditing,
          showModal:true
        })
    }

  _formSubmit(evt) {
    evt.preventDefault()
    const newPost = {
      title: this.refs.title.value,
      image: this.refs.image.value,
      body: this.refs.body.value
    }
    if (this.state.editing) {
      console.log('Editing a new Post')
      console.log(newPost)
      console.log(this.state.editing)
      clientAuth.updatePost(newPost,this.state.editing).then(res =>{
        const postIndex = this.state.posts.findIndex((post) => {
        return post._id === this.state.editing
      })
      this.setState({
        posts: [
          ...this.state.posts.slice(0, postIndex),
          res.data.post,
          ...this.state.posts.slice(postIndex + 1)
        ],showModal: false,
        editing: null,
        currentEditing: {description: '', reps:'', dateTime: ''}
      })
    })
  } else {
      console.log('Creating a new Post in the database')
      clientAuth.addPost(newPost).then(res =>{
        this.setState({
          posts: [
            res.data.post,
            ...this.state.posts
          ],
          showModal: false,
          editing: null,
          currentEditing: {description: '', reps:'', dateTime: ''}
        })
      })
    }
  }
  _deletePost(id) {
    console.log(id)
    clientAuth.deletePost(id).then((res) => {
      console.log(res)
      console.log("Post Deleted!")
      this.setState({
        posts: this.state.posts.filter((post)=> {
          return post._id !== id
        })
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
    const posts = this.state.posts.map((post, i) =>{
      return (
        <div className="col-sm-6 col-md-4" key={i}>
          <div className="thumbnail">
            <div className="crop">
            <img src={post.image} alt=" " className="img zoom"/>
          </div>
              <div className="caption">
                <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <button id={post._id} className="btn btn-default" name='editPost'
                    onClick={this._setModal.bind(this, post._id)}>Edit</button>
                  {' '}
                  <button className="btn btn-danger"
                    onClick={this._deletePost.bind(this, post._id)}>Delete</button>
              </div>
          </div>
        </div>
      )
    })
    var formButton
    console.log(this.state.editing)
      if (this.state.editing) {
        formButton = <Button type='submit'>Update Listing</Button>
      } else {
        formButton = <Button type='submit'>Add New Listing</Button>
      }
    return(
      <div className= 'container-fluid'>
        <div className='text-center page-header'>
          <h3> Posts </h3>
          <Button bsStyle="primary" onClick={this._setModal.bind(this, null)}>
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


export default Post
