document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

   
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

        console.log('Cadastrando viagem:', viagem);

        let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        viagens.push(viagem);
        localStorage.setItem('viagens', JSON.stringify(viagens));

        console.log('Viagens salvas:', viagens);

        alert('Viagem cadastrada com sucesso!');
        document.getElementById('form-cadastro').reset();
    }

    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        console.log('Formulário de cadastro encontrado');
        formCadastro.addEventListener('submit', salvarViagem);
    } else {
        console.log('Formulário de cadastro não encontrado');
    }

    
    function consultarViagens(event) {
        event.preventDefault();
        console.log('Consultando viagens...');

        const nomeEmbarcacao = document.getElementById('consulta-embarcacao').value;
        const dataInicio = document.getElementById('consulta-data-inicio').value;

        let viagens = JSON.parse(localStorage.getItem('viagens')) || [];
        console.log('Viagens armazenadas:', viagens);

        let resultados = viagens;

        if (nomeEmbarcacao) {
            resultados = resultados.filter(viagem => viagem.nomeEmbarcacao.includes(nomeEmbarcacao));
        }

        if (dataInicio) {
            resultados = resultados.filter(viagem => new Date(viagem.dataViagem) >= new Date(dataInicio));
        }

        console.log('Resultados da consulta:', resultados);
        exibirResultados(resultados);
    }

    function exibirResultados(viagens) {
        console.log('Exibindo resultados...');
        const resultadoDiv = document.getElementById('resultado-consulta');
        const detalhesDiv = document.getElementById('detalhes-consulta');
        detalhesDiv.innerHTML = ''; 

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

            let detalhes = document.createElement('div');
            detalhes.style.border = '1px solid #004d40';
            detalhes.style.padding = '10px';
            detalhes.style.margin = '10px 0';
            detalhes.style.backgroundColor = '#f0f0f0';

            detalhes.innerHTML = `
                <h3>Detalhes da Viagem</h3>
                <p><strong>Nome da Embarcação:</strong> ${viagem.nomeEmbarcacao}</p>
                <p><strong>Data da Viagem:</strong> ${viagem.dataViagem}</p>
                <p><strong>Destino:</strong> ${viagem.destino}</p>
                <p><strong>Tipo de Carga:</strong> ${viagem.tipoCarga}</p>
                <p><strong>Quantidade de Carga:</strong> ${viagem.quantidadeCarga} toneladas</p>
            `;
            detalhesDiv.appendChild(detalhes);
        });

        tabela += '</table>';
        resultadoDiv.innerHTML = tabela;
    }

    const formConsulta = document.getElementById('form-consulta');
    if (formConsulta) {
        console.log('Formulário de consulta encontrado');
        formConsulta.addEventListener('submit', consultarViagens);
    } else {
        console.log('Formulário de consulta não encontrado');
    }
});
