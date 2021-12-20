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

// check income / expense type
function checkType(value) {
  if (value === "+" && expenseBtn.classList.contains('selected')) {
    incomeBtn.classList.add("selected");
    expenseBtn.classList.remove("selected");
  } else if (value === "-" && incomeBtn.classList.contains('selected')){
    expenseBtn.classList.add("selected");
    incomeBtn.classList.remove("selected");
  }
}

// add transaction
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

// update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// generate random id for transaction
function generateID() {
    return Math.floor(Math.random() * 10000000)
}

// remove transaction from local storage
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init()
}

var uid = 0;

// to show modal and call respective methods
function showModal(transactionID) {
  modal.classList.add('show-modal')
  showExistingValues(transactionID)
  uid = transactionID
}

// show existing values when clicked for updating
function showExistingValues(id) {
  const transaction = transactions.filter((trans) => trans.id === id)[0]
  // console.log(transaction)
  updatetext.value = transaction.text
  updateamount.value = transaction.amount
  // console.log(transaction.id)
  updatebtn.addEventListener('click', updateTransaction)
}

// update transaction when clicked on update transaction button in modal
function updateTransaction(e) {
      e.preventDefault()
      // console.log(uid)
      const utrans = transactions.filter((trans) => trans.id === uid)[0]
      // console.log(utrans)
      // console.log(typeof updatetext.value, typeof +updateamount.value)
      utrans.text = updatetext.value
      utrans.amount = +updateamount.value
      // console.log(utrans)
      updateLocalStorage()
      init()
      modal.classList.remove('show-modal')
}

// add transactions to DOM
function addTransactionsDOM(transaction) {
    const sign = transaction.amount >= 0 ? '+' : '-';
    const item = document.createElement('li')
    // add class based on value
    item.classList.add(transaction.amount >= 0 ? 'plus' : 'minus')
    item.innerHTML = `
    <div id="open" onclick="showModal(${transaction.id})"><p>${
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

// listener to add values
form.addEventListener('submit', addTransaction)

// listener to close modal when clicked on X
close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// listener to close modal when clicked outside modal
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);