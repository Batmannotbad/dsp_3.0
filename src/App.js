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


function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/test" element={<Test />} />
          <Route path="/user" element={<User />} />
          <Route path="/table" element={<DataTable />} />
          <Route path='/userlist' element={<UserList/>}/>
          <Route path='/viewchart' element={<ViewChart/>}/>
          <Route path='/test2' element={<Test2/>}/>

          <Route path="/post/:url" element={<PostView/>} exact />
          <Route path='/' element={isLoggedIn ? <Dashboard/> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;