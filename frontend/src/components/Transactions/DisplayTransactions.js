import React, { useContext } from 'react'
import { MyContext } from '../context/Context';
import "../../assets/transactiondisplay.css";

function DisplayTransactions() {
  const { transactions: transactions ,wallets} = useContext(MyContext);
  return (
    <table><th>Description</th><th>Wallet</th><th>Amount</th>{transactions?.map((ele)=> <tr><td>{ele.description}</td><td>{wallets[ele.wallet].name}</td><td className={ele.type}>{ele.amount}</td></tr> )}</table>
  )
}

export default DisplayTransactions