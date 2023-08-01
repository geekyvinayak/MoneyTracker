import React, { useContext } from "react";
import { MyContext } from "../context/Context";
import "../../assets/transactiondisplay.css";

function DisplayTransactions() {
  const { transactions: transactions, wallets } = useContext(MyContext);
  return (
    <div className="transactionTablecontainer">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((ele) => (
            <tr>
              <td>{ele.date.date + "/" + ele.date.month}</td>
              <td className={ele.type}>&#8377; {ele.amount}</td>
              <td>{ele.description}</td>
              <td>{wallets[ele.wallet].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTransactions;
