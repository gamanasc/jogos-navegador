class Mario {

    constructor(){
        this.sprite = document.querySelector('.mario')
    }

    /**
     * FUNÇÃO PULAR
     */
    jump(){
        
        let sprite = this.sprite

        // SÓ ADICIONA A ANIMAÇÃO SE NÃO JÁ FOI ADICIONADA
        if(!sprite.classList.contains('jump')){
            sprite.classList.add('jump');
            sprite.src = 'assets/img/jump.png';
            
            // APÓS 700MS (tempo da animação), VERIFICA SE DEU GAME OVER
            // SE NÃO, VOLTA A ANIMAÇÃO DE CAMINHADA, SE DEU, NÃO FAZ NADA PARA MANTER O SPRITE DE GAME OVER ADICIONADO NO MOMENTO DA COLISÃO
            setTimeout(function(){
    
                let mario_game_over = sessionStorage.getItem("mario_game_over");
                if (mario_game_over === null || mario_game_over != 'true') {
                    sprite.src = 'assets/img/mario_v2.gif';
                }
                
                sprite.classList.remove('jump');
            }, 700)
        }

    }
}