class Prepare{
    constructor(){
        this.prepare_text = document.querySelector('#prepare');
    }

    /** CONTADOR DESCRESCENTE DE 3 PARA INICIAR O JOGO */
    startCount(){
        let contador = setInterval(function(){
            let currentCount = +this.prepare_text.textContent;
            currentCount = currentCount - 1;

            // EXIBE OS NÚMEROS SE CASO SEJAM MAIORES QUE 0
            // EXIBE GO E ESCONDE CASO SEJA IGUAL A 0
            if(currentCount >= 1){
                this.prepare_text.innerHTML = currentCount;
            }else{
                this.prepare_text.innerHTML = 'GO!';
                clearInterval(contador);
                setTimeout(function(){
                    this.prepare_text.style.display = 'none';
                    pipe.style.display = 'block';
                }.bind(this), 2000);
            }

        }.bind(this), 1000);
    }
}