import React, {Component} from 'react'
import clientAuth from './clientAuth.js'

class Home extends Component {
  state = {
    allPosts: [],
  }
  componentDidMount() {
    //make a call to retrieve All user posts...
    clientAuth.getAllPosts().then(res => {
      this.setState({
        allPosts: res.data
      })
    })
  }
  render(){
    const allPosts = this.state.allPosts.map((p, i) =>{
      return (
          <div className="col-sm-6 col-md-4" key={i}>
            <div className="thumbnail">
              <div className="crop">
                <img src={p.image} alt=" " className="img zoom"/>
              </div>
                <div className="caption">
                  <h3>{p.title}</h3>
                    <p>{p.body}</p>
                </div>
            </div>
          </div>

      )
    })
    return(
      <div className= 'container-fluid'>
        <h2>Welcome to Moving Out!</h2>
          <div className='text-center page-header'>
            <h1> All Available Posts </h1>
            <div className="row">
              {allPosts}
            </div>
        </div>
    </div>
    )
  }
}


export default Home;
