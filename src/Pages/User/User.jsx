import React, { useEffect, useRef, useState } from 'react'
import './User.css'
import Header from '../../Component/Header'
import { useSelector } from 'react-redux';
import { getBoxsCurrentUser, getCurrentUser, getSharedBoxs, putUserImg, updateUserInformation } from '../../APIController';
import DataTable from '../../Component/DataTable';

const User = () => {
    const token = useSelector(state => state.user.token);
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [sharedPost, setSharedPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [updateUser,setUpdateUser] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [jobTitle, setJobTitle] = useState(user?.jobTitle || '');
    const [description, setDescription] = useState(user?.description || '');
    const inputRef = useRef(null);
    const MAX_FILE_NAME_LENGTH = 20;

    const handleClickChangeImage = () => {
      setIsEditing(true);
    };
    useEffect(() => {
      setName(user?.name || '');
      setJobTitle(user?.jobTitle || '');
      setDescription(user?.description || '');
    }, [user]);
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
      const handleSubmit = async () => {
        try {
          const response = await putUserImg(token, selectedImage);
          console.log(response);
          window.location.reload(); 
        } catch (error) {
          console.error(error);
        }
      };
      const handleFileChange = (e) => {
        const input = e.target;
        let newFileName = '';
      
        if (input.files && input.files.length > 1) {
          newFileName = (input.getAttribute('data-multiple-caption') || '').replace('{count}', input.files.length);
        } else {
          newFileName = input.value.split('\\').pop();
        }
      
        setFileName(newFileName);
      };      
      const displayFileName = fileName.length > MAX_FILE_NAME_LENGTH
    ? `${fileName.slice(0, MAX_FILE_NAME_LENGTH)}...`
    : fileName;
    const handleEditClick = () => {
      setUpdateUser(true);
    };
    const handleCancelEdit = () => {
      setUpdateUser(false);
      setName(user?.name || '');
      setJobTitle(user?.jobTitle || '');
      setDescription(user?.description || '');
    };
    const updateUserForm = async () => {
      try{
        const response = await updateUserInformation(token, name, jobTitle, description);
        console.log(response);
        setUpdateUser(false);
        window.alert('Thông tin người dùng đã được cập nhật');
        window.location.reload();
        console.log('User information updated successfully');
      } catch (error) {
        console.error('Error updating user information:', error);
      }
    };
  
    
      
  return (
    <div className='user-page'>
        <Header/>
        <div className='user-main-grid'>
            <div className='user-info-container d-flex flex-column gap-4 align-items-center'>
                <div className='user-img-contianer d-flex flex-column align-items-center gap-2'>
                    <img src={`http://localhost:5296/${user?.img}`} alt="avt" className='rounded-circle'/>
                    {isEditing ? (
                    <div className='d-flex flex-column gap-2 align-items-center'>
                      <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        className='inputfile'
                        onChange={(e) => {
                          setSelectedImage(e.target.files[0]);
                          handleFileChange(e);
                        }}
                        
                      />
                      <label for="file" className='pick-image'>
                        <span>{displayFileName || 'Chọn ảnh từ thiết bị'}</span>
                      </label>
                      <button className='upload-img-btn'onClick={()=>handleSubmit()}>
                       Tải ảnh lên
                      </button>
                    </div>
                  ) : (
                    <button className='change-img-btn' onClick={handleClickChangeImage}>
                      Thay đổi ảnh đại diện
                    </button>
                  )}
                </div>
                <div className='user-info-borderbottom d-flex flex-column gap-2 align-items-center'>
                {updateUser ? (
                  <div className='d-flex flex-column gap-4 justify-content-between'>
                    <div className='name-container d-flex gap-2 align-items-center justify-content-between'>
                      <span className='info-title'>Họ tên: </span>
                      <input 
                        className='p-2 info-input'
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Nhập họ tên người dùng'
                        />
                    </div>
                    <div className='name-container d-flex gap-2 align-items-center'>
                      <span className='info-title'>Chức vụ: </span>
                      <input 
                        className='p-2 info-input'
                        type="text" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                        placeholder='Nhập chức vụ'
                        />
                        </div>
                    <span className='user-main-username text-dark'>{user?.username}</span>
                  </div>
                ) : (
                  <>
                    <span className='user-main-name text-red'>{user?.name}</span>
                    {user?.jobTitle ? (
                      <span className='user-main-jobtitle text-dark'>{user.jobTitle}</span>
                    ) : (
                      <span className='user-main-jobtitle text-dark'>Chưa cập nhật chức vụ</span>
                    )}
                    <span className='user-main-username text-dark'>{user?.username}</span>
                  </>
                )}
              </div>
              <div className='user-description text-justify'>
                {updateUser ? (
                  <div className='d-flex flex-column gap-3'>
                    <span className='info-title'>Mô tả</span>
                  <textarea 
                    className='text-description'
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder='Nhập mô tả'/>
                  </div>
                ) : (
                  <>
                    {user?.description ? (
                      <p className='text-justify'>{user.description}</p>
                    ) : (
                      <p>Chưa có mô tả</p>
                    )}
                  </>
                )}
              </div>
              {updateUser ? (
                <div className='d-flex justifty-content-between gap-5'>
                  <button className='update-info-btn mt-4 p-3' onClick={updateUserForm}>
                    Lưu thông tin
                  </button>
                  <button className='cancel-info-btn mt-4 p-3' onClick={handleCancelEdit}>
                    Hủy
                  </button>
                </div>
              ) : (
                <button className='update-info-btn mt-4 p-3' onClick={handleEditClick}>
                  Sửa thông tin
                </button>
              )}

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
