const addIncomeBtnEl = document.querySelector(".addIncomeBtn");
const unhideOnAddIncomeClickEl = document.querySelector(".unhideOnAddIncomeClick");
const addEl = document.querySelector("#add");
const incomeEl = document.querySelector("#income");
const incomeBalanceEl = document.querySelector("#incomeBalance");

const addExpenseBtnEl = document.querySelector(".addExpenseBtn");
const unhideOnAddExpenseClickEl = document.querySelector(".unhideOnAddExpenseClick");
const addExpenseEl = document.querySelector("#addExpense");
const expenseInputEl = document.querySelector("#expense");
const categorySelectEl = document.querySelector("#category");
const expenseListEl = document.querySelector(".expenseList");

let incomeAmount = 0;
let expenseAmount = 0;
let expenses = [];

addIncomeBtnEl.addEventListener("click", () => {
  unhideOnAddIncomeClickEl.style.display = "flex";
  addIncomeBtnEl.style.display = "none";
});

addEl.addEventListener("click", () => {
  const incomeVal = parseFloat(incomeEl.value);
  if (isNaN(incomeVal) || incomeVal <= 0) {
    alert("Please enter a valid income amount");
    return;
  }

  incomeAmount += incomeVal;
  localStorage.setItem("incomeAmount", incomeAmount);
  updateBalance();

  incomeEl.value = "";
  unhideOnAddIncomeClickEl.style.display = "none";
  addIncomeBtnEl.style.display = "inline-block";
});

addExpenseBtnEl.addEventListener("click", () => {
  unhideOnAddExpenseClickEl.style.display = "flex";
  addExpenseBtnEl.style.display = "none";
});

addExpenseEl.addEventListener("click", () => {
  const amount = parseFloat(expenseInputEl.value);
  const category = categorySelectEl.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid expense amount");
    return;
  }

  const expense = { amount, category, id: Date.now() };
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenseItem(expense);

  expenseAmount += amount;
  updateBalance();

  expenseInputEl.value = "";
  unhideOnAddExpenseClickEl.style.display = "none";
  addExpenseBtnEl.style.display = "inline-block";
});

function renderExpenseItem(expense) {
  const li = document.createElement("li");
  li.innerHTML = `${expense.amount} - ${expense.category} <span class="delete">X</span>`;

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    expenses = expenses.filter((e) => e.id !== expense.id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    expenseAmount -= expense.amount;
    updateBalance();
  });

  expenseListEl.appendChild(li);
}

function updateBalance() {
  const balance = incomeAmount - expenseAmount;
  incomeBalanceEl.innerText = balance.toFixed(2);
}

function onAppLoad() {
  incomeAmount = parseFloat(localStorage.getItem("incomeAmount")) || 0;
  expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenseAmount = expenses.reduce((total, e) => total + e.amount, 0);
  expenses.forEach(renderExpenseItem);
  updateBalance();
}

onAppLoad();