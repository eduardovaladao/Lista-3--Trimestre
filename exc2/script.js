$(document).ready(() => {

    var warning = $('#warning');

    //$('#consultar').after('<br><span id="warning"></span>');
    $('#consultar').click(() => {
        consultarRegioes();
    });

    function consultarRegioes() {
        var mensagem = "";
        warning.hide();
        warning.removeClass();

        if ($('#regioes').val() != "") {
            $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', (estados, status) => {
                //console.log(estados);
                //console.log($('#regioes').val());

                $('table').html("");

                var tableHTML = "";
                var tr = "";
                
                for (let i = 0; i < estados.length; i++) {

                    if (estados[i].regiao.nome == $('#regioes').val()) {

                        tr = `<tr><td>${estados[i].nome}</td><td>${estados[i].sigla}</td></tr>`;

                        tableHTML += tr;
                    }
                }
                $('#Guilherme-e-Santiago').html(tableHTML);
                $('#Guilherme-e-Santiago').css({ display: "block" });

                mensagem = "Tudo certo!!!";
                warning.addClass("alert alert-success");
                warning.html(mensagem);

            });
        } else {
            mensagem = "Você não selecionou uma região!";
            warning.addClass("alert alert-danger");
            warning.html(mensagem);
        }
        warning.show("slow");
    }
});