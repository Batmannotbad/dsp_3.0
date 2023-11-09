import React, { useState } from 'react'
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../APIController';

const Signup = () => {
  const [username,setUsername]= useState('');
  const [password, setPassword] = useState('');
  const [rePass,setRePass] = useState('');
  // const [fullname,setfullname] = useState('');
  // const [img,setImg] = useState('');
  // const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup (username,password,rePass);
      console.log(data);
      navigate('/');
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className='login'>
      <div className='web-title justify-content-center d-flex'>
        <h1 className=''>DSP</h1>
      </div>
      <div className='web-name-contain mt-1 d-flex justify-content-center'>
        <h3 className='web-name px-2 pb-2 pt-1'>Nền tảng chia sẻ dữ liệu quốc gia</h3>
      </div>
      <div className='outsider px-3 pb-2'>
        <div className='form-container container d-flex align-items-center flex-column pt-3 mt-2 rounded'>
            <div className='d-flex align-items-center flex-column'>
            <h1 className='page-title signup-title'>ĐĂNG KÝ</h1>
            </div>
            <form className='login-form w-100 px-3 py-2 d-flex flex-column' onSubmit={handleFormSubmit}>
              <div className="mb-2">
                <label htmlFor="username" className="form-label signup-label-form">Tên đăng nhập</label>
                <input 
                  type="text" 
                  className="form-control signup-control formplaceholder" 
                  id="username" 
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                   />
              </div>
              {/* <div className="mb-2">
                <label htmlFor="fullname" className="form-label signup-label-form">Họ và tên</label>
                <input 
                  type="text" 
                  className="form-control signup-control formplaceholder" 
                  id="name" 
                  placeholder="Nhập họ tên"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}/>
              </div> */}
              <div className="mb-2">
                <label htmlFor="password" className="form-label signup-label-form">Mật khẩu</label>
                <input 
                  type="password"
                  className="form-control signup-control formplaceholder" 
                  id="password"
                  placeholder='Nhập mật khẩu'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  />
              </div>
              <div className="mb-2 last-form-control">
                <label htmlFor="confirm-password" className="form-label signup-label-form">Xác nhận mật khẩu</label>
                <input 
                  type="password"
                  className="form-control signup-control formplaceholder"
                  id="confirm-password"
                  placeholder='Xác nhận mật khẩu'
                  value={rePass}
                  onChange={(e) => setRePass(e.target.value)}
                   />
              </div>
              
              
              <div className='d-flex align-items-center justify-content-center submit-container'>
                <button type="submit" className="submit-btn mx-4 mb-2">ĐĂNG KÝ</button>
              </div>
              <div className='direct d-flex gap-2 justify-content-center'>
                <span >Bạn đã có tài khoản?</span>
                <a href="/login" className='direct-link'>Đăng nhập</a>
              </div>
            </form>
            <div className='angle-pattern'>
              <img src="/img/lotus1.png" alt="deco png"/>
            </div>
        </div>
      </div>
      <div className='footer'>
        <p className='m-0'>Sản phẩm được phát triển bởi Hehehe và Ngọc Anh XD</p>
      </div>
    </div>
  )
}

export default Signup