var clique = document.getElementById("btn-menu");
var menuLateral = document.getElementById("menu-lateral");

//PARTE DO MENU LATERAL
clique.onclick = function (e) {
    e.preventDefault();
    menuLateral.classList.toggle('toggleMenu');
};
///////////////////////////// FIM DA PARTE DO MENU ////////////////////////////////////////////////

//FUNÇÃO DE RELOAD NO GAME APOS CLICAR NO MODAL
function startgame(){
 location.reload()
alert("Você tem 55 segundos para acertar todas as jogadas! Se não, é game over! ")
}

//BLOCO DE VARIÁVEIS
//const, var e let são denominações de variáveis
//const é uma variavel q nao pode ser mudada (alterada)
const cartas = document.querySelectorAll("#cartas")//Parte que pega a <DIV> no HTML, e deixa armazenado na variável cartas
var viroucarta = false //variavel que será usada na função de virar a carta apos o clique.
var travatabuleiro = false  // variável que sera usada na função de travar as cartas apos achar os pares
var primeiracarta, segundacarta //variáveis das 2 cartas que serão clicadas
var acertos = 0
////////////////////////////////////////


//ESSE BLOCO DE FUNÇÃO FAZ O EVENTO DE VIRAR A CARTA
function viracarta(){
    if (travatabuleiro) return
        if (this === primeiracarta) return //se o this confere com as cartas || vendo se a segunda carta que está sendo clicada
                                            // é igual a primeira," === " é um operador de comparação em  javascript

        this.classList.add('flip') //Adiciona a classe de flipar no css (*Nota importante para mostrar o css)


    //Condicional  dentro do bloco para verificar se viroucarta nao é falso (!)
if(!viroucarta){ //! retorna valor negativo, se virou carta for negativo, atribuí true à função
    
    viroucarta = true
    primeiracarta = this //aqui as cartas recebem valor "this"
    return
    }

         segundacarta = this //aqui as cartas recebem valor "this"

         checarpares(); //criando a função para checar os pares das cartas
 }

 //ESSE BLOCO DE FUNÇÃO CHECA SE AS CARTAS CLICADAS POSSUEM O MESMO FRAMEWORK(DATA ATRIBUIDO NA PARTE DO HTML)
function checarpares(){
        if(primeiracarta.dataset.framework === segundacarta.dataset.framework){
            desabilita() //criando uma função de desabilitar flip

            acertos++; //Incrementando o valor da variavel acertos a cada acerto de pares de cartas.

            if(acertos === 6){ //Contador q verifica se achamos todas as cartas! (de acordo com a quantidade de incrementos feitos  acima)
                winGame()
                msgperdeu.style.opacity = 0;
            }
        

            return
        
        }

        //invocando uma função de desvirar carta no bloco de checar pares caso NAO dê verdadeiro a condicional if
        desviracarta();
        /* Para fazer o checarpares() de forma mais clean ----> usando um ternário <----
        let checarpares = primeiracarta.dataset.framework === segundacarta.dataset.framework
        checarpares ? desabilita() : desviracarta()  */
    }


    
    //NESTE BLOCO, AS CARTAS SÃO DESABILITADAS E RESETA O TABULEIRO DE PRAXE
   
    function desabilita(){
        primeiracarta.removeEventListener('click',viracarta) //a função de desabilitar as cartas, remove a função, que aqui é um evento de click
        segundacarta.removeEventListener('click',viracarta)//eu tiro primeiro o evento da lista de eventos, e ponho a função q foi adicionada o evento posteriormente....
        resetTabuleiro(); //criando a função para resetar tabuleiro
    }

    //NESSE BLOCO, ELA CRIA UMA FUNÇÃO PARA DESVIRARA A CARTA TORNANDO O TRAVATABULEIRO VERDADEIRO, E SETANDO UM TEMPO PARA REMOVER O FLIP E RESETANDO

    function desviracarta(){
        travatabuleiro = true


        setTimeout(() => {
            primeiracarta.classList.remove('flip')
            segundacarta.classList.remove('flip')
        
            resetTabuleiro();//criando a função para resetar de novo, por que é outro bloco de função
        },1500);
    }

    function resetTabuleiro(){
        [viroucarta,travatabuleiro] = [false,false]//usasndo vetores para setar as configurações de cada um
        [primeiracarta,segundacarta]  = [null,null]//usasndo vetores para setar as configurações de cada um
    }

//função encapsulada com parênteses, IIFE (Immediately Invoked Function Expression) || Enfim, Aqui é uma função encapsulada pra embaralhar as cartas
//Função anônima, ela está entre parênteses para evitara que ela seja ma função global ( funcione em todo o código ).
(function embaralha(){
        cartas.forEach(carta => { //pego a const cartas, e retorno o valor para uma função especifica chamada "carta", sem o S no final...
            let aleatorio = Math.floor(Math.random()*12) //Função matemática para random (Aleatório), isso embaralha as 12 cartas
            carta.style.order = aleatorio //adiciono com o DOM no css da pagina, na variável de retorno "carta", função "order"
                                        // No CSS nao existe uma função aleatória de ordenar as divs, entao criamos pelo js 
        })
})()


cartas.forEach(carta => carta.addEventListener('click',viracarta)) //forEach cria um evento no html e css, nesse caso, quando clica, a carta vira

const msgperdeu = document.getElementById('gameover') //Pegando a div gameover do html e css e armazenando na variavel msgperdeu

const msgganhou = document.getElementById('wingame') //Pegando a div com a foto de vitoriaa

//Falta implementar configuração pra nao aparecer o  gameover caso ganhe o jogo
    window.setTimeout(function(){
    gameOver()
},55000)







function winGame(){
    wingame.style.zIndex = 10;
    wingame.addEventListener("click",startgame,false)
}

function gameOver(){  //função que chama a mensagem na tela e bloqueia o  jogo.
    msgperdeu.style.zIndex =  10;
    msgperdeu.addEventListener("click",startgame,false)
}

//CRONOMETRO


