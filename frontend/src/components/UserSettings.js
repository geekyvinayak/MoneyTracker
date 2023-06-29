import React, { useContext, useEffect } from 'react'
import { MyContext } from './context/Context';
import { useNavigate } from 'react-router-dom';
import Editableinputs from './Editableinputs';

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
    <form>
    <div><label>First Name</label>
    <Editableinputs text={firstName} field={"firstName"}/>
    </div> 
    <div><label>Last Name</label>
    <Editableinputs text={lastName} field={"lastName"}/>
    </div>
    <div><label>Month Cycle</label>
    <Editableinputs text={monthCycle} field={"monthCycle"}/>
    </div>

    <div><label>Month Budget</label>
    <Editableinputs text={monthlyBudget} field={"monthlyBudget"}/>
    </div>
    
    <div><label>Email</label>
    <label>{getemail}</label>
    </div> 
    </form>                                                                        
  )
}

export default UserSettings