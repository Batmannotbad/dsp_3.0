import React, { useEffect, useState } from 'react'
import { getCurrentUser, userLogout } from '../APIController';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { logout } from '../features/userSlice';
import { Link } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const userRole = useSelector(state => state.user.role);
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
    <div className='dashboard-header px-3'>
        <div className='page-navigation d-flex justify-content-between'>
          <div className='page-links d-flex gap-2 align-items-center'>
          <div className='web-title'>
          <Link to="/">
            <h1 className=''>DSP</h1>
          </Link>
          </div>
          <div className='home-nav link-nav  '>
            <a href="/" className='px-3 links-border-right'>Trang chủ</a>
          </div>
          <div className='intro-nav link-nav'>
            <a href="/" className='px-3 links-border-right'>Giới thiệu</a>
          </div>
          <div className='help-nav link-nav'>
            <a href="/" className='px-3'>Trợ giúp</a>
          </div>
          </div>
          {user && (
          <Dropdown className="d-flex">
            <Dropdown.Toggle>
              <div className="user-info d-flex gap-2 align-items-center">
                <div className="user-avt">
                  <img
                    src={`http://localhost:5296/${user?.img}`}
                    alt="avt"
                    className="rounded-circle"
                  />
                </div>
                <div className="info d-flex flex-column align-items-center gap-1">
                  <span className="name">{user?.name}</span>
                  <span className="job-title">{user?.jobTitle}</span>
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/user">
                Hồ sơ
              </Dropdown.Item>
              {userRole && userRole.role === 'Admin' && (
                <Dropdown.Item as={Link} to="/admin/home">
                  Quản trị
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        </div>
      </div>
  )
}

export default Header