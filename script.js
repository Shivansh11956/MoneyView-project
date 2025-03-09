const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const add = document.getElementById('add-transaction');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const totalincome = amounts.filter(a => a > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const totalexpense = (amounts.filter(a => a < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

  balance.textContent = `$${total}`;
  income.textContent = `$${totalincome}`;
  expense.textContent = `$${totalexpense}`;
}

function addDOM(transaction) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${transaction.date}</td>
    <td>${transaction.text}</td>
    <td class="amount ${transaction.amount < 0 ? 'expense' : ''}">$${transaction.amount.toFixed(2)}</td>
    <td><button onclick="remove(${transaction.id})">X</button></td>
  `;
  list.appendChild(tr);
}

function remove(id) {
  transactions = transactions.filter(t => t.id !== id);
  updatelocal();
  updateui();
}

function updateui() {
  list.innerHTML = '';
  transactions.forEach(addDOM);
  updateValues();
}

function updatelocal() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

add.addEventListener('click', () => {
  const textValue = text.value.trim();
  const amtval = parseFloat(amount.value);

  if (!textValue || isNaN(amtval)) {
    alert('Please enter valid description and amount.');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: textValue,
    amount: amtval,
    date: new Date().toISOString().split('T')[0],
  };

  transactions.push(transaction);
  updatelocal();
  updateui();
  text.value = '';
  amount.value = '';
});

function init() {
  updateui();
}

init();