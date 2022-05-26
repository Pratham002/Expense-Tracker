const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransaction = [
//     {id: 1, text: 'Flower', amount: -20},
//     {id: 2, text: 'Salary', amount: 300},
//     {id: 3, text: 'Book', amount: -10},
//     {id: 4, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add Transaction to DOM 
function addTransactionDOM(track) {
    const sign = track.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    // Adding class minus if -ve, else plus
    const itemClass = track.amount < 0 ? 'minus' : 'plus';
    item.classList.add(itemClass);

    // <li class="minus">
    // Cash <span>-$400</span><button class="delete-btn">x</button>
    // </li>

    item.innerHTML = `
        ${track.text} <span>${sign}${Math.abs(track.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${track.id})">x</button>
    `;
    list.appendChild(item);
}

// Removing transaction on clicking the x button
function removeTransaction(ID) {
    transactions = transactions.filter(transaction => transaction.id !== ID);
    updateLocalStorage();
    init();
}

// updating total balance, income, expense
function updateValue() {
    // amount : array of transactions amount
    const amount = transactions.map(transaction => {
        return transaction.amount;
    });

    const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amount
                        .filter(item => item > 0)
                        .reduce((acc, item) => (acc += item), 0)
                        .toFixed(2);
    const expense = total - income;
    
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${Math.abs(expense).toFixed(2)}`;
}

// Generating random IDs for transactions
function generateRandomID() {
    const ID = Math.floor(Math.random() * 10000000);
    return ID;
}

// Creating the transaction when user enters the value..
function createTransaction(event) {
    event.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert("Please add a text and amount");
    }
    else {
        const transaction = {
            id: generateRandomID(),
            text: text.value,
            amount: parseInt(amount.value)
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);

        updateValue();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Storing data to Local Storage 
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', createTransaction);

// Initialize the app
function init() {
    // removing the previous transaction
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValue();
}

init();
// localStorage.clear();

