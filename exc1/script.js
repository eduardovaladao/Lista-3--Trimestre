$(document).ready(function () {
    $('#buscar').click(function () {

        var cepValue = $('#cep').val();

        $('#alert').hide();
        $('#alert').removeClass()

        if (cepValue == "") {
            alert("Informe o CEP!");
        }
        else if (isNaN(cepValue)) {
            alert("Informe o CEP com números!");
        }
        else {
            $.getJSON('https://viacep.com.br/ws/' + cepValue + '/json/', (obj) => {
                if (!("erro" in obj)) {
                    //console.log(obj);
                    $('#logradouro').html(obj.logradouro);
                    $('#complemento').html(obj.complemento);
                    $('#bairro').html(obj.bairro);
                    $('#localidade').html(obj.localidade);
                    $('#uf').html(obj.uf);

                    var elements = $('table td');

                    for (let i = 0; i < elements.length; i++) {
                        if (!elements[i].innerHTML) //se o <td> estiver vazio, então...
                            elements[i].innerHTML = "-";
                    }
                    $('#alert').html("Sucesso! Confira os resultados na tabela abaixo.");
                    $('#alert').addClass("alert alert-success");
                } else {
                    limparCampos();
                    $('#alert').html("CEP não encontrado. Tente novamente.");
                    $('#alert').addClass("alert alert-danger");
                }
                $("#alert").show(500);
            });
        }
    });

    $('#limpar').click(() => limparCampos());

    function limparCampos() {
        $('#cep').val("");
        $('#alert').hide(500);
        $('td').empty();
    }
});

