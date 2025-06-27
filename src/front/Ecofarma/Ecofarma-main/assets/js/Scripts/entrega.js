document.addEventListener("DOMContentLoaded", async () => {
  // === Dados do usuário ===
  const API_URL = "https://ecofarma-f4ake0gkhwapfmh3.canadacentral-01.azurewebsites.net/api/entregador";
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const idEntregador = usuarioLogado?.dadosPapel?.id_entregador;

  if (!usuarioLogado || !usuarioLogado.dadosPapel) return;

  const dados = usuarioLogado.dadosPapel;


  // Atualizar senha
  document.querySelector("#change-password form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const senhaAtual = e.target[0].value;
    const novaSenha = e.target[1].value;
    const confirmar = e.target[2].value;

    if (novaSenha !== confirmar) return alert("As senhas não coincidem");

    const entregador = await fetch(`${API_URL}/${idEntregador}`).then(res => res.json());
    if (entregador.senha !== senhaAtual) return alert("Senha atual incorreta!");

    entregador.senha = novaSenha;
    const response = await fetch(`${API_URL}/${idEntregador}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entregador),
    });
    if (response.ok) alert("Senha atualizada com sucesso!");
  });

   // Cupom
  carregarCupons();

  // Tabs
  const tabs = document.querySelectorAll(".account__tab");
  const contents = document.querySelectorAll(".tab__content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active-tab"));
      contents.forEach(c => c.style.display = "none");

      tab.classList.add("active-tab");
      const targetId = tab.getAttribute("data-target");
      const targetContent = document.querySelector(targetId);
      if (targetContent) targetContent.style.display = "block";
    });
  });

  const activeTab = document.querySelector(".account__tab.active-tab");
  if (activeTab) {
    const targetId = activeTab.getAttribute("data-target");
    contents.forEach(c => c.style.display = "none");
    const activeContent = document.querySelector(targetId);
    if (activeContent) activeContent.style.display = "block";
  }

});

