import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Contextprovider from "./components/context/Contextprovider";
import { ToastContainer } from "react-toastify";
import Home from "./components/RootComponents/Home";
import Login from "./components/User/Login";
import Navbar from "./components/RootComponents/Navbar";
import UserSettings from "./components/User/Usersettings/UserSettings";
import Loading from "./components/RootComponents/Loading";
import ForgetPassword from "./components/User/ForgetPassword";

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
            <Route path="/forgot-password" element={<ForgetPassword />} />
          </Routes>
          <Loading />
        </Contextprovider>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
