const form = document.getElementById("formulario");
const tabela = document.getElementById("resultado");
const importar = document.getElementById("importar");

let dados = []; // array que vai guardar todos os nossos objetos (animes/obras)
let editando = null; // variável de controle para saber se estamos criando um novo ou editando um existente

// essa função limpa a tabela e desenha ela de novo com os dados atualizados
function renderizar() {
    tabela.innerHTML = ""; // limpa a tabela para não duplicar os itens
    dados.forEach((d, i) => {
        tabela.innerHTML += `
        <tr>
            <td>${d.site}</td>
            <td>${d.obra}</td>
            <td>${d.autor}</td>
            <td>${d.ano}</td>
            <td>${d.genero}</td>
            <td>${d.tema}</td>
            <td>
                <button onclick="editar(${i})">Editar</button>
                <button onclick="excluir(${i})">Excluir</button>
            </td>
        </tr>`;
    });
}

// funcao de rodar quando clicamos no botão de salvar do formulário
form.addEventListener("submit", e => {
    e.preventDefault(); // nao deixa a página de recarregar ao enviar o formulário

    // cria um objeto com os valores que o usuário digitou nos inputs
    const item = {
        site: siteanime.value,
        obra: obra.value,
        autor: autor.value,
        ano: lancamento.value,
        genero: genero.value,
        tema: tema.value
    };

    // comandos para decidir se salva um novo ou atualiza um que já existe
    if (editando !== null) {
        dados[editando] = item; // substitui os dados na posição que estamos editando
        editando = null; // limpa o estado de edição
    } else {
        dados.push(item); // adiciona um novo item no final da lista
    }

    renderizar(); // atualiza a tela
    form.reset(); // limpa os campos do formulário
});

// remove um item do array com base no índice dele e atualiza a tabela
function excluir(i) {
    if(confirm("Deseja realmente excluir?")) { // adicionei um alerta simples para segurança
        dados.splice(i, 1);
        renderizar();
    }
}

// pega os dados da linha e joga de volta para os campos do formulário para editar
function editar(i) {
    const d = dados[i];
    siteanime.value = d.site;
    obra.value = d.obra;
    autor.value = d.autor;
    lancamento.value = d.ano;
    genero.value = d.genero;
    tema.value = d.tema;
    
    editando = i; // guarda qual índice estamos mexendo para salvar depois
}

// parte que lê o arquivo CSV e transforma em objetos Javascript
importar.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = () => {
        const linhas = reader.result.split("\n"); // quebra o arquivo por linhas
        
        // pula a primeira linha (cabeçalho) e mapeia o restante para o nosso array
        dados = linhas.slice(1).map(l => {
            const c = l.split(","); // uebra a linha por vírgulas
            if(c.length < 6) return null; // faz a validação simples para ignorar linhas vazias
            return {
                site: c[0],
                obra: c[1],
                autor: c[2],
                ano: c[3],
                genero: c[4],
                tema: c[5]
            };
        }).filter(item => item !== null); // remove itens inválidos que nao estao no codigo
        
        renderizar();
    };
    reader.readAsText(importar.files[0]);
});

// transforma o nosso array de objetos em uma string CSV e inicia o download
function exportarCSV() {
    let csv = "Site,Obra,Autor,Ano,Gênero,Tema\n";
    dados.forEach(d => {
        csv += `${d.site},${d.obra},${d.autor},${d.ano},${d.genero},${d.tema}\n`;
    });

    // cria um link invisível para "forçar" o navegador a baixar o arquivo
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv]));
    a.download = "animes.csv";
    a.click();
}