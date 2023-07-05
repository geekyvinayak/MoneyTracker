import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

function AddWallet() {
  const [Active, setactive] = useState(false);
  const [name, setname] = useState("");
  const [amount, setamount] = useState(0);
  const { setwallets , verify} = useContext(MyContext);
  function handlename(event) {
    setname(event.target.value)
  }

  function handleamount(event) {
    setamount(event.target.value)
  }

  const saved = async(e) =>{
    const token = localStorage.getItem("token") 

    let {data} = await axios.get(process.env.REACT_APP_Backend+"addwallet",{headers:{"token":token,"walletname":name,"amount":amount}})
    
    if(data.stat){
        setwallets(data.wallets)
        toast.success("Wallet added!", {
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
                onChange={handlename}
                placeholder="enter wallet name"
              />
            </li>
            <li>
              <input
                type="text"
                onChange={handleamount}
                placeholder="enter initial amount"
              />
            </li>
          </ul>
          <button onClick={() => {saved();setactive(false)}}>Save</button>
          <button onClick={() => setactive(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setactive(true)}>Add wallets</button>
      )}
    </>
  );
}

export default AddWallet;
