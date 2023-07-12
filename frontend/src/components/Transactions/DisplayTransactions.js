import React, { useContext } from 'react'
import { MyContext } from '../context/Context';


function DisplayTransactions() {
  const { transactions: transactions ,wallets} = useContext(MyContext);
  return (
    <div>{transactions?.map((ele)=> <ul><li>{wallets[ele.wallet].name}</li><li>{ele.amount}</li><li>{ele.type}</li><li>{ele.description}</li></ul> )}</div>
  )
}

export default DisplayTransactions