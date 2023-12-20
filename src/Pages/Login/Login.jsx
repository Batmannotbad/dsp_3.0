import React, { useEffect } from 'react';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginByToken } from '../../APIController';
import { login } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [username,setUsername]= useState('');
  const [password, setPassword] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [message,setMessage] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      setIsUsernameValid(false);
      setUsernameErrorMessage('Tên đăng nhập không được để trống');
      return;
    } else {
      setIsUsernameValid(true);
      setUsernameErrorMessage('');
    }
  
    if (password.trim() === '') {
      setIsPasswordValid(false);
      setPasswordErrorMessage('Mật khẩu không được để trống');
      return;
    } else {
      setIsPasswordValid(true);
      setPasswordErrorMessage('');
    }
    try {
      const token = await loginByToken(username, password);
      console.log(token);
      dispatch(login(token));
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Thông tin đăng nhập không chính xác');
      } else {
        console.error('Error:', error);
      }
    }
  };
  return (
    <div className='login'>
      <div className='web-title justify-content-center d-flex'>
        <h1 className=''>DSP</h1>
      </div>
      <div className='web-name-contain mt-1 d-flex justify-content-center'>
        <h3 className='web-name px-2 pb-2 pt-1'>Trag chia sẻ dữ liệu nội bộ</h3>
      </div>
      <div className='outsider px-3 pb-2'>
        <div className='form-container container d-flex align-items-center flex-column pt-3 mt-2 rounded'>
            <div className='border-btm d-flex align-items-center flex-column'>
            <h1 className='page-title'>ĐĂNG NHẬP</h1>
            <div className=''>
              {/* <button className='googleLoginBtn d-flex justify-conent-between align-items-center gap-2 py-2 px-4 mb-4'>
                <img src="/img/logogg.png" alt="google-logo"/>
                <span className='gg-text'>Đăng nhập với Google</span>
              </button> */}
            </div>
            </div>
            <form className='login-form w-100 px-3 py-2 d-flex flex-column' onSubmit={handleFormSubmit}>
              <div className="mb-2 pt-4">
                <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                <input 
                  type="text"
                  className={`form-control formplaceholder ${!isUsernameValid ? 'is-invalid' : ''}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập" />
                  {!isUsernameValid && <div className="invalid-feedback">{usernameErrorMessage}</div>}
              </div>
              <div className="mb-2 pt-4">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input 
                  type="password"
                  className={`form-control formplaceholder ${!isPasswordValid ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Nhập mật khẩu' 
                  />
              </div>
              {/* <div className="mb-2 pt-2">
                <div className="form-check form-switch d-flex align-items-center gap-2">
                  <input className="form-check-input" type="checkbox" id="rememberPasswordCheck" />
                  <label className="form-check-label check-label" htmlFor="rememberPasswordCheck">Nhớ mật khẩu</label>
                  {!isPasswordValid && <div className="invalid-feedback">{passwordErrorMessage}</div>}
                </div>
              </div> */}
              
              {/* <div className="mb-1 text-end">
                <a href="/forgot-password" className='forgot-pass-text me-4'>Quên mật khẩu?</a>
              </div> */}
              <div className='d-flex align-items-center justify-content-center submit-container pt-5'>
                <button type="submit" className="submit-btn mx-4 mb-2">ĐĂNG NHẬP</button>
              </div>
              {/* <div className='direct d-flex gap-2 justify-content-center'>
                <span >Bạn chưa có tài khoản?</span>
                <a href="/signup" className='direct-link'>Đăng ký ngay</a>
              </div> */}
            </form>
            <div className='angle-pattern'>
              <img src="/img/lotus1.png" alt="deco png"/>
            </div>
        </div>
      </div>
      {/* <div className='footer'>
        <p className='m-0'>Sản phẩm được phát triển bởi Hehehe và Ngọc Anh XD</p>
      </div> */}
    </div>
  )
}

export default Login