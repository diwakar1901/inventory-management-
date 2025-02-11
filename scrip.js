https://github.com/diwakar1901/inventory-management-.gitlet inventory = [];
let itemIdCounter = 1;

// Function to add an item
document.getElementById("add-item-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("item-name").value.trim();
  const quantity = parseInt(document.getElementById("item-quantity").value);
  const price = parseFloat(document.getElementById("item-price").value);

  if (!name || isNaN(quantity) || isNaN(price)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const newItem = {
    id: itemIdCounter++,
    name,
    quantity,
    price,
  };

  inventory.push(newItem);
  updateInventoryTable();
  alert(`Item '${name}' added successfully with ID: ${newItem.id}`);
  e.target.reset();
});

// Function to update the inventory table
function updateInventoryTable() {
  const tbody = document.querySelector("#inventory-table tbody");
  tbody.innerHTML = "";

  inventory.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
}

// Function to record a purchase
document.getElementById("purchase-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const itemId = parseInt(document.getElementById("purchase-item-id").value);
  const quantity = parseInt(document.getElementById("purchase-quantity").value);
  const price = parseFloat(document.getElementById("purchase-price").value);

  const item = inventory.find((i) => i.id === itemId);

  if (!item) {
    alert("Invalid item ID.");
    return;
  }

  item.quantity += quantity;
  item.price = price; // Update price if needed

  updateInventoryTable();
  generateInvoice("Purchase", item.name, quantity, price, quantity * price);
  alert("Purchase recorded successfully.");
  e.target.reset();
});

// Function to record a sale
document.getElementById("sale-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const itemId = parseInt(document.getElementById("sale-item-id").value);
  const quantity = parseInt(document.getElementById("sale-quantity").value);

  const item = inventory.find((i) => i.id === itemId);

  if (!item) {
    alert("Invalid item ID.");
    return;
  }

  if (quantity > item.quantity) {
    alert("Insufficient stock.");
    return;
  }

  item.quantity -= quantity;

  updateInventoryTable();
  generateInvoice("Sale", item.name, quantity, item.price, quantity * item.price);
  alert("Sale recorded successfully.");
  e.target.reset();
});

// Function to generate an invoice
function generateInvoice(type, itemName, quantity, pricePerUnit, totalAmount) {
  const timestamp = new Date().toLocaleString();
  const output = `
Transaction Type: ${type}
Timestamp: ${timestamp}
Item Name: ${itemName}
Quantity: ${quantity}
Price Per Unit: $${pricePerUnit.toFixed(2)}
Total Amount: $${totalAmount.toFixed(2)}
  `;

  document.getElementById("invoice-output").textContent = output;
}
