document.addEventListener("DOMContentLoaded", async () => {
  // === Dados do usuário ===
  const API_URL = "https://ecofarma-f4ake0gkhwapfmh3.canadacentral-01.azurewebsites.net/api/farmacia";
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const idFarmacia = usuarioLogado?.dadosPapel?.id_farmacia;

  if (!usuarioLogado || !usuarioLogado.dadosPapel) return;

  const dados = usuarioLogado.dadosPapel;


  // Atualizar senha
  document.querySelector("#change-password form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const senhaAtual = e.target[0].value;
    const novaSenha = e.target[1].value;
    const confirmar = e.target[2].value;

    if (novaSenha !== confirmar) return alert("As senhas não coincidem");

    const farmacia = await fetch(`${API_URL}/${idFarmacia}`).then(res => res.json());
    if (farmacia.senha !== senhaAtual) return alert("Senha atual incorreta!");

    farmacia.senha = novaSenha;
    const response = await fetch(`${API_URL}/${idFarmacia}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(farmacia),
    });
    if (response.ok) alert("Senha atualizada com sucesso!");
  });


});