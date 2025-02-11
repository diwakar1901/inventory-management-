let inventory = [];
let invoices = [];

document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);
    const itemPrice = parseFloat(document.getElementById('item-price').value);

    const item = {
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice
    };

    inventory.push(item);
    updateInventoryTable();
    this.reset();
});

document.getElementById('purchase-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemName = document.getElementById('purchase-item-name').value;
    const itemQuantity = parseInt(document.getElementById('purchase-item-quantity').value);
    const itemPrice = parseFloat(document.getElementById('purchase-item-price').value);

    const item = inventory.find(i => i.name === itemName);

    if (item) {
        item.quantity += itemQuantity;
        item.price = itemPrice;
    } else {
        inventory.push({
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice
        });
    }

    generateInvoice('Purchase', itemName, itemQuantity, itemPrice);
    updateInventoryTable();
    this.reset();
});

document.getElementById('sell-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemName = document.getElementById('sell-item-name').value;
    const itemQuantity = parseInt(document.getElementById('sell-item-quantity').value);

    const item = inventory.find(i => i.name === itemName);

    if (item && item.quantity >= itemQuantity) {
        item.quantity -= itemQuantity;
        generateInvoice('Sale', itemName, itemQuantity, item.price);
    } else {
        alert('Item not available or insufficient quantity!');
    }

    updateInventoryTable();
    this.reset();
});

function updateInventoryTable() {
    const inventoryTableBody = document.querySelector('#inventory-table tbody');
    inventoryTableBody.innerHTML = '';

    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

function generateInvoice(type, itemName, itemQuantity, itemPrice) {
    const invoice = {
        type: type,
        item: itemName,
        quantity: itemQuantity,
        price: itemPrice,
        total: (itemQuantity * itemPrice).toFixed(2),
        date: new Date().toLocaleString()
    };

    invoices.push(invoice);
    updateInvoices();
}

function updateInvoices() {
    const invoicesContainer = document.getElementById('invoices');
    invoicesContainer.innerHTML = '';

    invoices.forEach(invoice => {
        const invoiceDiv = document.createElement('div');
        invoiceDiv.classList.add('invoice');
        invoiceDiv.innerHTML = `
            <p><strong>${invoice.type} Invoice</strong></p>
            <p>Item: ${invoice.item}</p>
            <p>Quantity: ${invoice.quantity}</p>
            <p>Price: $${invoice.price.toFixed(2)}</p>
            <p>Total: $${invoice.total}</p>
            <p>Date: ${invoice.date}</p>
            <hr>
        `;
        invoicesContainer.appendChild(invoiceDiv);
    });
}
