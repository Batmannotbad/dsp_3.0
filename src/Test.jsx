import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInformation } from './APIController';

const Test = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || '');
  const [description, setDescription] = useState(user?.description || '');

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setName(user?.name || '');
    setJobTitle(user?.jobTitle || '');
    setDescription(user?.description || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserInformation(token, name, jobTitle, description);
      setEditing(false);
      console.log('User information updated successfully');
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <div>
      <div className='user-info-borderbottom d-flex flex-column gap-2 align-items-center'>
        {editing ? (
          <>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nhập họ tên người dùng'
               />
            <input 
              type="text" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              placeholder='Nhập chức vụ'
              />
            <span className='user-main-username text-dark'>{user?.username}</span>
          </>
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
        {editing ? (
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder='Nhập mô tả'/>
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
      {editing ? (
        <div>
          <button className='update-info-btn mt-4 p-3' onClick={handleSubmit}>
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
  );
};

export default Test;
