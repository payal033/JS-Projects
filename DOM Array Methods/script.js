const main = document.getElementById('main')
const user = document.getElementById('add-user')
const double = document.getElementById('double')
const millionaire = document.getElementById('millionaire')
const richest = document.getElementById('richest')
const total = document.getElementById('total-wealth')

let data = []

// method to generate random user and money
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json()
    const user = data.results[0]
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser)
}

function addData(obj) {
    data.push(obj)
    updateDOM()
}

function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = "<h2><strong>Person Name</strong> Wealth</h2>";
    providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    });
}

// format number as money
function formatMoney(number) {
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })
    updateDOM()
}

function sortByRichest() {
    data = data.sort((a,b) => b.money - a.money)
    updateDOM()
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000 )
    updateDOM()
}

function calculateTotal() {
    const wealth = data.reduce((acc, user) => acc += user.money , 0)
    const weathEl = document.createElement('div')
    weathEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
      wealth
    )}</strong></h3>`;
    main.appendChild(weathEl)
    
}

// Event listeners
user.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
millionaire.addEventListener('click', showMillionaires)
richest.addEventListener('click', sortByRichest)
total.addEventListener('click', calculateTotal)