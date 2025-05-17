import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import { FaHome, FaHeart, FaSearch, FaMusic, FaLine, FaPlayCircle, FaList, FaSignOutAlt, FaSignInAlt, FaSign, FaPlus, FaUser } from 'react-icons/fa';
import '../User/sidebar.css'

const Asidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="list-unstyled">
        <strong style={{display:"flex",justifyContent:"center",fontSize:"30px"}}>Music-Player</strong>
        <h5 className='text-center'>(Admin)</h5>
       <div style={{marginTop:"35px"}}>
       <li>
          <Link to="/users">
          <p style={{paddingLeft:"10px"}}> <FaUser /> </p> <p style={{paddingLeft:"10px"}}>Users</p>
          </Link>
        </li>
       <li>
          <Link to="/mysongs">
          <p style={{paddingLeft:"10px"}}> <FaList /> </p> <p style={{paddingLeft:"10px"}}>Songs</p>
          </Link>
        </li>
        <li>
          <Link to="/addsong">
          <p style={{paddingLeft:"10px"}}> <FaPlus /> </p> <p style={{paddingLeft:"10px"}}>AddSong</p>
          </Link>
        </li>
        <li>
          <Link to="/">
           <p style={{paddingRight:"10px", transform: "scaleX(-1)"}}> <FaSignOutAlt /> </p> <p style={{paddingLeft:"10px"}}>Signout</p>
          </Link>
        </li>
        </div>
      </ul>
    </nav>
  );
};

export default Asidebar;