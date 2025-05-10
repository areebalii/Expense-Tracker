const addIncomeBtnEl = document.querySelector(".addIncomeBtn");
const unhideOnAddIncomeClickEl = document.querySelector(".unhideOnAddIncomeClick");
const addEl = document.querySelector("#add");
const incomeEl = document.querySelector("#income");
const incomeBalanceEl = document.querySelector("#incomeBalance");

const addExpenseBtnEl = document.querySelector(".addExpenseBtn");
const unhideOnAddExpenseClickEl = document.querySelector(".unhideOnAddExpenseClick");
const addExpenseEl = document.querySelector("#addExpense");
let expenseInputEl = document.querySelector("#expense");

let incomeAmount = 0;
let expenseAmount = 0;

localStorage.setItem("incomeAmount", incomeAmount);

addIncomeBtnEl.addEventListener("click", () => {
  unhideOnAddIncomeClickEl.style.display = "flex";
  addIncomeBtnEl.style.display = "none";
});

addEl.addEventListener("click", () => {
  unhideOnAddIncomeClickEl.style.display = "none";
  addIncomeBtnEl.style.display = "flex";
  addBalance();
});

function addBalance() {
  let incomeVal = parseFloat(incomeEl.value);
  if (incomeVal === "" || isNaN(incomeVal)) {
    alert("Please enter a valid number");
    return;
  }
  incomeAmount += incomeVal;
  incomeBalanceEl.innerText = incomeAmount.toFixed(2);
  updateBalance();
  incomeEl.value = "";
}

addExpenseBtnEl.addEventListener("click", () => {
  unhideOnAddExpenseClickEl.style.display = "flex";
  addExpenseBtnEl.style.display = "none";
});

addExpenseEl.addEventListener("click", () => {
  unhideOnAddExpenseClickEl.style.display = "none";
  addExpenseBtnEl.style.display = "flex";
  addExpense();
});

function addExpense() {
  let expenseVal = parseFloat(expenseInputEl.value);
  let categoryEl = document.querySelector("#category").value;
  const expenseListEl = document.querySelector('.expenseList');

  console.log(expenseVal, categoryEl);
  if (expenseVal === "" || isNaN(expenseVal)) {
    alert("Please enter a valid number");
    return;
  }
  const li = document.createElement('li');
  li.setAttribute('data-category', category);
  li.innerHTML = `
  ${expenseVal} - ${categoryEl} 
  <span class="delete">X</span>
`;
localStorage.setItem("li", JSON.stringify(li));
  // Add delete functionality
  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
    updateBalance();
  });
  expenseListEl.appendChild(li);
  expenseAmount += expenseVal;
  console.log(expenseAmount);
  
  updateBalance();
  expenseInputEl.value = "";
}

function updateBalance() {
  incomeBalanceEl.innerText = (incomeAmount - expenseAmount).toFixed(2);
}