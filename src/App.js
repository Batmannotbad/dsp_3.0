import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import Test from './Test';


function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/test" element={<Test />} />
          <Route path='/' element={isLoggedIn ? <Dashboard/> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;