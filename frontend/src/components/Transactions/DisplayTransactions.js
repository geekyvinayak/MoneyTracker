import React, { useContext } from 'react'
import { MyContext } from '../context/Context';


function DisplayTransactions() {
  const { transactions: transactions} = useContext(MyContext);
  return (
    <div>{transactions?.map((ele)=> <ul><li>{ele.wallet}</li><li>{ele.amount}</li><li>{ele.type}</li></ul> )}</div>
  )
}

export default DisplayTransactions