import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CreateNew from '../../Component/CreateNew/CreateNew';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/userSlice';
import PostGrid from '../../Component/PostGrid';
import { getCurrentUser, userLogout } from '../../APIController';
import PostDetail from '../../Component/PostDetail';
import SharedPost from '../../Component/SharedPost';
import { Dropdown } from 'react-bootstrap';
const Dashboard = () => {
  const dispatch = useDispatch();
  const selectedPostID = useSelector(state => state.post.selectedPostID);
  const token = useSelector(state => state.user.token);
  const [user, setUser] = useState(null);
  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPostDetail, setShowPostDetail] = useState(false);
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
  const handleShowPrevContainer = (postId) => {
    console.log("id là:" + postId);
    if (postId !== null) {
      setShowPostDetail(true);
    }
  };

 
  return (
    <div className='dashboard'>
      <div className='dashboard-header px-3'>
        <div className='page-navigation d-flex justify-content-between'>
          <div className='page-links d-flex gap-2 align-items-center'>
          <div className='web-title'>
          <Link to="/">
            <h1 className=''>DSP</h1>
          </Link>
          </div>
          <div className='home-nav link-nav  '>
            <a href="/home" className='px-3 links-border-right'>Trang chủ</a>
          </div>
          <div className='intro-nav link-nav'>
            <a href="/" className='px-3 links-border-right'>Giới thiệu</a>
          </div>
          <div className='help-nav link-nav'>
            <a href="/" className='px-3'>Trợ giúp</a>
          </div>
          </div>
          <Dropdown>
            <Dropdown.Toggle >
              <div className='user-info d-flex gap-2 align-items-center'>
                <div className='user-avt'>
                  <img src={`http://localhost:5296/${user?.img}`} alt="avt" className='rounded-circle'/>
                </div>
                <div className='info d-flex flex-column align-items-center gap-1'>
                  <span className="name">{user?.name}</span>
                  <span className='job-title'>{user?.jobTitle}</span>
                </div>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/user">Hồ sơ</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                Đăng xuất
              </Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='option-section d-flex justify-content-between align-items-center'>
          <div className='options d-flex gap-4'>
          <div className="nav nav-tabs d-flex gap-3">
            <a className="nav-link active" data-bs-toggle="tab" href="#mypost">Bài viết của tôi</a>
            <a className="nav-link" data-bs-toggle="tab" href="#sharedpost">Được chia sẻ với tôi</a>
            {/* <a className="nav-link" data-bs-toggle="tab" href="#recently">Gần đây</a> */}
          </div>
          </div>
          <div className='search-box'>
            <input type="search" className="search-input" placeholder="Tìm kiếm" />
          </div>
        </div>
      </div>
      <div className='content-container py-3'>
        <div className='list-container'>
          <div className='filter-section d-flex justify-content-between'>
            <div className='dropdown-filter d-flex gap-2 align-items-center'>
              <div className='filter-label'>Sắp xếp theo: </div>
              <select name="" id="" className='filter-select'>
                <option value="recently">Gần đây</option>
                <option value="dateModified">Ngày tạo</option>
              </select>
            </div>
            <div className='add-btn'>
              <Button className='btn-add-post d-flex align-items-center' onClick={handleShow}>
                <img src="./img/Group.png" alt="add icon" />
                <span className='add-btn-label'>Thêm bài viết</span>
              </Button>
            </div>
            <CreateNew show={show} handleClose={handleClose} />
          </div>
          <div className='content-grid'>
          <div className="tab-content">
            
            <div className="tab-pane fade show active" id="mypost">
            <PostGrid handleShowPrevContainer={handleShowPrevContainer} />
            </div>
            
            
            <div className="tab-pane fade" id="sharedpost">
            <SharedPost  handleShowPrevContainer={handleShowPrevContainer} />
            </div>
            
          </div>
          </div>
        </div>
        <div className='prev-bar mb-5'>
        {showPostDetail && <PostDetail postId={selectedPostID} />}
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
