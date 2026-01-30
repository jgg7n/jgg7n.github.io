const form = document.getElementById("formulario");
// Pega o formulário pelo id

const lista = document.getElementById("resultado");
// Quando clicar em enviar

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Impede a página de recarregar

    const dados = [
        document.getElementById("siteanime").value,
        document.getElementById("obra").value,
        document.getElementById("autor").value,
        document.getElementById("lancamento").value,
        document.getElementById("genero").value,
        document.getElementById("temas").value
    ];

    // Array com os dados do formulário

    lista.innerHTML = ""; 
    
    // Limpa a lista

    for (let i = 0; i < dados.length; i++) {
        // Laço for para criar os itens da lista
        const item = document.createElement("li"); 
        // Cria <li>
        item.innerText = dados[i]; 
        // Coloca o texto
        lista.appendChild(item); 
        // Coloca na lista
    }

    form.reset(); 
    // Limpa o formulário
});

function baixarCSV() {
    // Cabeçalho do CSV
    
    let csv = "Site,Obra,Autor,Ano,Genero,Temas\n";
    // Pega os valores dos inputs
    
    const dados = [
        document.getElementById("siteanime").value,
        document.getElementById("obra").value,
        document.getElementById("autor").value,
        document.getElementById("lancamento").value,
        document.getElementById("genero").value,
        document.getElementById("temas").value
    ];

    // Usa for para montar o CSV
    
    for (let i = 0; i < dados.length; i++) {
        csv += dados[i] + ",";
    }

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "dados.csv";
    link.click();

    // Cria o arquivo
}