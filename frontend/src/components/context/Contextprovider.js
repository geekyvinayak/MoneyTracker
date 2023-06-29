import React, { useState } from "react";
import App from "../../App";
import { MyContext } from "./Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Contextprovider(props) {
  const [logedin, setlogedin] = useState(false);
  const [getemail, setemail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [monthCycle,setmonthCycle] = useState(0)
  const [monthlyBudget,setbudget] = useState(0)
  const [signup, setsignup] = useState(false);
  const nav = useNavigate();

  const setdatas = (data) => {
    setemail(data.email);
    setfirstName(localStorage.getItem("firstName"));
    setlastName(localStorage.getItem("lastName"));
    setmonthCycle(localStorage.getItem("monthCycle"));
    setbudget(localStorage.getItem("monthlyBudget"))
  }

console.log();
  const verify  = async(token,place) =>{
    console.log("place",place)
    console.log(token)
    let {data} = await axios.get(process.env.REACT_APP_Backend+"verify",{headers:{"token":token}})
    console.log('da',data.decode);
    if(data.stat){
        setdatas(data.decode);
        setlogedin(true);
        nav(place)
    }
    else{
        localStorage.removeItem('token');
        setlogedin(false);
        nav('/login')
        setemail('');
    }
  }


  return (
    <MyContext.Provider
      value={{ logedin, setlogedin, getemail, setemail, signup, setsignup ,verify,firstName,lastName,monthCycle,monthlyBudget: monthlyBudget}}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default Contextprovider;