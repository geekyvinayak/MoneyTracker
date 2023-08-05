import React, { useContext, useEffect } from "react";
import { MyContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import Editableinputs from "./Editableinputs";
import "../../../assets/usersetting.css";
import AddWallet from "./AddWallet";

function UserSettings() {
  const {
    setlogedin,
    getemail,
    lastName,
    firstName,
    verify,
    monthCycle,
    monthlyBudget,
    wallets,
  } = useContext(MyContext);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verify(token);
    } else {
      setlogedin(false);
      nav("/login");
    }
  }, []);

  return (
    <>
      <div className="form-container user-Settings">
        <form>
          <div className="user-SettingsItem">
            <label className="usersettingFields">First Name</label>
            <Editableinputs text={firstName} field={"firstName"} />
          </div>
          <div className="user-SettingsItem">
            <label className="usersettingFields">Last Name</label>
            <Editableinputs text={lastName} field={"lastName"} />
          </div>
          <div className="user-SettingsItem">
            <label className="usersettingFields">Month Cycle</label>
            <Editableinputs text={monthCycle} field={"monthCycle"} />
          </div>
          <div className="user-SettingsItem">
            <label className="usersettingFields">Email</label>
            <label className="usersettingFields">{getemail}</label>
          </div>
        </form>
      </div>
      <div className="form-container wallet">
        <div>
          <h2>Wallets</h2>
          <AddWallet />
        </div>
        <div>
          {wallets.map((ele, index) => {
            return (
              <ul>
                <li key={index}>{ele.name}</li>
                <li>&#8377; {ele.amount}</li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default UserSettings;
