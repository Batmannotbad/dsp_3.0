import React from 'react'
import { Link } from "react-router-dom";


const SideBar = () => {
  return (
    <div style={{ height: 'auto', width: '100px' }}>
    <Link to="/" className='sidebarTitle'>
        <h3 className="" style={{ fontWeight: 1000, fontSize: "2rem", paddingBottom: 20 }}>DSP</h3>
    </Link>
    <ul style={{ listStyleType: "none", padding: "15px", height: "auto" }}>
        <Link to="/admin/home" className="link">
            <li style={{paddingBottom:"40px"}}>
                <svg height="40" width={40} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10,3H4A1,1,0,0,0,3,4V8A1,1,0,0,0,4,9h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,7H5V5H9Zm1,4H4a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V12A1,1,0,0,0,10,11ZM9,19H5V13H9Zm11-4H14a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V16A1,1,0,0,0,20,15Zm-1,4H15V17h4ZM20,3H14a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3Zm-1,8H15V5h4Z" /></svg>
            </li>
        </Link>
        <Link to="/admin/user" className="link">
            <li style={{paddingBottom:"40px"}}>
                <svg height="40" width={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
            </li>
        </Link>
        <Link to="/admin/post" className="link">
            <li style={{paddingBottom:"40px"}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" /></svg>
            </li>
        </Link>
    </ul>
</div>
  )
}

export default SideBar
