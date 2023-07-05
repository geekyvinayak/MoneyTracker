import React, { useContext, useEffect, useState } from "react";
import { Link, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import "../assets/navbar.css";
import { MyContext } from "./context/Context";

const Navbar = () => {
  const { logedin, signup, setsignup ,setlogedin,verify} = useContext(MyContext);

  const nav = useNavigate();
  return (
    <div className="container">
      <nav className="navbarcontainer">
        <div className="navbar">
          <ul className="navbarul">
            <li className="navbaritem" onClick={()=>{nav("/")}}>Money Tracker</li>
            <li className="navbaritem">
              {logedin ? (
                <div className="navbaractions">
                  <button
                    onClick={() => {
                      nav("/usersettings");
                    }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      console.log("ha hua click");
                      nav("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="navbaractions">
                  <button
                    onClick={() => {
                      setsignup(!signup);
                    }}
                  >
                    {signup ? "Login" : "Sign Up"}
                  </button>
                </div>
              )}
            </li>
            {logedin ? 
            <li className="responsive-menu">
              <div class="hamburger-menu">
                <div className="appname">Money Tracker</div>
                <input id="menu__toggle" type="checkbox"  />
                <label class="menu__btn" for="menu__toggle">
                  <span></span>
                </label>
                <ul class="menu__box">
                      <li>
                        <Link to="/home">
                          <button className="menu__item" onClick={()=>{(document.getElementById("menu__toggle").checked = false)}}>Home</button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/usersettings">
                          <button className="menu__item" onClick={()=>{(document.getElementById("menu__toggle").checked = false)}}>User Setting </button>
                        </Link>
                      </li>
                      <li>
                        <button className="menu__item"
                          onClick={() => {
                            console.log("ha hua click");
                            localStorage.removeItem("token");
                            nav("/");
                          }}
                        >
                          Logout
                        </button>
                      </li>
                </ul>
              </div>
            </li>
            : <div className="appname">Money Tracker</div>}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;