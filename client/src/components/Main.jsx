import React, { Component } from 'react';
import UsersList from './UsersList';
import Movie from './Movie';



class Main extends Component {
  constructor(props) {
  super(props);
  this.state = {
    usersLoaded: false,
    usersList: null,
    }
  }

componentDidMount() {
  this.getUsers()
  }

getUsers() {
  fetch('/user/list', {
    method: 'GET',
    headers: {},
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    this.setState({
      usersLoaded: true,
      usersList: res.data.users,
    })
  })
}

  render() {
    return (
      <div className="maincontainer">
        <p>This is the main</p>
        <ul>
          <li><button className="logout" onClick={this.props.logout}>Logout</button></li>
        </ul>
        <div className="asidecontainer">
        {this.state.usersLoaded ?
          <UsersList usersList={this.state.usersList} /> : <p>Loading...</p>
        }
          <Movie fetchMovie={this.props.fetchMovie} postMovie={this.props.postMovie}/>
        </div>
      </div>
      )
  }
}


export default Main;
