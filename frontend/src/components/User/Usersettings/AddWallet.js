import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/Context";
import axios from "axios";
import { toast } from "react-toastify";

function AddWallet() {
  const [Active, setactive] = useState(false);
  const [name, setname] = useState("");
  const [amount, setamount] = useState(0);
  const { setwallets, verify, setloading } = useContext(MyContext);
  function handlename(event) {
    setname(event.target.value);
  }

  function handleamount(event) {
    setamount(event.target.value);
  }

  const saved = async (e) => {
    const token = localStorage.getItem("token");
    if (name != "" && name != null && amount >= 1) {
      setloading(true);
      let { data } = await axios.get(
        process.env.REACT_APP_Backend + "addwallet",
        { headers: { token: token, walletname: name, amount: amount } },
      );
      setloading(false);
      setactive(false);
      if (data.stat) {
        setwallets(data.wallets);
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
      } else {
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
        verify(token, "/usersettings");
      }
    } else {
      toast.error("Invalid Values!", {
        position: "top-right",
        autoClose: 5000,
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
        <div className="textfieldcontainer">
          <div className="walletbox">
            <input
              type="text"
              onChange={handlename}
              placeholder="enter wallet name"
            />

            <input
              type="text"
              inputmode="numeric"
              onChange={handleamount}
              placeholder="enter initial amount"
            />
          </div>
          <div className="buttoncontainer">
            <button
              className="addWalletButton"
              onClick={() => {
                saved();
              }}
            >
              Save
            </button>
            <button
              className="addWalletButton"
              onClick={() => setactive(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setactive(true)} className="addWalletButton">
          Add wallets
        </button>
      )}
    </>
  );
}

export default AddWallet;
