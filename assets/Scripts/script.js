// ----------Variables----------

// DOM
const container = document.querySelector(".container")

// Columns' name
const columns = ["backlog", "in-progress", "complete", "on-hold"];

// Lists
let backlogList;
let inProgressList;
let completeList;
let onHoldList;

// Load Columns
function loadColumns() {
    const columnsHeader = ["Backlog", "In Progress", "Complete", "On Hold"];
    columns.forEach((name, index) => {
        const column = document.createElement("div");
        column.className = `${name}-column`;
        container.appendChild(column)

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
        list.classList.add("drag-column");
        list.classList.add("over");
        column.appendChild(body);
        body.appendChild(list);
        
        const buttons = document.createElement("div");
        buttons.className = `${name}-buttons`;
        const btnContainer = document.createElement("section");
        btnContainer.className = "add-btn";
        const addBtn = document.createElement("p");
        addBtn.innerText = "+ Add Item";
        column.appendChild(buttons);
        buttons.appendChild(btnContainer);
        btnContainer.appendChild(addBtn);

        backlogList = document.querySelector("#backlog-list");
        inProgressList = document.querySelector("#in-progress-list");
        completeList = document.querySelector("#complete-list");
        onHoldList = document.querySelector("#on-hold-list");
        console.log(inProgressList)
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
// saveToLocalStorage();

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
            column.appendChild(item);
        });
    })
}
loadItems();

