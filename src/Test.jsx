import React from 'react'
import { useSelector } from 'react-redux';
import { userLogout } from './APIController';

const Test = () => {
  const token = useSelector(state => state.user.token);
  const handleLogout = async () => {
    try {
    await userLogout(token);
    console.log("Đăng xuất thành công");
    } catch (error) {
    }
    };
  return (
    <div>
      <button className='user-info d-flex gap-2 align-items-center' onClick={handleLogout}>
        Đăng xuất
    </button>
    </div>
  )
}

export default Test
