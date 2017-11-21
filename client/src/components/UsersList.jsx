import React from 'react';


const UsersList = (props) => {
  return (
    <div className="userslist">
      <ul>
      {props.usersList.map(user => {
      return  (
        <li key={user.id}>{user.username}</li>
        )})}
      </ul>
    </div>
    )
}

export default UsersList;
