import axios, { Axios } from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/login.css";
import { MyContext } from "../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const {
    setlogedin,
    signup,
    setsignup,
    verify,
    getCurrentDateTime,
    setloading,
  } = useContext(MyContext);
  //   const [signup,setsignup] = useState(false);

  const nav = useNavigate();
  const { register, handleSubmit } = useForm();

  function getNextMonthDate(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);
    const inputDate = new Date(year, month - 1, day); // Note: Month is 0-based in JavaScript Date constructor

    // Get the date for the next month
    const nextMonth =
      inputDate.getMonth() === 11 ? 0 : inputDate.getMonth() + 1;
    const nextYear =
      inputDate.getMonth() === 11
        ? inputDate.getFullYear() + 1
        : inputDate.getFullYear();

    // Create the next month's date
    const nextMonthDate = new Date(nextYear, nextMonth, day);

    // Format the result in "dd/mm/yyyy" format
    const formattedDate = `${nextMonthDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${(nextMonthDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${nextMonthDate.getFullYear()}`;
    return formattedDate;
  }

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    const firstName = data.firstname;
    const lastName = data.lastname;
    const datelatest = getCurrentDateTime();
    const nextmonth = getNextMonthDate(
      datelatest.date + "/" + datelatest.month + "/" + datelatest.year
    );
    const bag = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      monthCycle: nextmonth,
      monthlyBudget: "0",
    };

    if (signup) {
      setloading(true);
      let { data } = await axios.post(
        process.env.REACT_APP_Backend + "signup",
        bag
      );
      if (data == "already exist") {
        setloading(false);
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
        const from = process.env.REACT_APP_EMAILID;
        const password = process.env.REACT_APP_EMAILPASSWORD;
        const html = `<h3>Hei ${firstName}</h3><br><p>welcome to Money Tracker</p>`;
        const subject = "Welcome to Money-Tracker";
        axios.post(
          "https://emailer-66pb.onrender.com/send",
          {
            password: password,
            from: from,
            to: email,
            html: html,
            subject: subject,
          },
        );

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
        setloading(false);
        setsignup(false);
      }
    } else {
      setloading(true);
      let { data } = await axios.post(
        process.env.REACT_APP_Backend + "login",
        bag
      );
      setloading(false);
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
        localStorage.setItem("token", data.token);
        verify(data.token, "/");
      }
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

  const changesignup = () => {
    setsignup(!signup);
  };
  return (
    <div className="login-container">
      <div className="form-container">
        <ul>
          {signup ? <li key="signup">Signup</li> : <li key="login">Login</li>}
        </ul>

        <form onSubmit={handleSubmit(onSubmit)}>
          {signup ? (
            <>
              {" "}
              <div className="form">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  {...register("firstname", { required: true })}
                />
              </div>
              <div className="form">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  placeholder="Last Name"
                  {...register("lastname", { required: true })}
                />
              </div>
            </>
          ) : (
            ""
          )}
          <div className="form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            {signup ? null : (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => nav("/forgot-password")}
              >
                Forgot Password?
              </div>
            )}
          </div>
          <div className="form-btn">
            <button>Submit</button>
          </div>
          <div className="form-btn">
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
