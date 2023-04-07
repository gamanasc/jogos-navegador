// CANVAS
let blockSize = 15;
let rows = 30;
let cols = 30;
let board;
let context;

// CABEÇA
let snakeHeadX = blockSize * 5;
let snakeHeadY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// COMIDA
let foodX;
let foodY;

// BORDAS
let borderWidth = 2.5;   
let offset = borderWidth * 2;

let gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");   

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); // 100 milisegundos

    let high_score = localStorage.getItem("snake_high_score");
 
    if (high_score === null) {
        localStorage.setItem("snake_high_score", 0);
        document.getElementById("high_score").innerHTML = 0;
    }else{
        document.getElementById("high_score").innerHTML = parseInt(high_score);
    }

}

function update(){

    if(gameOver){

        let current_score = parseInt(localStorage.getItem("snake_score"));
        let high_score = parseInt(localStorage.getItem("snake_high_score"));
        let new_high_score = document.getElementById("new_high_score");
        let restart_btn = document.getElementById("restart");
        let enter_tip = document.getElementById("enter_tip");

        if(current_score > high_score){
            localStorage.setItem("snake_high_score", current_score);
            document.getElementById("high_score").innerHTML = current_score;

            new_high_score.style.display = 'block';
        }
        
        restart_btn.style.display = 'block';
        enter_tip.style.display = 'block';
        
        localStorage.setItem("snake_score", 0);

        // ===============

        board = document.getElementById("board");
        board.height = rows * blockSize;
        board.width = cols * blockSize;
        context = board.getContext("2d");   
        context.clearRect(0, 0, board.width, board.height);

        context.font = "bold  30px Courier New";
        context.textAlign = "center";
        context.fillText("GAME OVER", board.width/2, board.height/2);

        // ==============


        // Execute a function when the user presses a key on the keyboard
        document.addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            location.reload()
            }
        });


        return;
    }

    // CANVAS
    context.fillStyle="#778a7a";
    context.fillRect(0, 0, board.width, board.height);

    // COMIDA

    context.fillStyle = "#627769";
    context.fillRect(foodX - borderWidth, foodY - borderWidth, blockSize + offset, blockSize + offset);
    context.fillStyle = "#4c5e52";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeHeadX == foodX && snakeHeadY == foodY){

        let current_score = parseInt(localStorage.getItem("snake_score"));

        if (current_score === null) {
            localStorage.setItem("snake_score", parsetInt(1));
        }else{
            localStorage.setItem("snake_score", parseInt(current_score + 1));
        }

        let upd_current_score = parseInt(localStorage.getItem("snake_score"));


        document.getElementById("score").innerHTML = upd_current_score;

        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeHeadX, snakeHeadY];
    }

    context.fillStyle = "#627769";
    
    snakeHeadX += velocityX * blockSize;
    snakeHeadY += velocityY * blockSize;
    context.fillRect(snakeHeadX - borderWidth, snakeHeadY - borderWidth, blockSize + offset, blockSize + offset);
    context.fillStyle = "#27302a";

    context.fillRect(snakeHeadX, snakeHeadY, blockSize, blockSize);

    for(const element of snakeBody){
        context.fillStyle = "#627769";
        context.fillRect(element[0] - borderWidth, element[1] - borderWidth, blockSize + offset, blockSize + offset);
        context.fillStyle = "#27302a";
        context.fillRect(element[0], element[1], blockSize, blockSize);
    }

    // CONDIÇÕES DE GAME OVER

    // PAREDES
    if(snakeHeadX < 0 || snakeHeadX >= cols*blockSize || snakeHeadY < 0 || snakeHeadY >= rows*blockSize ){
        gameOver = true;
    }

    // BATER EM SI MESMO
    for (const element of snakeBody) {
        
        if(snakeHeadX == element[0] && snakeHeadY == element[1]){
            gameOver = true;
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