
function salvarViagem(event) {
    event.preventDefault();

    const nomeEmbarcacao = document.getElementById('nome-embarcacao').value;
    const dataViagem = document.getElementById('data-viagem').value;
    const destino = document.getElementById('destino').value;
    const tipoCarga = document.getElementById('tipo-carga').value;
    const quantidadeCarga = document.getElementById('quantidade-carga').value;

    const viagem = {
        nomeEmbarcacao,
        dataViagem,
        destino,
        tipoCarga,
        quantidadeCarga
    };

    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
    viagens.push(viagem);
    localStorage.setItem('viagens', JSON.stringify(viagens));

    alert('Viagem cadastrada com sucesso!');
    document.getElementById('form-cadastro').reset();
}

document.getElementById('form-cadastro').addEventListener('submit', salvarViagem);


function consultarViagens(event) {
    event.preventDefault();

    const nomeEmbarcacao = document.getElementById('consulta-embarcacao').value;
    const dataInicio = document.getElementById('consulta-data-inicio').value;
    const dataFim = document.getElementById('consulta-data-fim').value;

    let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
    let resultados = viagens;

    if (nomeEmbarcacao) {
        resultados = resultados.filter(viagem => viagem.nomeEmbarcacao.includes(nomeEmbarcacao));
    }

    if (dataInicio) {
        resultados = resultados.filter(viagem => new Date(viagem.dataViagem) >= new Date(dataInicio));
    }

    if (dataFim) {
        resultados = resultados.filter(viagem => new Date(viagem.dataViagem) <= new Date(dataFim));
    }

    exibirResultados(resultados);
}

function exibirResultados(viagens) {
    const resultadoDiv = document.getElementById('resultado-consulta');
    if (viagens.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhuma viagem encontrada.</p>';
        return;
    }

    let tabela = `
        <table>
            <tr>
                <th>Nome da Embarcação</th>
                <th>Data da Viagem</th>
                <th>Destino</th>
                <th>Tipo de Carga</th>
                <th>Quantidade de Carga</th>
            </tr>
    `;

    viagens.forEach(viagem => {
        tabela += `
            <tr>
                <td>${viagem.nomeEmbarcacao}</td>
                <td>${viagem.dataViagem}</td>
                <td>${viagem.destino}</td>
                <td>${viagem.tipoCarga}</td>
                <td>${viagem.quantidadeCarga}</td>
            </tr>
        `;
    });

    tabela += '</table>';
    resultadoDiv.innerHTML = tabela;
}

document.getElementById('form-consulta').addEventListener('submit', consultarViagens);
