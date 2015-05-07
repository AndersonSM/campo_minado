/**
 * Created by User on 06/05/2015.
 */
var tempo = new Date();
var campo = [];
var quadradosAbertos = 0;

$(document).ready( function() {
    var atualizaTempo = setInterval(function () {
        tempo.setSeconds(tempo.getSeconds()+1);
        $("#tempo").text(tempo.getHours() + ":" + tempo.getMinutes() + ":" + tempo.getSeconds());
    }, 1000);
    
    trocarJogador(prompt("Digite o nome do jogador:"));
    var tam = 16;
    var qtdMinas = 40;
    iniciaCampo(tam);
    espalharMinas();
    setTimer(tempo);



    function iniciaCampo(tam) {
        var j = 0;
        for (var i = 0; i < tam; i++) {
            $("#campo").append("<tr id='" + i + "i'></tr>");
            campo[i] = [];
            for (j = 0; j < tam; j++) {
                campo[i][j] = {minado: false, clicado: false, adjacentes: 0, x: i, y: j};
                $(("#" + i + "i")).append("<th class='sqr' id='" + i + "-" + j + "'></th>");
            }
        }
    }

    function espalharMinas() {
        var i;
        var j;
        while(contarMinas() < qtdMinas){
            i = Math.floor(Math.random() * tam);
            j = Math.floor(Math.random() * tam);

            if(!campo[i][j].minado){
                campo[i][j].minado = true;
                for (var k = i-1; k < i+2; k++) {
                    for (var l = j-1; l < j+2; l++) {
                        if(!(k == i && l == j)) {
                            if(campo[k] != undefined && campo[k][l] != undefined) {
                                campo[k][l].adjacentes++;
                            }
                        }
                    }
                }
            }
        }
    }

    function contarMinas() {
        var qtd = 0;

        for (var i = 0; i < campo.length; i++) {
            for (var j = 0; j < campo[i].length; j++) {
                if(campo[i][j].minado){
                    qtd++;
                }
            }
        }

        return qtd;
    }

    function trocarJogador(jogador) {
        $("#jogador").text("Jogador: " + jogador);
    }


    function setTimer(tempo) {
        tempo.setHours(0);
        tempo.setMilliseconds(0);
        tempo.setMinutes(0);
        tempo.setSeconds(0);
    }

    $(".sqr").click(function () {
        var id = $(this).attr("id");
        var idSplit = $(this).attr("id").split("-");
        var i = Number(idSplit[0]);
        var j = Number(idSplit[1]);
        var sqr = campo[i][j];
        console.log(campo[i][j]);
        if(!sqr.clicado) {
            sqr.clicado = true;
            abrirQuadrado(id,sqr);
        }
    });

    function verificaAdjacentes(lin, col) {
        for (var i = lin-1; i < lin+2; i++) {
            for (var j = col-1; j < col+2; j++) {
                if(!(i == lin && j == col)) {
                    if (campo[i] != undefined && campo[i][j] != undefined && !campo[i][j].clicado) {
                        abrirQuadrado(i+"-"+j, campo[i][j]);
                    }
                }
            }
        }
    }

    function abrirQuadrado(id, sqr) {
        var perdeu = false;

        if (sqr.minado) {
            $("#" + id).css('background-color', 'red');
            perdeu = true;
        } else {
            quadradosAbertos++;
            var qtd = sqr.adjacentes;
            if(qtd > 0) {
                $("#" + id).append("<p>" + qtd + "</p>");
                sqr.clicado = true;
            }
            else{
                sqr.clicado = true;
                verificaAdjacentes(sqr.x, sqr.y);
                $("#" + id).css('background-color', 'gray');
            }
        }
        verificaFimDeJogo();

        if(perdeu){
            gameOver();
        }
    }

    function revelaQuadrado(id, sqr) {
        if (sqr.minado) {
            $("#" + id).css('background-color', 'red');
            sqr.clicado = true;
        } else {
            var qtd = sqr.adjacentes;
            if(qtd > 0) {
                $("#" + id).append("<p>" + qtd + "</p>");
                sqr.clicado = true;
            }
            else{
                $("#" + id).css('background-color', 'gray');
                sqr.clicado = true;
            }
        }
    }

    function verificaFimDeJogo() {
        if(quadradosAbertos == (tam*tam)-qtdMinas){
            indicaVencedor();
            clearInterval(atualizaTempo);
        }
    }

    function indicaVencedor() {
        alert("Parabéns, você venceu!");
    }

    function gameOver() {
        for (var i = 0; i < tam; i++) {
            for (var j = 0; j < tam; j++) {
                if(!campo[i][j].clicado) {
                    revelaQuadrado(i + "-" + j, campo[i][j]);
                }
            }
        }
        clearInterval(atualizaTempo);
        alert("Boom! Você perdeu!");
    }

});
