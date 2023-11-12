import React, { useEffect, useState } from 'react'
import './User.css'
import Header from '../../Component/Header'
import { useSelector } from 'react-redux';
import { getBoxsCurrentUser, getCurrentUser, getSharedBoxs } from '../../APIController';
import DataTable from '../../Component/DataTable';

const User = () => {
    const token = useSelector(state => state.user.token);
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [sharedPost, setSharedPosts] = useState([]);
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
      const fetchBoxsCurrentUser = async () => {
        try {
          const data = await getBoxsCurrentUser(token);
          setUserPosts(data); 
          console.log(userPosts.length);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      useEffect(() =>{
        fetchBoxsCurrentUser();
      },[token]);
      useEffect(() => {
        getSharedBoxs(token)
          .then((sharedPost) => {
            console.log(sharedPost);
            setSharedPosts(sharedPost);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [token]); 
  return (
    <div className='user-page'>
        <Header/>
        <div className='user-main-grid'>
            <div className='user-info-container d-flex flex-column gap-4 align-items-center'>
                <div className='user-img-contianer'>
                    <img src={`http://localhost:5296/${user?.img}`} alt="avt" className='rounded-circle'/>
                </div>
                <div className='user-info-borderbottom d-flex flex-column gap-2 align-items-center'>
                    <span className='user-main-name text-red'>{user?.name}</span>
                    {user?.jobTitle ? (
                        <span className='user-main-jobtitle text-dark'>{user.jobTitle}</span>
                    ) : (
                        <span className='user-main-jobtitle text-dark'>Chưa cập nhật chức vụ</span>
                    )}  
                    <span className='user-main-username text-dark'>{user?.username}</span>
                </div>
                <div className='user-description text-justify'>
                {user?.description ? (
                        <p className='text-justify'>{user.description}</p>
                    ) : (
                        <p>Chưa có mô tả</p>
                    )}  
                </div>
                <button className='update-info-btn mt-4 p-3'>
                    Sửa thông tin
                </button>
            </div>
            <div className='user-post-detail d-flex flex-column gap-5'>
                <div className='post-statistical px-4 d-flex gap-5 justify-content-between'>
                    <div className='user-created-post statistical-box'>
                        <div className='statistical-number'>
                        {userPosts.length}
                        </div>
                        <div className='statistical-name'>
                        Bài viết đã tạo
                        </div>
                    </div>
                    <div className='user-shared-post statistical-box'>
                        <div className='statistical-number'>
                        {sharedPost.length}
                        </div>
                        <div className='statistical-name'>
                        Bài viết được chia sẻ
                        </div>
                    </div>
                    <div className='user-total-post statistical-box'>
                        <div className='statistical-number'>
                        {sharedPost.length+userPosts.length}
                        </div>
                        <div className='statistical-name'>
                        Bài viết liên quan
                        </div>
                    </div>

                </div>
                <div className='user-data-table'>
                    <div className='table-title'>
                        Bài viết của tôi
                        </div>
                    <DataTable/>

                </div>

            </div>
        </div>
    </div>
  )
}

export default User
