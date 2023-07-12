import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

function Addtransaction() {
  const { setwallets, verify, transactions, settransactions, wallets } =
    useContext(MyContext);
  const [Active, setactive] = useState(false);
  const [usedwallet, setusedwallet] = useState(0);
  const [description, setdescription] = useState("");
  const [amount, setamount] = useState(0);
  const [transactionType, settransactionType] = useState("expense");
  

  function handlewallet(event) {
    console.log(event.target.value)
    setusedwallet(event.target.value);
  }

  function handleamount(event) {
    setamount(event.target.value);
  }

  function handletype(event) {
    console.log(event.target.value)
    settransactionType(event.target.value);
  }
  function handledescription(event) {
    setdescription(event.target.value);
  }

  const saved = async (e) => {
    const token = localStorage.getItem("token");
    const bag = {
      amount: amount,
      wallet: usedwallet,
      type: transactionType,
      description: description,
    };
    let { data } = await axios.post(
      process.env.REACT_APP_Backend + "addtransaction",
      bag,
      { headers: { token: token } }
    );

    console.log("td", data);
    if (data.stat) {
      settransactions(data.transactions);
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
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // verify(token, "/usersettings");
    }
  };
  return (
    <>
      {Active ? (
        <div>
          <ul>
            <li>
              <select name="type" onChange={(e)=>handletype(e)}>
                
              <option value="expense">expense</option>
              <option value="income">income</option>
              </select>
              
            </li>
            <li>
              <input
                type="text"
                onChange={handledescription}
                placeholder="enter description"
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
              <select name="wallet" onChange={handlewallet}>
                {wallets?.map((ele,index) => (
                  <option value={index}>{ele.name}</option>
                ))}
              </select>
            </li>
          </ul>
          <button
            onClick={() => {
              saved();
              setactive(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setactive(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => {setactive(true);}}>Add transaction</button>
      )}

      <div>wallet : {usedwallet}</div>
    </>
  );
}

export default Addtransaction;
