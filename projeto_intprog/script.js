const form = document.getElementById("formulario");
const tabela = document.getElementById("resultado");
const importar = document.getElementById("importar");

let dados = [];
let editando = null;

// Atualiza a tabela
function renderizar() {
    tabela.innerHTML = "";
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

// Salvar / Editar
form.addEventListener("submit", e => {
    e.preventDefault();

    const item = {
        site: siteanime.value,
        obra: obra.value,
        autor: autor.value,
        ano: lancamento.value,
        genero: genero.value,
        tema: tema.value
    };

    if (editando !== null) {
        dados[editando] = item;
        editando = null;
    } else {
        dados.push(item);
    }

    renderizar();
    form.reset();
});

// Excluir
function excluir(i) {
    dados.splice(i, 1);
    renderizar();
}

// Editar
function editar(i) {
    const d = dados[i];
    siteanime.value = d.site;
    obra.value = d.obra;
    autor.value = d.autor;
    lancamento.value = d.ano;
    genero.value = d.genero;
    tema.value = d.tema;
    editando = i;
}

// Importar CSV
importar.addEventListener("change", () => {
    const reader = new FileReader();
    reader.onload = () => {
        const linhas = reader.result.split("\n");
        dados = linhas.slice(1).map(l => {
            const c = l.split(",");
            return {
                site: c[0],
                obra: c[1],
                autor: c[2],
                ano: c[3],
                genero: c[4],
                tema: c[5]
            };
        });
        renderizar();
    };
    reader.readAsText(importar.files[0]);
});

// Exportar CSV
function exportarCSV() {
    let csv = "Site,Obra,Autor,Ano,Gênero,Tema\n";
    dados.forEach(d => {
        csv += `${d.site},${d.obra},${d.autor},${d.ano},${d.genero},${d.tema}\n`;
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv]));
    a.download = "animes.csv";
    a.click();
}