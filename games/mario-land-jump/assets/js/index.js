// =============================
// ==== INSTÂNCIAS DE CLASSES ==
// =============================

const mario = new Mario(); // Mario
const score = new Score(); // Pontuação
const prepare = new Prepare(); // Contador inicial para a preparação do jogador
const scenarioElements = new ScenarioElements(); // Elementos do cenário
const game = new Game(); // Funções gerais do jogo

// =============================
// ==== CHAMADAS DE FUNÇÕES ====
// =============================

score.startScore(); // Faz preparações de setStorage
game.prepare(); // Zera o sessionStorage de game over
prepare.startCount(); // Inicia a contagem de preparação, e impede que o jogo começe até finalizar
game.start(); // Inicia o jogo

document.addEventListener('keydown', e => mario.jump(e, score), true); // Listener para fazer o Mario pular