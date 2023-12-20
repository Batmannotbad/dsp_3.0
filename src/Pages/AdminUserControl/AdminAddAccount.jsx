import React, { useState } from 'react'
import SideBar from '../../Component/Admin/SideBar'
import Header from '../../Component/Admin/Header'
import { adminCreateAccount } from '../../APIController';
import { useSelector } from 'react-redux';

export default function AdminAddAccount() {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(null);
     const token = useSelector(state => state.user.token);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const result = await adminCreateAccount(userName, name, password, email,token);
    
          setResponse('Account created successfully!');
        } catch (error) {
          setResponse('Failed to create account. Please try again.');
          console.error('Error creating account:', error.message);
        }
      };
  return (
    <div className='admin-home'>
        <SideBar/>
        <div style={{ padding: "100px 60px", backgroundColor: "white" }}>
        <Header/>
        <div className='mb-4 d-flex flex-column alin-items-center'  style={{ backgroundColor: "white"}}>
        {response && <p>{response}</p>}

            {/* Create the account creation form */}
            <form onSubmit={handleFormSubmit} className='d-flex flex-column gap-3 add-acc-form p-4'>
            <div className='d-flex flex-column gap-2'>
                <label>Tên đăng nhập</label>
                    <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className='d-flex flex-column gap-2'>
            <label>Họ tên</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='d-flex flex-column gap-2'>
            <label>Mật khẩu</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='d-flex flex-column gap-2'>
                <label>
                    Email
                </label>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type='submit' className='add-acc-btn'>Tạo tài khoản mới</button>
            </form>
        </div>
        </div>
    </div>
  )
}
