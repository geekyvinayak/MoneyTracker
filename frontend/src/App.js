import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Contextprovider from './components/context/Contextprovider';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserSettings from './components/UserSettings';

function App() {
  return (
    <>
      <Router>
        <Contextprovider>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/usersettings" element={<UserSettings />} />

          </Routes>
        </Contextprovider>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
