var numberOfSquare = 6
var colors = generateRandomColors(numberOfSquare)
var pickedcolor = pickColor();
var squares = document.querySelectorAll(".square")
var colorDisplay = document.getElementById("colorDisplay")
var messageDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1")
var resetButton = document.querySelector("#reset")
var easyButton = document.querySelector("#easyBtn")
var hardButton = document.querySelector("#hardBtn")

colorDisplay.textContent = pickedcolor


easyButton.addEventListener("click",function(){
    hardButton.classList.remove("selected")
    easyButton.classList.add("selected")
    numberOfSquare = 3
    colors = generateRandomColors(numberOfSquare)
    pickedcolor = pickColor()
    colorDisplay.textContent = pickedcolor
    for(var i=0;i<squares.length;i++){
        if(colors[i]){
            squares[i].style.background = colors[i]
        }else{
            squares[i].style.display = "none";
        }
    }

});

hardButton.addEventListener("click",function(){
    hardButton.classList.add("selected")
    easyButton.classList.remove("selected")
    numberOfSquare = 6
    colors = generateRandomColors(numberOfSquare)
    pickedcolor = pickColor()
    colorDisplay.textContent = pickedcolor
    for(var i=0;i<squares.length;i++){
            squares[i].style.background = colors[i]
            squares[i].style.display = "block";
        }
});



resetButton.addEventListener("click",function(){
    //generate all new color
    colors = generateRandomColors(numberOfSquare)
    //pick a new random color from array
    pickedcolor = pickColor()
    //change color display
    colorDisplay.textContent = pickedcolor
    this.textContent = "New Colors"
    messageDisplay.textContent = ""
    //change colors of squares
    for(var i = 0;i<squares.length;i++){
        squares[i].style.background = colors[i]
    }
    h1.style.background = "steelblue"
});

for(var i =0;i<squares.length;i++){
    //add initial colors to sqaures
    squares[i].style.background = colors[i]
    //add click listener to sqaures
    squares[i].addEventListener("click",function(){
        //grab color of clicked sqaure
        var clickedcolor = this.style.background
        //compare color to picked color
        if(clickedcolor === pickedcolor){
            messageDisplay.textContent = "Correct"
            changeColors(clickedcolor)
            h1.style.background = clickedcolor
            resetButton.textContent = "Play Again?"
        }else{
            this.style.background = "#232323"
            messageDisplay.textContent = "Try Again"
        }
    });
}

function changeColors(color){
    //loop through all squares
    for(var i = 0; i< squares.length;i++){
        squares[i].style.background = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length)
    return colors[random]
}

function generateRandomColors(num){
    //make an array
    var arr = []
    //add num random colors to arr
    for (var i=0;i<num;i++){
        //get random color and push in array
       arr.push(randomColor()) 
    }
    //return array
    return arr
}

function randomColor(){
    //pick a red from 0 to 255
    var r = Math.floor(Math.random() * 256)
    //pick a blue from 0 to 255
    var g = Math.floor(Math.random() * 256)
    //pick a green from 0 to 255
    var b = Math.floor(Math.random() * 256)

    return "rgb(" + r + ", " + g + ", " + b + ")"
}