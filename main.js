/**
 * Created by User on 06/05/2015.
 */
var tempo = new Date();
var campo = [];

$(document).ready( function() {
    //trocarJogador(prompt("Digite o nome do jogador:"));
    iniciaCampo(16);
    espalharMinas();
    setTimer(tempo);
    atualizaTempo();


    function iniciaCampo(tam) {
        var j = 0;
        for (var i = 0; i < tam; i++) {
            $("#campo").append("<tr id='" + i + "i'></tr>");
            campo[i] = [];
            for (j = 0; j < tam; j++) {
                campo[i][j] = {minado: false, clicado: false};
                $(("#" + i + "i")).append("<th class='sqr' id='" + i + "-" + j + "'></th>");
            }
        }
    }

    function espalharMinas() {
        var i;
        var j;
        while(contarMinas() < 40){
            i = Math.floor(Math.random() * 16);
            j = Math.floor(Math.random() * 16);

            if(!campo[i][j].minado){
                campo[i][j].minado = true;
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

    function atualizaTempo() {
        setInterval(function () {
            tempo.setSeconds(tempo.getSeconds()+1);
            $("#tempo").text(tempo.getHours() + ":" + tempo.getMinutes() + ":" + tempo.getSeconds());
        }, 1000);
    }

    $(".sqr").click(function () {
        var id = $(this).attr("id");
        var idSplit = $(this).attr("id").split("-");
        var i = Number(idSplit[0]);
        var j = Number(idSplit[1]);
        var sqr = campo[i][j];
        var qtd;
        console.log(campo[i][j]);
        if(!sqr.clicado) {
            sqr.clicado = true;
            if (sqr.minado) {
                $("#" + id).css('background-color', 'red');
            } else {
                qtd = verificaAdjacentes(i, j);
                if(qtd > 0) {
                    $("#" + id).append("<p>" + qtd + "</p>");
                }
                else{
                    $("#" + id).css('background-color', 'gray');
                }
            }
        }
    });

    function verificaAdjacentes(lin, col) {
        var qtd = 0;
        for (var i = lin-1; i < lin+2; i++) {
            for (var j = col-1; j < col+2; j++) {
                if(!(i == lin && j == col)) {
                    if (campo[i] != undefined && campo[i][j] != undefined) {
                        if(campo[i][j].minado){
                            qtd++;
                        }
                    }
                }
            }
        }
        return qtd;
    }


});
