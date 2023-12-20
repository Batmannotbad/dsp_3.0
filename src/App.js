import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import Test from './Test';
import User from './Pages/User/User';
import DataTable from './Component/DataTable';
import UserList from './Component/UserList';
import ViewChart from './Component/ViewChart';
import PostView from './Pages/PostView/Postv';
import Test2 from './Test2';
import AdminHome from './Pages/AdminHome/AdminHome';
import Error from './Pages/Error/Error';
import AdminUser from './Pages/AdminUserControl/AdminUser';
import AdminPost from './Pages/AdminPostControl/AdminPost';
import AdminAddAccount from './Pages/AdminUserControl/AdminAddAccount';


function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userRole = useSelector(state => state.user.role);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          
          <Route path="/user" element={isLoggedIn ? <User />: <Navigate to ="/login"/>} />
          <Route path="/table" element={<DataTable />} />
          <Route path='/userlist' element={<UserList/>}/>
          {userRole && userRole.role === 'Admin' ? (
            <Route path="/admin/home" element={<AdminHome />} />
            
          ) : (
            <Route path="/admin/home" element={<Navigate to="/error" />} />
          )}
          {userRole && userRole.role === 'Admin' ? (
            <Route path="/admin/user" element={<AdminUser />} />
            
          ) : (
            <Route path="/admin/user" element={<Navigate to="/error" />} />
          )}
          {userRole && userRole.role === 'Admin' ? (
            <Route path="/admin/post" element={<AdminPost />} />
            
          ) : (
            <Route path="/admin/user" element={<Navigate to="/error" />} />
          )}
          {userRole && userRole.role === 'Admin' ? (
            <Route path="/admin/add" element={<AdminAddAccount />} />
            
          ) : (
            <Route path="/admin/user" element={<Navigate to="/error" />} />
          )}


          <Route path='/error' element={<Error/>}/>
          <Route path='/test' element={<Test2/>}/>


          <Route path="/post/:id/:url" element={<PostView/>}  />
          <Route path='/' element={isLoggedIn ? <Dashboard/> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;