import React, { useContext, useEffect } from 'react'
import { MyContext } from './context/Context';
import { useNavigate } from 'react-router-dom';

function Home() {
    const { setlogedin, firstName, lastName,verify } = useContext(MyContext);
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
    <div>Welcome, {firstName + " "+ lastName} </div>
  )
}

export default Home