let qtdeCartas;

const cartas = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
];

const baralho = [];

let primeiraCarta, segundaCarta;

let acertos = 0;

let jogadas = 0;

let segundos = 0;
let minutos = 0;

let idInterval;

function jogoInvalido(){

    if ( isNaN(qtdeCartas) || qtdeCartas < 4 || qtdeCartas > 14 || (qtdeCartas % 2 !== 0 ) ){
        return true;
    }

    return false;
}

function comparador() { 
	return Math.random() - 0.5; 
}

function resetarVariaveis(){
    primeiraCarta = undefined;
    segundaCarta = undefined;
}


function desvirarCartas(){
    primeiraCarta.classList.remove('virada');
    segundaCarta.classList.remove('virada');

    resetarVariaveis();    
}

function finalizarJogo(){
    if ( acertos === qtdeCartas ){
        
        clearInterval(idInterval);

        alert(`Parabens! Jogo finalizado com ${jogadas} jogadas no tempo de ${minutos}:${segundos} segundos`);

        const resposta = confirm('Deseja jogar novamente?');
        if ( resposta ){
            window.location.reload();
        }
    }
}

function virarCarta(carta){
    

    // verifica se clicou em uma carta virada. 
    if ( carta.classList.contains('virada')){
        return;
    }      

    if ( primeiraCarta !== undefined && segundaCarta !== undefined){
        return;
    }
    
    
    if ( primeiraCarta === undefined ){
        primeiraCarta = carta;
        primeiraCarta.classList.add('virada');
    }else{
        if ( segundaCarta === undefined){
            segundaCarta = carta;
            segundaCarta.classList.add('virada');

            jogadas++;

            // verificar as duas cartas
            if ( primeiraCarta.innerHTML === segundaCarta.innerHTML ){
                // se as duas cartas forem iguais
                console.log('acertou!');
                
                acertos = acertos + 2;

                resetarVariaveis();

                finalizarJogo();
                

            } else {// se não

                console.log('Errou!');
                setTimeout(desvirarCartas, 1000);                

            }
        }
    }

    console.log(acertos);
}



function renderizarBaralho(){

    const tabuleiro = document.querySelector('.tabuleiro');

    for(let i = 0; i < baralho.length; i++){

        //tabuleiro.innerHTML = tabuleiro.innerHTML +
        tabuleiro.innerHTML += `
            <li class="carta" onclick='virarCarta(this)'>
                <div class='front-face face'>
                    <img src='imagens/front.png'>
                </div>
                <div class='back-face face'>
                    <img src='imagens/${baralho[i]}.gif'>
                </div>
            </li>         
        `;
    }
}

function atualizaRelogio(){
    segundos++;

    const relogio = document.querySelector('.relogio');
    
    if ( segundos < 60 ){
        relogio.innerHTML = `${minutos}:${segundos}`;
    }else{
        minutos++;
        segundos = 0;
        relogio.innerHTML = `${minutos}:${segundos}`;
    }
    
}

function gerarBaralho(){

    for(let i = 0; i < (qtdeCartas/2); i++){

        let carta = cartas[i];

        baralho.push(carta);
        baralho.push(carta);

    }
    
    // embaralhar o baralho
    baralho.sort( comparador );

    renderizarBaralho();

    idInterval = setInterval(atualizaRelogio, 100);

}

function perguntarQtdeCartas(){
    
    tempo = 0;

    qtdeCartas = Number(prompt('Digite a quantidade de cartas'));
    
    // regras:
    // 1 - se o usuario digitou um numero
    // 2 - qtdeCartas tem que ser maior que 4
    // 3 - qtdeCartas tem que ser menor que 14
    // 4 - qtdeCartas tem que ser par
    while ( jogoInvalido() ){
        alert('Qtde de cartas inválida!');
        qtdeCartas = Number(prompt('Digite a quantidade de cartas'));
    }
    
    gerarBaralho();    
    
}

perguntarQtdeCartas();