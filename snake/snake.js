// CANVAS
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// CABEÇA
var snakeHeadX = blockSize * 5;
var snakeHeadY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// COMIDA
var foodX;
var foodY;

var gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");   

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); // 100 milisegundos
}

function update(){

    if(gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="yellow";
    context.fillStyle="b";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeHeadX == foodX && snakeHeadY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeHeadX, snakeHeadY];
    }

    context.fillStyle = "lime";
    snakeHeadX += velocityX * blockSize;
    snakeHeadY += velocityY * blockSize;
    context.fillRect(snakeHeadX, snakeHeadY, blockSize, blockSize);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // CONDIÇÕES DE GAME OVER

    // PAREDES
    if(snakeHeadX < 0 || snakeHeadX > cols*blockSize || snakeHeadY < 0 || snakeHeadY > rows*blockSize ){
        gameOver = true;
        alert("Game over!");
        location.reload()
    }

    // BATER EM SI MESMO
    for (let i = 0; i < snakeBody.length; i++) {
        
        if(snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]){
            gameOver = true;
            alert("Game over!");
            location.reload()
        }
        
    }

}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = +1;
    }else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityY = 0;
        velocityX = -1;
    }else if(e.code == "ArrowRight" && velocityX != -1){
        velocityY = 0;
        velocityX = +1;
    }
}