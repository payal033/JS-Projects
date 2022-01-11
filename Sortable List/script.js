const draggable_list = document.getElementById("draggable-list");
const check_btn = document.getElementById("check");

const alphabeticList = [
  "facearm",
  "fastslow",
  "friendfamily",
  "happysmile",
  "jumpjog",
  "lookswim",
  "playsit",
  "runwalk",
  "standstill",
  "typewater",
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
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function dragEnter() {
    this.classList.add('over')
}

function dragLeave() {
    this.classList.remove('over')
}

function dragOver(e) {
  e.preventDefault();
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const word = listItem.querySelector('.draggable').innerText.trim()
        if(word != alphabeticList[index]) {
            listItem.classList.add('wrong')
        }else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
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

check_btn.addEventListener("click", checkOrder);