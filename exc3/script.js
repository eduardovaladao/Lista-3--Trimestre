$(document).ready(function () {

    $('#buscar').after('<br><span id="warning"></span>');

    $.getJSON(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`, (estados) => {

        console.log(estados);

        for (let i = 0; i < estados.length; i++) {
            var sigla = estados[i].sigla;
            $('#sigla').append(`<option value="${sigla}">${sigla}</option>`);
        }
    });

    $('#buscar').click(() => {

        var mensagem = "";
        var estado = $('#sigla').val();

        if ($('#sigla').val() != "") {
            $.getJSON(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`, (ufs) => {

                console.log(ufs);

                $('#table').html("");

                for (let i = 0; i < ufs.length; i++) {
                    $('#table').append(`<tr><td>${ufs[i].nome}</td></tr>`);
                }
            });

            mensagem = "Tudo certo!!!";

            $('#warning').html(mensagem);
            $('#warning').css(
                {
                    backgroundColor: "green",
                    width: "100%"
                }
            );
        } else {
            mensagem = "Você não selecionou uma região!";

            $('#warning').html(mensagem);
            $('#warning').css(
                {
                    backgroundColor: "red",
                    width: "100%"
                }
            ); 
        }

    });
});