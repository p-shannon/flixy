import React from 'react';


const Nav = (props) => {
  return (
    <div className="navcontainer">
    <nav>
        <ul>
          <li><a className="flixyfeed">Flixy Feed</a></li>
          <li><a className="profile">Profile</a></li>
          <li><a className="logout" onClick={props.logout}>Logout</a></li>
        </ul>
    </nav>
    </div>
    )
}

export default Nav;
