const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const ground = document.querySelector('.ground');
const game_over = document.querySelector('#game-over');
const restart = document.querySelector('#restart');
const prepare = document.querySelector('#prepare');


let high_score = sessionStorage.getItem("mario_high_score");
sessionStorage.setItem("mario_game_over", 'false');

 
if (high_score === null) {
    sessionStorage.setItem("mario_high_score", 0);
    document.getElementById("high_score").innerHTML = 0;
}else{
    document.getElementById("high_score").innerHTML = parseInt(high_score);
}


const jump = () =>{
    // SÓ ADICIONA A ANIMAÇÃO SE NÃO JÁ FOI ADICIONADA
    if(!mario.classList.contains('jump')){
        mario.classList.add('jump');
        mario.src = 'img/jump.png';

        setTimeout(function(){

            let mario_game_over = sessionStorage.getItem("mario_game_over");
            console.log(mario_game_over);
            if (mario_game_over === null || mario_game_over != 'true') {
                mario.src = 'img/mario_v2.gif';
            }
            
            mario.classList.remove('jump');
        }, 700)
    }
}
pipe.style.display = 'none';

let contador = setInterval(function(){
    let currentCount = +prepare.textContent;
    currentCount = currentCount - 1;
    
    if(currentCount >= 1){
        prepare.innerHTML = currentCount;
    }else{
        prepare.innerHTML = 'GO!';
        clearInterval(contador);
        setTimeout(function(){
            prepare.style.display = 'none';
            pipe.style.display = 'block';
        }, 2000);
    }
}, 1000);

setTimeout(function(){

    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const groundPosition = ground.offsetLeft;

        // GAME OVER
        if(pipePosition <= 70 && pipePosition > 0 && marioPosition < 45){

            sessionStorage.setItem("mario_game_over", 'true');

            pipe.style.animation = 'none';
            pipe.style.left = pipePosition+'px';

            mario.style.animation = 'none';
            mario.style.bottom = marioPosition+'px';
            mario.src = 'img/game-over.png';

            ground.style.animation = 'none';
            ground.style.left = groundPosition+'px';

            game_over.style.display = "block";
            restart.style.display = "block";

            // SCORE
            let current_score = parseInt(sessionStorage.getItem("mario_score"));
            let high_score = parseInt(sessionStorage.getItem("mario_high_score"));
            let new_high_score = document.getElementById("new_high_score");
            
            if(current_score > high_score){
                sessionStorage.setItem("mario_high_score", current_score);
                document.getElementById("high_score").innerHTML = current_score;

                new_high_score.style.display = 'block';
            }

        clearInterval(loop);
        

            sessionStorage.setItem("mario_score", 0);

            document.addEventListener("keydown", function(event) {
                location.reload()
            });

        }else{

            // INCREMENTAR SCORE
            let current_score = sessionStorage.getItem("mario_score");

            if (current_score === null) {
                sessionStorage.setItem("mario_score", 1);
            }else{
                sessionStorage.setItem("mario_score", parseInt(current_score) + 1);
            }

            let upd_current_score = parseInt(sessionStorage.getItem("mario_score"));

            document.getElementById("score").innerHTML = upd_current_score;

        }

    }, 10);

}, 5000);


document.addEventListener('keydown', jump);