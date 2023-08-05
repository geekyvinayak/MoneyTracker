import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

function Addtransaction() {
  const {
    setwallets,
    verify,
    transactions,
    settransactions,
    wallets,
    getCurrentDateTime,
    datetime,
    setdailyexpense,
    setloading,
  } = useContext(MyContext);
  const [Active, setactive] = useState(false);
  const [usedwallet, setusedwallet] = useState(0);
  const [description, setdescription] = useState("");
  const [amount, setamount] = useState(0);
  const [transactionType, settransactionType] = useState("expense");

  function handlewallet(event) {
    setusedwallet(event.target.value);
  }

  function handleamount(event) {
    setamount(event.target.value);
  }

  function handletype(event) {
    settransactionType(event.target.value);
  }
  function handledescription(event) {
    setdescription(event.target.value);
  }

  const saved = async (e) => {
    if (description !== "" && amount !== 0) {
      const token = localStorage.getItem("token");
      const datetime = await getCurrentDateTime();
      // const transactiondate = datetime.date +'/'+ datetime.month;
      const bag = {
        amount: amount,
        wallet: usedwallet,
        type: transactionType,
        description: description,
        date: datetime,
      };
      setloading(true);
      let { data } = await axios.post(
        process.env.REACT_APP_Backend + "addtransaction",
        bag,
        { headers: { token: token } },
      );
      setloading(false);
      if (data.stat) {
        settransactions(data.transactions);
        setdailyexpense(data.dailyexpense);
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
      }
      setactive(false);
    } else {
      toast.error("fields can be empty", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setactive(true);
    }
  };
  return (
    <>
      {Active ? (
        <div className="testtt">
          <li key="typeoftransaction">
            <select name="type" onChange={(e) => handletype(e)}>
              <option value="expense">expense</option>
              <option value="income">income</option>
            </select>
          </li>
          <li key="transactiondescription">
            <input
              type="text"
              onChange={handledescription}
              placeholder="enter description"
            />
          </li>
          <li key="transactionamount">
            <input
              type="text"
              inputmode="numeric"
              onChange={handleamount}
              placeholder="enter transaction amount"
            />
          </li>
          <li key="walletused">
            <select name="wallet" onChange={handlewallet}>
              {wallets?.map((ele, index) => (
                <option value={index}>{ele.name}</option>
              ))}
            </select>
          </li>

          <button
            onClick={() => {
              saved();
            }}
          >
            Save
          </button>
          <button onClick={() => setactive(false)}>Cancel</button>
        </div>
      ) : (
        <button
          className="testtt"
          onClick={() => {
            setactive(true);
          }}
        >
          Add transaction
        </button>
      )}
    </>
  );
}

export default Addtransaction;
