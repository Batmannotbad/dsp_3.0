import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, userLogout } from '../../APIController';
import { logout } from '../../features/userSlice';
import { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Header = () => {
    const dispatch = useDispatch();
    const userRole = useSelector(state => state.user.role);
    const token = useSelector(state => state.user.token);
    const [user, setUser] = useState(null);
    const handleLogout = async () => {
        try {
        await userLogout(token);
        dispatch(logout());
        } catch (error) {
        console.error('Error:', error);
        }
        };
      const fetchCurrentUser = async () => {
        try {
          const data = await getCurrentUser(token);
          setUser(data);
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      useEffect(() =>{
        fetchCurrentUser();
      },[token]);

    return (
        <div className="header" style={{height:'auto',position:"fixed", top:"10px", right:"100px"}}>
            <Dropdown>
                <Dropdown.Toggle>
                    <div className="user-avt">
                    <img src={`http://localhost:5296/${user?.img}`} alt="avt" className='rounded-circle'/>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/user">Hồ sơ</Dropdown.Item>
               {userRole && userRole.role === 'Admin' && (
                <Dropdown.Item as = {Link} to ="/admin/home">
                  Quản trị
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={handleLogout}>
                Đăng xuất
              </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default Header
