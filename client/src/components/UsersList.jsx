import React from 'react';


const UsersList = (props) => {
  return (
  <div className="usercontainer">
    <h1>Flixsters</h1>
    <div className="userslistcontainer">
      {props.usersList.map(user => {
      return  (
          <div className="userslist" key={user.id} onClick={()=>{props.getOneUser(user.id)}}>{user.username}</div>
        )})}
    </div>
  </div>
    )
}

export default UsersList;
