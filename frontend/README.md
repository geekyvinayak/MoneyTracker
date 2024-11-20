# 💰 Money Tracker

**Money Tracker** is a React-based application that helps users manage their finances efficiently. It allows users to track income and expenses across multiple wallets and provides valuable insights through a dynamic dashboard.

---

## ✨ Features

- **🔐 Login/Signup:** Secure user authentication to manage personal finance data.  
- **🧾 Multiple Wallets:** Add and manage multiple wallets for better financial tracking.  
- **📊 Dashboard Insights:**  
  - Track income and expenses with detailed stats.  
  - **Today's Expense:** View your daily spending at a glance.  
  - **Today's Budget:** Automatically calculated based on the total wallet balance, remaining days in the month, and user-defined cycle date.  
- **⏱️ Daily Updates:** Automatic recalculation of today's budget at midnight.

---

## 📖 User Flow  

### 1️⃣ **Login/Signup** 
![Screenshot 2024-11-20 at 11 35 56 AM](https://github.com/user-attachments/assets/d3d63ede-0170-4e82-9de9-9d04f051ceeb)
![Screenshot 2024-11-20 at 11 36 04 AM](https://github.com/user-attachments/assets/86f3646f-ccb6-4537-8e48-6289df7e9e40)

- **Login:** Use your email and password to access your account.  
- **Signup:** Create an account with your email and password.

---

### 2️⃣ **Dashboard**  
![Screenshot 2024-11-20 at 11 32 30 AM](https://github.com/user-attachments/assets/d724e697-cb4e-49b6-af2c-db519e2773aa)


- View all connected wallets.  
- Track financial transactions and key metrics like:  
  - **Today's Expense:** Displays total expenses incurred today.  
  - **Today's Budget:** Shows the maximum amount you can spend today, recalculated daily at midnight.  

---

### 3️⃣ **Add Wallets and Transactions** 

- **Add Wallets:** Create wallets to categorize and track finances effectively.
![Screenshot 2024-11-20 at 11 34 16 AM](https://github.com/user-attachments/assets/d2643c22-6345-4fc7-b10c-4fbad4f2d7da)
![Screenshot 2024-11-20 at 11 34 22 AM](https://github.com/user-attachments/assets/edbe4b6c-d587-48a5-ac95-45b55cf647d0)


- **Log Transactions:** Add income or expense records for each wallet.  
![Screenshot 2024-11-20 at 11 33 50 AM](https://github.com/user-attachments/assets/7d343960-638a-4025-aa67-3f489e0c7003)
![Screenshot 2024-11-20 at 11 39 23 AM](https://github.com/user-attachments/assets/c53e7e97-2434-4219-82f0-00ab25fc297e)

---

## 🛡️ How Budget Calculation Works  

The **Today's Budget** is calculated daily at midnight using the formula:  
`Total Wallet Balance ÷ Days Remaining in the Month`  

- **Cycle Date:** Defined by the user to reset the monthly budget cycle.  
- Automatically ensures users stay within their financial limits.

---

## 🚀 How to Use  

### 1. Login/Signup  
- **Existing Users:** Log in with your credentials.  
- **New Users:** Create an account to start managing your finances.  

### 2. Add Wallets  
- Navigate to the wallets section and create one or more wallets.  

### 3. Log Transactions  
- Add income or expense transactions for each wallet.  

### 4. Monitor Dashboard Stats  
- Access the dashboard to track your daily expense, today's budget, and other financial insights.

---

## 🤝 Contributing  

Want to contribute to Money Tracker? Here's how:  
1. Fork the repository.  
2. Submit a pull request.  
3. Open an issue to propose major changes.

---

## 🖥️ Live Demo  
[Click here to explore Money Tracker](https://moneytracker-sigma.vercel.app/)

---

### 💡 *Track your money, stay in control!*
