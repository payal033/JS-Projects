// get elements
const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// Function to show error message
function showError(inputEle, message) {
    const formControl = inputEle.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

// Function to check whether email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value)){
        showSuccess(input)
    }else {
        showError(input, 'Email is not valid')
    }
}

// function to show success
function showSuccess(inputEle) {
    const formControl = inputEle.parentElement;
    formControl.className = "form-control success";
}

// function to get input Field name
function getFieldName(inputEle) {
    return inputEle.id.charAt(0).toUpperCase() + inputEle.id.slice(1)
}

// function to make sure all fields are filled 
function checkRequired(inputArr) {
    inputArr.forEach(function(inputEle) {
        if(inputEle.value.trim() === '') {
            showError(inputEle, `${getFieldName(inputEle)} is required`)
        }else {
            showSuccess(inputEle)
        }
    })
}

// function to check length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`)
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    }else {
        showSuccess(input)
    }
}

// function to check whether passwords match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault()
    checkRequired([username, email, password, confirmPassword])
    checkLength(username, 3, 15)
    checkLength(password, 8, 20)
    checkEmail(email)
    checkPasswordMatch(password, confirmPassword)
})