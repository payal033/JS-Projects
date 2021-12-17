const balance = document.getElementById('balance')
const incomeEl = document.getElementById('money-plus')
const expenseEl = document.getElementById('money-minus')
const list = document.getElementById('list')
const text = document.getElementById('text')
const amount = document.getElementById('amount')
const incomeBtn = document.getElementById('income-btn')
const expenseBtn = document.getElementById('expense-btn')
// modal
const close = document.getElementById('close');
const modal = document.getElementById("modal");
const updatebtn = document.getElementById("updatebtn"); 
const updatetext = document.getElementById("modaltext");
const updateamount = document.getElementById("modalamount");

const localStorageTransactions = JSON.parse(
        localStorage.getItem("transactions")
      );

let transactions =
        localStorage.getItem("transactions") !== null
          ? localStorageTransactions
          : [];


function checkType(value) {
  if (value === "+" && expenseBtn.classList.contains('selected')) {
    incomeBtn.classList.add("selected");
    expenseBtn.classList.remove("selected");
  } else if (value === "-" && incomeBtn.classList.contains('selected')){
    expenseBtn.classList.add("selected");
    incomeBtn.classList.remove("selected");
  }
}

function addTransaction(e) {
    e.preventDefault()
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add a text and amount')
    }else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: incomeBtn.classList.contains('selected') ? +amount.value : +(amount.value * -1)
        }

        transactions.push(transaction)
        addTransactionsDOM(transaction)
        updateValues()
        updateLocalStorage()
        text.value = ''
        amount.value = ''
    }
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function generateID() {
    return Math.floor(Math.random() * 10000000)
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init()
}

function showModal() {
  modal.classList.add('show-modal')
}

// add transactions to DOM
function addTransactionsDOM(transaction) {
    const sign = transaction.amount > 0 ? '+' : '-';
    const item = document.createElement('li')
    // add class based on value
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus')
    item.innerHTML = `
    <div id="open" onclick="showModal()"><p>${
      transaction.text
    }</p><span>${sign}${Math.abs(transaction.amount)}</span></div>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })"><i class="fa fa-times"></i></button>
    `;
    list.appendChild(item)
}

// update balance, income, expense
function updateValues() {
    const amountsArr = transactions.map(transaction => transaction.amount)
    const total = amountsArr.reduce((acc, item) => (acc += item), 0).toFixed(2)

    const income = amountsArr
                   .filter(item => item > 0)
                   .reduce((acc, item) => (acc += item), 0).toFixed(2)

    const expense = (amountsArr
                    .filter((item) => item < 0)
                    .reduce((acc, item) => (acc += item), 0) * -1)
                    .toFixed(2);

    balance.innerText = `Rs ${total}`
    incomeEl.innerText = `Rs ${income}`
    expenseEl.innerText = `Rs ${expense}`
}

// init 
function init() {
    list.innerHTML = ''
    transactions.forEach(addTransactionsDOM)
    updateValues()
}

init()

form.addEventListener('submit', addTransaction)

close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);