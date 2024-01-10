import { useState } from "react";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";

import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("0");
  const [transactionType, setTransactionType] = useState("expense");

  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const {balance, income, expense} = transactionTotals
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    e.target.reset();
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h2>Your Balance</h2>
            <h3>{balance>0 ? <p>${balance}</p> : <p>-${balance * -1}</p> }</h3>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expense}</p>
            </div>
          </div>
          <form action="/" className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              required
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              required
              placeholder="Amount"
              onChange={(e) => setTransactionAmount(e.target.value)}
            />

            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>

            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
        <div className="profile">
          <img
            src={profilePhoto}
            alt="profilePhoto"
            className="profile-photo"
          />
          <button className="sign-out-button" onClick={signUserOut}>
            Sign Out
          </button>
        </div>
      </div>
      <div className="transactions">
        <h2>Transactions</h2>
        <ul>
          {transactions.map((t,index) => {
            const { description, transactionAmount, transactionType} = t;
            return (
              <li key={index}>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount}{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
