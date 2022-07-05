// ----------Variables----------

// DOM
const container = document.querySelector(".container");
let btn;
let backlogBtn;
let inProgressBtn;
let completeBtn;
let onHoldBtn;


// Columns' name
const columns = ["backlog", "in-progress", "complete", "on-hold"];

// Lists
let backlogList;
let inProgressList;
let completeList;
let onHoldList;
let itemsLists;

// Load Columns
function loadColumns() {
    const columnsHeader = ["Backlog", "In Progress", "Complete", "On Hold"];
    columns.forEach((name, index) => {
        const column = document.createElement("div");
        column.className = `${name}-column`;
        container.appendChild(column);
        
        const header = document.createElement("div");
        header.className = `${name}-header`;
        const columnName = document.createElement("h3");
        columnName.innerText = `${columnsHeader[index]}`;
        column.appendChild(header);
        header.appendChild(columnName);
        
        const body = document.createElement("div");
        body.className = `${name}-body`;
        const list = document.createElement("ul");
        list.id = `${name}-list`;
        list.classList.add(`${index}`);
        list.setAttribute("number", `${index}`);
        list.setAttribute("ondrop", "drop(event)");
        list.setAttribute("ondragover", "allowDrop(event)");
        list.setAttribute("ondragenter", `dragEnter(${index})`);
        column.appendChild(body);
        body.appendChild(list);
        
        const buttons = document.createElement("div");
        buttons.className = `${name}-buttons`;
        const btnContainer = document.createElement("section");
        btnContainer.className = "add-btn";
        const addBtn = document.createElement("p");
        addBtn.innerText = "+ Add Item";
        addBtn.id = `${columns[index]}-btn`;
        column.appendChild(buttons);
        buttons.appendChild(btnContainer);
        btnContainer.appendChild(addBtn);

        backlogList = document.querySelector("#backlog-list");
        inProgressList = document.querySelector("#in-progress-list");
        completeList = document.querySelector("#complete-list");
        onHoldList = document.querySelector("#on-hold-list");

        backlogBtn = document.getElementById("backlog-btn");
        inProgressBtn = document.getElementById("in-progress-btn");
        completeBtn = document.getElementById("complete-btn");
        onHoldBtn = document.getElementById("on-hold-btn");

        itemsLists = [backlogList, inProgressList, completeList, onHoldList];
    })
}

loadColumns();



// Default Items
let backlogListDetail = {
    column: backlogList,
    items: ["Release the course", "Sit back and relax"]
}
let inProgressListDetail = {
    column: inProgressList,
    items: ["Work on projects", "Listen to music"]
}
let completeListDetail = {
    column: completeList,
    items: ["Being cool", "Getting stuff done"]
}
let onHoldListDetail = {
    column: onHoldList,
    items: ["Being uncool"]
}

// Lists' name
const lists = [backlogListDetail, inProgressListDetail, completeListDetail, onHoldListDetail];


// Get List Items from Local Storage
function getDataFromLocalStorage() {
    const backLog = JSON.parse(localStorage.getItem("backLog"));
    const inProgress = JSON.parse(localStorage.getItem("inProgress"));
    const complete = JSON.parse(localStorage.getItem("complete"));
    const onHold = JSON.parse(localStorage.getItem("onHold"));
    
    backlogListDetail.items = backLog.items;
    inProgressListDetail.items = inProgress.items;
    completeListDetail.items = complete.items;
    onHoldListDetail.items = onHold.items;
}

// Save to Local Storage
function saveToLocalStorage() {
    localStorage.setItem("backLog", JSON.stringify(backlogListDetail));
    localStorage.setItem("inProgress", JSON.stringify(inProgressListDetail));
    localStorage.setItem("complete", JSON.stringify(completeListDetail));
    localStorage.setItem("onHold", JSON.stringify(onHoldListDetail));
}

// ----------------------------------------
if (localStorage.getItem("backLog")) {
    getDataFromLocalStorage();
} else {
    saveToLocalStorage();
}

// Add Items to Columns
function loadItems() {
    lists.forEach((list, index) => {
        const column = list.column;
        listItems = list.items;
        listItems.forEach(listItem => {
            const item = document.createElement("li");
            item.innerText = listItem;
            item.className = `${columns[index]}-item`;
            item.draggable = "true";
            item.setAttribute("ondragstart", "drag(event)");
            column.appendChild(item);
        });
    })
}
loadItems();

// ------------------Add New Item------------------

function showItemInput(parent) {
    const itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.className = "item-input";
    itemInput.style.display = "block";
    parent.appendChild(itemInput);
    itemInput.focus();
}

function saveButton(parent, column, button, list, items) {
    const btn = document.createElement("p");
    btn.innerText = "+ Save Item";
    parent.appendChild(btn);

    btn.addEventListener("click", () => {
        const itemInput = document.querySelector(".item-input");
        if (itemInput.value) {
            saveItem(itemInput, column, list, items);
        } else {
            // Hide Save Button
            document.querySelector(".item-input").remove();
        }
        btn.remove();
        button.style.display = "flex";
    })
}

function saveItem(itemInput, column, list, items) {
    newItem = itemInput.value;

    const item = document.createElement("li");
    item.innerText = newItem;
    item.className = `${column}-item`;
    item.draggable = "true";
    item.setAttribute("ondragstart", "drag(event)");
   
    // Save to list
    list.appendChild(item);
    
    // Save to LocalStorage
    items.push(newItem);
    saveToLocalStorage();

    // Hide Save Button
    document.querySelector(".item-input").remove();
}





const buttons = [backlogBtn, inProgressBtn, completeBtn, onHoldBtn];

buttons.forEach((btn, index) => {
    btnHandler(btn, index)
})


function btnHandler(btn, index) {
    btn.addEventListener("click", () => {
        // Show Input
        const column = btn.parentElement.parentElement.parentElement;
        showItemInput(column);

        // Save Item
        btn.style.display = "none";
        saveButton(btn.parentElement, column, btn, itemsLists[index], lists[index].items)
    })
}

// ------------------------Drag & Drop------------------------

let draggedItem;
let dragSource;
let dragIndex;
let formerIndex;
let dragList;


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    draggedItem = ev.target;
    dragSource = Number(ev.path[1].className);
    dragList = lists[dragSource].items;
    console.log(dragList);
}

function dragEnter(index) {
    dragIndex = index;
    itemsLists.map(list => list.classList.remove("over"));
    itemsLists[dragIndex].classList.add("over")
}

function drop(ev) {
    ev.preventDefault();
    ev.target.appendChild(draggedItem);
    // ev.target.classList.remove("over");
    itemsLists.map(list => list.classList.remove("over"));

    // Add to New List
    lists[dragIndex].items.push(draggedItem.innerText);
    
    // Delete from Former List
    dragList.splice(dragList.indexOf(draggedItem.innerText), 1)

    // Save All
    saveToLocalStorage();
}