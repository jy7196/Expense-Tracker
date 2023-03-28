var tabledata = [];

//Display budget amount and populate/display previous table entries
window.onload = function () {
  var table = document.getElementById("expenses");
  for (var i = 1, row; (row = table.rows[i]); i++) {
    tabledata.push({
      expense: row.cells[0].innerHTML,
      cost: row.cells[1].innerHTML,
    });
  }
  document.getElementById("data").value = JSON.stringify(tabledata);
  document.getElementById("budgetinput").value = Number(
    document.getElementById("budget").innerHTML.slice(1)
  ).toFixed(2);
};

//Display budget input
function displayInput() {
  document.getElementById("setbudget").className = "hide";
  document.getElementById("cancelbudget").className = "show";
  document.getElementById("budget").className = "hide";
  var input = document.getElementById("budgetinput");
  input.className = "show";
  input.focus();
  input.select();
}

//Set new budget amount
function processBudgetInput() {
  document.getElementById("budgetinput").className = "show";
  let budget = Number(document.getElementById("budgetinput").value).toFixed(2);
  if (isNaN(budget) || budget < 0) {
    document.getElementById("error").innerHTML = "Please enter a valid amount.";
    document.getElementById("cancelbudget").className = "show";
  } else {
    document.getElementById("budget").innerHTML =
      "$" + Number(budget).toFixed(2).toString();
    document.getElementById("error").innerHTML = "";
    document.getElementById("setbudget").className = "show";
    document.getElementById("budgetinput").className = "hide";
    document.getElementById("budget").className = "show";
  }
}
document.getElementById("setbudget").addEventListener("click", displayInput);
document.getElementById("budgetinput").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.getElementById("cancelbudget").className = "hide";
    processBudgetInput();
  }
});

//Remove entry from table, adjust and display new balance
function removeExpense(e) {
  let budget = document.getElementById("budget").innerHTML;
  budget = budget.slice(1);
  const row = e.parentNode.parentNode;
  cell0 = row.cells[0].innerHTML;
  cell1 = row.cells[1].innerHTML;
  temp = { expense: cell0, cost: cell1 };
  var index = 0;
  for (let i = 0; i < tabledata.length; i++) {
    if (
      temp.expense == tabledata[i].expense &&
      temp.cost == tabledata[i].cost
    ) {
      index = i;
    }
  }
  budget = Number(budget);
  cell1 = Number(cell1)
  tabledata.splice(index, 1);
  document.getElementById("data").value = JSON.stringify(tabledata);
  document.getElementById("budget").innerHTML =
    "$" + (budget - cell1).toFixed(2).toString();
  document.getElementById("budgetinput").value = (Number(budget - cell1)).toFixed(2);
  return e.parentNode.parentNode.remove();
}

//Add item and cost entry to table, adjust and display new balance
function addExpenseItem() {
  var type = document.getElementById("type").value;
  const name = document.getElementById("expensename").value;
  var cost = Number(document.getElementById("expensecost").value).toFixed(2);
  if (isNaN(cost) || cost < 0 || name === "") {
    document.getElementById("expenseerror").className = "show";
  } else {
    document.getElementById("expenseerror").className = "hide";
    const table = document.getElementById("expenses");
    const row = table.insertRow(1);
    cell1 = row.insertCell(0);
    cell2 = row.insertCell(1);
    cell3 = row.insertCell(2);
    cost = -cost;
    if (type === "income") {
      cost = -cost;
    }
    cell1.innerHTML = name;
    cell2.innerHTML = Number(cost).toFixed(2);
    if (cost > 0) {
      cell2.style.color = "green";
      cell2.style.fontSize = "1em";
      cell2.style.backgroundColor = "rgb(203 205 220)";
    }
    if (cost < 0) {
      cell2.style.color = "red";
      cell2.style.fontSize = "1em";
      cell2.style.backgroundColor = "rgb(167 171 196)";
    }
    cell3.innerHTML =
      '<button id = "removebutton" type="button" onclick="removeExpense(this)">X</button>';
    tabledata.push({ expense: name, cost: cost.toFixed(2) });
    document.getElementById("data").value = JSON.stringify(tabledata);
    cost = -cost;
    let budget = Number(document.getElementById("budget").innerHTML.slice(1)).toFixed(2);
    document.getElementById("budget").innerHTML =
      "$" + (budget - cost).toFixed(2).toString();
    document.getElementById("budgetinput").value = (budget - cost).toFixed(2);
  }
}

//Add expense item using button
document.getElementById("addexpense").addEventListener("click", (e) => {
  e.preventDefault();
  addExpenseItem();
});
//Add expense item
document.getElementById("expensecost").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addExpenseItem();
  }
});

//Add expense item
document.getElementById("expensename").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addExpenseItem();
  }
});

//Hide expense entry input
document.getElementById("cancelexpense").addEventListener("click", (e) => {
  document.getElementById("showexpenseinput").className = "show";
  document.getElementById("expensename").className = "hide";
  document.getElementById("expensecost").className = "hide";
  document.getElementById("expenseerror").className = "hide";
  document.getElementById("type").className = "hide";
  document.getElementById("cancelexpense").className = "hide";
  document.getElementById("addexpense").className = "hide";
});

//Display expense input
document.getElementById("showexpenseinput").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("showexpenseinput").className = "hide";
  document.getElementById("type").className = "show";
  document.getElementById("expensename").className = "show";
  document.getElementById("addexpense").className = "show";
  document.getElementById("expensecost").className = "show";
  document.getElementById("cancelexpense").className = "show";
});

//Cancel budget entry
document.getElementById("cancelbudget").addEventListener("click", (e) => {
  e.preventDefault();
  var prevBudget = Number(document.getElementById("budget").innerHTML.slice(1));
  document.getElementById("cancelbudget").className = "hide";
  document.getElementById("setbudget").className = "show";
  document.getElementById("error").innerHTML = "";
  document.getElementById("budget").className = "show";
  document.getElementById("budgetinput").value = prevBudget;
  document.getElementById("budgetinput").className = "hide";
});
