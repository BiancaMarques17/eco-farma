async function salvarEntregador() {
    const data = {
        nome: document.getElementById("entregador_nome").value,
        sexo: document.getElementById("entregador_sexo").value,
        data_nasc: document.getElementById("entregador_data_nasc").value,
        email: document.getElementById("entregador_email").value,
        telefone: document.getElementById("entregador_telefone").value,
        cpf: document.getElementById("entregador_cpf").value,
        endereco: document.getElementById("entregador_endereco").value,
        cep: parseInt(document.getElementById("entregador_cep").value),
        numero: parseInt(document.getElementById("entregador_numero").value),
        senha: document.getElementById("entregador_senha").value
    };

    try {
        const response = await fetch("https://ecofarma-f4ake0gkhwapfmh3.canadacentral-01.azurewebsites.net/api/entregador", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Entregador cadastrado com sucesso!");
            window.location.href = "/login.html"; // ou outra rota
        } else {
            const erro = await response.text();
            alert("Erro ao cadastrar entregador:\n" + erro);
        }
    } catch (e) {
        alert("Erro de conexão com a API:\n" + e.message);
    }
}
