import React, { useState } from "react";
import App from "../../App";
import { MyContext } from "./Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Contextprovider(props) {
  const [logedin, setlogedin] = useState(false);
  const [getemail, setemail] = useState("");
  const [datetime, setdatetime] = useState();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [monthCycle,setmonthCycle] = useState(0)
  const [monthlyBudget,setbudget] = useState(0)
  const [wallets,setwallets] = useState([])
  const [signup, setsignup] = useState(false);
  const [transactions, settransactions] = useState([]);
  const nav = useNavigate();

  const setdatas = (data) => {
    
    setemail(data.email);
    setfirstName(data.firstName);
    setlastName(data.lastName);
    setmonthCycle(data.monthCycle);
    setbudget(data.monthlyBudget)
    setwallets(data.Wallets)
    settransactions(data.transactions)
  }

  function getCurrentDateTime() {
    const currentDate = new Date();
    
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Note: Months are zero-based, so we add 1 to get the correct month.
    const year = currentDate.getFullYear();
    
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
  
    setdatetime({
      date: date,
      month: month,
      year: year,
      time: `${hours}:${minutes}:${seconds}`
    });
  }

  const verify  = async(token,place) =>{
    
  
    let {data} = await axios.get(process.env.REACT_APP_Backend+"verify",{headers:{"token":token}})
    
    if(data.stat){
        setdatas(data.user);
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
      value={{ logedin, setlogedin, getemail, setemail, signup, setsignup ,verify,firstName,lastName,monthCycle,monthlyBudget,wallets,setwallets,transactions, settransactions,getCurrentDateTime,datetime}}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default Contextprovider;