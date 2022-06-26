// Using Prototypes

// constructor

function Book (name,author,type) {
    this.name = name
    this.author = author
    this.type = type
}

// display constructor
function Display() {

}

// Add methods to display prototype
Display.prototype.add = function(book) {
    tableBody = document.getElementById('tableBody')
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
    tableBody.innerHTML += uiString
}

// Clear function implementation
Display.prototype.clear = function() {
    let libraryForm = document.getElementById("libraryform")
    libraryForm.reset()
}

// validate function implementation
Display.prototype.validate = function(book) {
    if(book.name.length < 2 || book.author.length < 2){
        return false
    }
    else{
        return true
    }
}

Display.prototype.show = function(type,msg) {
    let message = document.getElementById('message')
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>Message: </strong>${msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
     </button>
    </div>`

    setTimeout(function() {
        message.innerHTML = ""
    }, 2000)
}

// Add submit event listener to form
let libraryForm = document.getElementById("libraryform")
libraryForm.addEventListener('submit' , libraryFormSubmit)

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value
    let author = document.getElementById('author').value

    let fiction = document.getElementById('fiction')
    let programming = document.getElementById('programming')
    let nonFictional = document.getElementById('nonFictional')

    let type 

    if(fiction.checked) {
        type = fiction.value
    }else if (programming.checked){
        type = programming.value
    }else if (nonFictional.checked) {
        type = nonFictional.value
    }

    let book = new Book (name, author , type)
    // console.log(book)

    let display = new Display();
    if (display.validate(book)) {
        display.add(book)
        display.clear()
        display.show('success' , 'Your book has been added successfully!')
    }else {
        display.show('danger' , 'Sorry you cannot add this book. Make sure you have filled all the fields')
    }
      
    e.preventDefault()
}