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
  const [wallets,setwallets] = useState([])
  const [signup, setsignup] = useState(false);
  const [transactions, settransactions] = useState([]);
  const nav = useNavigate();

  const setdatas = (data) => {
    console.log("set:",data)
    setemail(data.email);
    setfirstName(data.firstName);
    setlastName(data.lastName);
    setmonthCycle(data.monthCycle);
    setbudget(data.monthlyBudget)
    setwallets(data.Wallets)
    settransactions(data.transactions)
  }

  const verify  = async(token,place) =>{
    console.log("place",place)
    console.log(token)
    let {data} = await axios.get(process.env.REACT_APP_Backend+"verify",{headers:{"token":token}})
    console.log('dauser',data.user);
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
      value={{ logedin, setlogedin, getemail, setemail, signup, setsignup ,verify,firstName,lastName,monthCycle,monthlyBudget,wallets,setwallets,transactions, settransactions}}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default Contextprovider;