import React, { useContext } from 'react'
import { MyContext } from '../context/Context';
import "../../assets/transactiondisplay.css";

function DisplayTransactions() {
  const { transactions: transactions ,wallets} = useContext(MyContext);
  return (
    <div className="transactionTablecontainer"><table><thead><th>Date</th><th>Amount</th><th>Description</th><th>Wallet</th></thead>{transactions?.map((ele)=> <tr><td>{ele.date}</td><td className={ele.type}>{ele.amount}</td><td>{ele.description}</td><td>{wallets[ele.wallet].name}</td></tr> )}</table></div>
  )
}

export default DisplayTransactions