import React, { useContext, useEffect } from 'react'
import { MyContext } from './context/Context';
import { useNavigate } from 'react-router-dom';
import Addtransaction from './Transactions/Addtransaction';
import DisplayTransactions from './Transactions/DisplayTransactions';

function Home() {
    const { setlogedin, firstName, lastName,verify , dailyBudget,dailyexpense} = useContext(MyContext);
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

  return (<>
    <div>Welcome, {firstName + " "+ lastName + "Your today budget is  " + dailyBudget } <br></br>{"your todays expense is "+dailyexpense} </div>
    <div className='transactioncomponentsconainer'>
    <Addtransaction />
    <DisplayTransactions />
    </div>
    </>
  )
}

export default Home