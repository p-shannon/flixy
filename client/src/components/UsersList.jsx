import React from 'react';


const UsersList = (props) => {
  return (
    <div className="userslistcontainer">
      {props.usersList.map(user => {
      return  (
        <div className="userslist" key={user.id}>{user.username}</div>
        )})}
    </div>
    )
}

export default UsersList;
