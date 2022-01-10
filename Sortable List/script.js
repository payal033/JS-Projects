const draggable_list = document.getElementById("draggable-list");
const check_btn = document.getElementById("check");

const alphabeticList = [
  "runwalk",
  "playsit",
  "fastslow",
  "happysmile",
  "facearm",
  "lookswim",
  "jumpjog",
  "typewater",
  "friendfamily",
  "standstill",
];

const listItems = [];

let dragStartIndex;

createList()

// insert list items into DOM
function createList() {
    [...alphabeticList]
    .map(a => ({ value: a, sortValue: Math.random() }))
    .sort((a,b) => a.sortValue - b.sortValue)
    .map(a => a.value)
    .forEach((word, index) => {
        const listItem = document.createElement('li')
        listItem.setAttribute('data-index', index)
        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="word">${word}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `
        listItems.push(listItem)
        draggable_list.appendChild(listItem)
    });

    addEventListeners()
}

function dragStart() {

}

function dragDrop() {

}

function dragEnter() {
    this.classList.add('over')

}

function dragLeave() {
    this.classList.remove('over')
}

function dragOver() {

}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}