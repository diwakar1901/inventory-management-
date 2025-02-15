document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let itemName = document.getElementById('item-name').value;
    let itemQuantity = document.getElementById('item-quantity').value;
    let itemPrice = document.getElementById('item-price').value;

    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory.push({ name: itemName, quantity: itemQuantity, price: itemPrice });
    localStorage.setItem('inventory', JSON.stringify(inventory));
    displayInventory();
});

function displayInventory() {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    let inventoryTable = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    inventoryTable.innerHTML = '';
    inventory.forEach(function(item) {
        let row = inventoryTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = item.name;
        cell2.innerHTML = item.quantity;
        cell3.innerHTML = item.price;
    });
}

document.getElementById('download-inventory').addEventListener('click', function() {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    let csvContent = "data:text/csv;charset=utf-8,Item Name,Quantity,Price\n" + 
        inventory.map(e => e.name + "," + e.quantity + "," + e.price).join("\n");
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.addEventListener('DOMContentLoaded', displayInventory);