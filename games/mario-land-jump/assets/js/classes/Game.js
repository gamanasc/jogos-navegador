class Game{
    constructor(){
        this.gameOver = false;
    }

    prepare(){
        sessionStorage.setItem("mario_game_over", 'false');
    }

    start(){
        
        setTimeout(function(){

            const loop = setInterval(() => {
                const pipePosition = scenarioElements.pipe.offsetLeft;
                const marioPosition = +window.getComputedStyle(mario.sprite).bottom.replace('px', '');
                const groundPosition = scenarioElements.ground.offsetLeft;

                // GAME OVER
                if(pipePosition <= 70 && pipePosition > 0 && marioPosition < 45){

                    sessionStorage.setItem("mario_game_over", 'true');

                    scenarioElements.pipe.style.animation = 'none';
                    scenarioElements.pipe.style.left = pipePosition+'px';

                    mario.sprite.style.animation = 'none';
                    mario.sprite.style.bottom = marioPosition+'px';
                    mario.sprite.src = 'assets/img/game-over.png';

                    scenarioElements.ground.style.animation = 'none';
                    scenarioElements.ground.style.left = groundPosition+'px';

                    scenarioElements.game_over.style.display = "block";
                    scenarioElements.restart.style.display = "block";

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
    }
}