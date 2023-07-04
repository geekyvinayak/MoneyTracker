import React, { useContext, useEffect } from 'react'
import { MyContext } from './context/Context';
import { useNavigate } from 'react-router-dom';
import Editableinputs from './Editableinputs';
import "../assets/usersetting.css";

function UserSettings() {
    const { setlogedin, getemail, lastName, firstName,verify,monthCycle ,monthlyBudget} = useContext(MyContext);
    const  nav=useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token){
            verify(token);
        }
        else{
            setlogedin(false);
            nav("/login")
        }
      }, [])


  return (
    <div className='form-container user-Settings'>
    <form>
    <div className='user-SettingsItem'><label>First Name</label>
    <Editableinputs text={firstName} field={"firstName"}/>
    </div>
    <div className='user-SettingsItem'><label>Last Name</label>
    <Editableinputs text={lastName} field={"lastName"}/>
    </div>
    <div className='user-SettingsItem'><label>Month Cycle</label>
    <Editableinputs text={monthCycle} field={"monthCycle"}/>
    </div>

    <div className='user-SettingsItem'><label>Month Budget</label>
    <Editableinputs text={monthlyBudget} field={"monthlyBudget"}/>
    </div>
    
    <div className='user-SettingsItem'><label>Email</label>
    <label>{getemail}</label>
    </div> 
    </form>                   
    </div>                                                     
  )
}

export default UserSettings