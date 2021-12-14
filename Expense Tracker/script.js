const balance = document.getElementById('balance')
const incomeEl = document.getElementById('money-plus')
const expenseEl = document.getElementById('money-minus')
const list = document.getElementById('list')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

function addTransaction(e) {
    e.preventDefault()
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add a text and amount')
    }else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
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

// add transactions to 
function addTransactionsDOM(transaction) {
    // get sign
    const sign = transaction.amount > 0 ? '+' : '-';
    const item = document.createElement('li')
    // add class based on value
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus')
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `
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