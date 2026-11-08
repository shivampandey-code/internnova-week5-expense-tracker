// SpendWise Expense Tracker — InternNova Week 5
const STORAGE_KEY = "spendwise_transactions_v1";

const form = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const editIdInput = document.getElementById("editId");
const transactionList = document.getElementById("transactionList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const sortOrder = document.getElementById("sortOrder");
const formError = document.getElementById("formError");
const toast = document.getElementById("toast");

let transactions = loadTransactions();

function loadTransactions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.error("Could not read saved transactions:", error);
    return [];
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 2
  }).format(value);
}

function formatDate(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function updateSummary() {
  const income = transactions
    .filter(item => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);
  const expenses = transactions
    .filter(item => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthExpenses = transactions
    .filter(item => {
      const date = new Date(item.date + "T00:00:00");
      return item.type === "expense" &&
        date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((total, item) => total + item.amount, 0);

  document.getElementById("balanceValue").textContent = formatCurrency(income - expenses);
  document.getElementById("incomeValue").textContent = formatCurrency(income);
  document.getElementById("expenseValue").textContent = formatCurrency(expenses);
  document.getElementById("monthValue").textContent = formatCurrency(monthExpenses);
  document.getElementById("monthCaption").textContent =
    now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function getVisibleTransactions() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedType = filterType.value;

  let result = transactions.filter(item => {
    const matchesText = item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    const matchesType = selectedType === "all" || item.type === selectedType;
    return matchesText && matchesType;
  });

  // Sort the filtered array without changing the original data.
  result = [...result];
  switch (sortOrder.value) {
    case "oldest":
      result.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case "high":
      result.sort((a, b) => b.amount - a.amount);
      break;
    case "low":
      result.sort((a, b) => a.amount - b.amount);
      break;
    default:
      result.sort((a, b) => b.date.localeCompare(a.date));
  }
  return result;
}

function renderTransactions() {
  const visible = getVisibleTransactions();
  transactionList.innerHTML = "";

  visible.forEach(item => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    const nameWrap = document.createElement("div");
    nameWrap.className = "transaction-name";
    const icon = document.createElement("span");
    icon.className = `transaction-icon ${item.type}`;
    icon.textContent = item.type === "income" ? "↗" : "↘";
    const name = document.createElement("span");
    name.textContent = item.description;
    nameWrap.append(icon, name);
    nameCell.append(nameWrap);

    const categoryCell = document.createElement("td");
    const tag = document.createElement("span");
    tag.className = "category-tag";
    tag.textContent = item.category;
    categoryCell.append(tag);

    const dateCell = document.createElement("td");
    dateCell.textContent = formatDate(item.date);

    const amountCell = document.createElement("td");
    amountCell.className = `amount ${item.type === "income" ? "positive" : "negative"}`;
    amountCell.textContent = `${item.type === "income" ? "+" : "−"}${formatCurrency(item.amount)}`;

    const actionCell = document.createElement("td");
    const actions = document.createElement("div");
    actions.className = "action-group";
    const editButton = document.createElement("button");
    editButton.className = "icon-btn";
    editButton.type = "button";
    editButton.textContent = "✎";
    editButton.title = "Edit transaction";
    editButton.setAttribute("aria-label", `Edit ${item.description}`);
    editButton.addEventListener("click", () => startEdit(item.id));
    const deleteButton = document.createElement("button");
    deleteButton.className = "icon-btn delete";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.title = "Delete transaction";
    deleteButton.setAttribute("aria-label", `Delete ${item.description}`);
    deleteButton.addEventListener("click", () => deleteTransaction(item.id));
    actions.append(editButton, deleteButton);
    actionCell.append(actions);

    row.append(nameCell, categoryCell, dateCell, amountCell, actionCell);
    transactionList.append(row);
  });

  emptyState.classList.toggle("show", visible.length === 0);
  document.getElementById("transactionCount").textContent =
    `${transactions.length} ${transactions.length === 1 ? "record" : "records"}`;
  document.getElementById("resultsText").textContent =
    `Showing ${visible.length} of ${transactions.length} transactions`;
}

function resetForm() {
  form.reset();
  editIdInput.value = "";
  dateInput.value = new Date().toISOString().slice(0, 10);
  document.getElementById("formTitle").textContent = "Add a transaction";
  document.getElementById("submitBtn").innerHTML = "＋ Save transaction";
  document.getElementById("cancelEditBtn").classList.add("hidden");
  formError.textContent = "";
}

function startEdit(id) {
  const item = transactions.find(transaction => transaction.id === id);
  if (!item) return;
  editIdInput.value = item.id;
  descriptionInput.value = item.description;
  amountInput.value = item.amount;
  typeInput.value = item.type;
  categoryInput.value = item.category;
  dateInput.value = item.date;
  document.getElementById("formTitle").textContent = "Edit transaction";
  document.getElementById("submitBtn").textContent = "Save changes";
  document.getElementById("cancelEditBtn").classList.remove("hidden");
  document.getElementById("entryPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  descriptionInput.focus();
}

function deleteTransaction(id) {
  const item = transactions.find(transaction => transaction.id === id);
  if (!item) return;
  if (!window.confirm(`Delete "${item.description}"?`)) return;
  transactions = transactions.filter(transaction => transaction.id !== id);
  saveTransactions();
  renderAll();
  showToast("Transaction deleted.");
}

function renderAll() {
  updateSummary();
  renderTransactions();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (!description) {
    formError.textContent = "Please enter a description.";
    descriptionInput.focus();
    return;
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    formError.textContent = "Enter an amount greater than zero.";
    amountInput.focus();
    return;
  }
  if (!date) {
    formError.textContent = "Please select a date.";
    dateInput.focus();
    return;
  }

  const existingId = editIdInput.value;
  const transaction = {
    id: existingId || (window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    description,
    amount: Math.round(amount * 100) / 100,
    type: typeInput.value,
    category: categoryInput.value,
    date
  };

  if (existingId) {
    transactions = transactions.map(item => item.id === existingId ? transaction : item);
    showToast("Transaction updated.");
  } else {
    transactions.push(transaction);
    showToast("Transaction added.");
  }

  saveTransactions();
  resetForm();
  renderAll();
});

document.getElementById("cancelEditBtn").addEventListener("click", resetForm);
document.getElementById("topAddBtn").addEventListener("click", () => {
  document.getElementById("entryPanel").scrollIntoView({ behavior: "smooth", block: "start" });
  descriptionInput.focus();
});
searchInput.addEventListener("input", renderTransactions);
filterType.addEventListener("change", renderTransactions);
sortOrder.addEventListener("change", renderTransactions);

document.getElementById("clearAllBtn").addEventListener("click", () => {
  if (transactions.length === 0) {
    showToast("There is no data to clear.");
    return;
  }
  if (!window.confirm("This will permanently remove all transactions saved in this browser. Continue?")) return;
  transactions = [];
  saveTransactions();
  resetForm();
  renderAll();
  showToast("All transactions cleared.");
});

// Initial page setup
document.getElementById("todayDate").textContent =
  new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
dateInput.value = new Date().toISOString().slice(0, 10);
renderAll();
