import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

function Addtransaction() {
  const [Active, setactive] = useState(false);
  const [usedwallet, setusedwallet] = useState("");
  const [amount, setamount] = useState(0);
  const [transactionType, settransactionType] = useState(0);
  const { setwallets , verify,transactions, settransactions} = useContext(MyContext);
  
  function handlewallet(event) {
    setusedwallet(event.target.value)
  }

  function handleamount(event) {
    setamount(event.target.value)
  }

  function handletype(event) {
    settransactionType(event.target.value)
  }
  

  const saved = async(e) =>{
    const token = localStorage.getItem("token") 
    const bag={amount:amount,wallet:usedwallet,type:transactionType};
    let {data} = await axios.post(process.env.REACT_APP_Backend+"addtransaction",bag,{headers:{"token":token}})
    

    console.log("td",data)
    if(data.stat){
      settransactions(data.transactions)
        toast.success("Transaction added!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }
    else{
        toast.error("Something Went wrong!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          verify(token,"/usersettings")
    }
  }
  return (
    <>
      {Active ? (
        <div>
          <ul>
            <li>
              <input
                type="text"
                onChange={handletype}
                placeholder="enter wallet name"
              />
            </li>
            <li>
              <input
                type="text"
                onChange={handleamount}
                placeholder="enter transaction amount"
              />
            </li>
            <li>
              <input
                type="text"
                onChange={handlewallet}
                placeholder="enter wallet name"
              />
            </li>
          </ul>
          <button onClick={() => {saved();setactive(false)}}>Save</button>
          <button onClick={() => setactive(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setactive(true)}>Add transaction</button>
      )}
    </>
  );
}

export default Addtransaction;