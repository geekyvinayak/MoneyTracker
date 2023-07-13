import axios, { Axios } from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "../assets/login.css";
import { MyContext } from "./context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const { setlogedin, signup, setsignup,verify } = useContext(MyContext);
  //   const [signup,setsignup] = useState(false);

  const nav = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const firstName = data.firstname;
    const lastName = data.lastname
    const bag = { email: email, password: password,firstName:firstName,lastName:lastName,monthCycle:"1",monthlyBudget:"0" };
    
    if (signup) {
      let { data } = await axios.post(
        process.env.REACT_APP_Backend + "signup",
        bag
      );
      if (data == "already exist") {
        toast.error("User already Exists!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (data == "created") {
        toast.success("Signup sucessfully Please Login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setsignup(false);
      }
      
    } else {
      let { data } = await axios.post(
        process.env.REACT_APP_Backend + "login",
        bag
      );
      if (data === "notfound") {
        toast.error("User not Exists! Please signupp", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (data.stat === "fail") {
        toast.warning("Wrong Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      if (data.stat === "sucess") {
        localStorage.setItem("token",data.token)
        // localStorage.setItem("firstName",data.userdata.firstName)
        // localStorage.setItem("lastName",data.userdata.lastName)
        // localStorage.setItem("monthCycle",data.userdata.monthCycle)
        // localStorage.setItem("monthlyBudget",data.userdata.monthlyBudget)
        verify(data.token,"/")
      }
      
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token){
        verify(token,"/");
    }
    else{
        setlogedin(false);
    }
  }, [])

  const changesignup = () => {
    setsignup(!signup);
  };
  return (
    <div class="login-container">
      <div class="form-container">
        <ul>{signup ? <li>Signup</li> : <li>Login</li>}</ul>

        <form onSubmit={handleSubmit(onSubmit)}>
        {signup?<> <div class="form">
            <label for="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter Email"
              {...register("firstname",{required:true})}
            />
          </div>
          <div class="form">
          <label for="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter Email"
            {...register("lastname",{required:true})}
          />
        </div></>:""}
          <div class="form">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              {...register("email",{required:true})}
            />
          </div>
          <div class="form">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              {...register("password",{required:true})}
            />
          </div>
          <div class="form-btn">
            <button>Submit</button>
          </div>
          <div class="form-btn">
            <p>
              {signup ? (
                <div onClick={changesignup}>Login</div>
              ) : (
                <div onClick={changesignup}>Sign-up</div>
              )}
            </p>
          </div>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Login;
