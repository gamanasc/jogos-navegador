class Score{

    constructor(){
        // SESSION STORAGES
        this.high_score = sessionStorage.getItem("mario_high_score");
        this.current_score = sessionStorage.getItem("mario_score");

        // ELEMENTS
        this.score_text = document.getElementById("score");
        this.high_score_text = document.getElementById("high_score");
        this.new_high_score_text = document.getElementById("new_high_score");
    }

    /** INICIAR O SCORE */ 
    startScore(){
        // INICIAR SESSION STORAGE "HIGH SCORE" CASO NÃO EXISTA
        if (this.high_score === null) {
            sessionStorage.setItem("mario_high_score", 0);
            this.high_score_text.innerHTML = 0;
        }else{
            this.high_score_text.innerHTML = parseInt(this.high_score);
        }

        // INICIAR SESSION STORAGE "SCORE" CASO NÃO EXISTA
        sessionStorage.setItem("mario_score", 0);
        this.current_score = 0;
    }

    /** FINALIZAR O SCORE */ 
    endScore(){
        // ATUALIZAR O HIGH SCORE CASO O SCORE ATUAL SEJA MAIOR
        if(this.current_score > this.high_score){
            sessionStorage.setItem("mario_high_score", this.current_score);
            this.high_score_text.innerHTML = this.current_score;
            this.new_high_score_text.style.display = 'block';
        }

        // RESETAR O SCORE ATUAL PARA 0
        sessionStorage.setItem("mario_score", 0);
    }

    /** INCREMENTAR O SCORE */ 
    incrementScore(){
        this.current_score = parseInt(this.current_score) + 1;
        sessionStorage.setItem("mario_score", this.current_score);
        this.score_text.innerHTML = parseInt(this.current_score);
    }

    /** RESETA O SCORE */
    resetScore(){
        sessionStorage.setItem("mario_score", 0);
    }

}