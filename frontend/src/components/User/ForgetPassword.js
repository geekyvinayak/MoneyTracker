import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "../context/Context";

function ForgetPassword() {
  const { setlogedin, verify, setloading } = useContext(MyContext);
  const { register, handleSubmit } = useForm();
  const [otpSend, setotpSend] = useState(false);
  const Navigate = useNavigate();

  const getotp = async (formdata) => {
    console.log("otp", formdata);
    const email = formdata.email;
    setloading(true);
    let  temphold = await axios.post(process.env.REACT_APP_Backend + "sendotp", {
      email: email,
    });
    setTimeout(()=>{},500)
    let { data } = await axios.post(process.env.REACT_APP_Backend + "sendotp", {
      email: email,
    });
    setloading(false);
    if (data.stat) {
      setotpSend(true);
      toast.info("OTP sent To email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.info("Email Don't registered", {
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
  };

  const onSubmit = async (formdata) => {
    setloading(true);
    let { data } = await axios.post(
      process.env.REACT_APP_Backend + "reset-password",
      { email: formdata.email, password: formdata.password, otp: formdata.otp },
    );
    setloading(false);
    if (data.stat) {
      toast.success("Password reset sucessfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Navigate("/");
    } else {
      toast.error("Wrong OTP", {
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
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verify(token, "/");
    } else {
      setlogedin(false);
    }
  }, []);

  return (
    <div className="login-container">
      <div className="form-container">
        <ul>
          <li key="signup">Forget Password</li>
        </ul>
        <form onSubmit={handleSubmit(getotp)}>
          <div className="form">
            <label htmlFor="email">Enter Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />
          </div>
          {!otpSend ? (
            <div className="form-btn">
              <button>Get Otp</button>
            </div>
          ) : null}
        </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          {otpSend ? (
            <>
              <div className="form">
                <label htmlFor="pin">OTP</label>
                <input
                  type="password"
                  id="pin"
                  placeholder="Enter Otp"
                  {...register("otp", { required: true })}
                />
              </div>
              <div className="form">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter New Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="form-btn">
                <button>Reset Password</button>
              </div>
            </>
          ) : null}
          <div className="form-btn">
            <p>
              <div onClick={() => Navigate("/")}>Login</div>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default ForgetPassword;
