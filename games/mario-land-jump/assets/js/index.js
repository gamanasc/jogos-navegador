const mario = new Mario(); // MARIO
const score = new Score(); // PONTUAÇÃO
score.startScore();



const pipe = document.querySelector('.pipe');
const ground = document.querySelector('.ground');
const game_over = document.querySelector('#game-over');
const restart = document.querySelector('#restart');
const prepare = document.querySelector('#prepare');

sessionStorage.setItem("mario_game_over", 'false');

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
        const marioPosition = +window.getComputedStyle(mario.sprite).bottom.replace('px', '');
        const groundPosition = ground.offsetLeft;

        // GAME OVER
        if(pipePosition <= 70 && pipePosition > 0 && marioPosition < 45){

            sessionStorage.setItem("mario_game_over", 'true');

            pipe.style.animation = 'none';
            pipe.style.left = pipePosition+'px';

            mario.sprite.style.animation = 'none';
            mario.sprite.style.bottom = marioPosition+'px';
            mario.sprite.src = 'assets/img/game-over.png';

            ground.style.animation = 'none';
            ground.style.left = groundPosition+'px';

            game_over.style.display = "block";
            restart.style.display = "block";

            // SALVAR SCORE FINAL
            score.endScore();

            clearInterval(loop);

            document.addEventListener("keydown", function(event) {
                location.reload()
            });

        }else{
            // INCREMENTAR SCORE
            score.incrementScore();
        }

    }, 10);

}, 5000);


document.addEventListener('keydown', e => mario.jump(), true);