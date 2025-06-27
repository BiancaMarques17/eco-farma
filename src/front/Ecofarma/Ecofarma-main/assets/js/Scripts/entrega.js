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




async function carregarPedidos() {
  const container = document.querySelector("#orders .tab__body");
  container.innerHTML = "";

  try {
    const response = await fetch('https://ecofarma-f4ake0gkhwapfmh3.canadacentral-01.azurewebsites.net/api/pedido/ultimos-tres');
    if (!response.ok) throw new Error('Erro ao buscar pedidos');

    const pedidos = await response.json();

    if (pedidos.length === 0) {
      container.innerHTML = "<p>Nenhum pedido encontrado.</p>";
      return;
    }

    // Somar o total geral
    const totalGeral = pedidos.reduce((sum, p) => sum + p.qtd_produto * p.preco_produto, 0);

    // Criar o container do pedido único
    const div = document.createElement("div");
    div.className = "pedido";
    div.style = `
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
      background-color: #f9f9f9;
    `;

    const icone = "🛍️"; // sacola
    const data = new Date().toLocaleDateString("pt-BR"); // data atual

    div.innerHTML = `
      <h4 style="margin-bottom: 5px;">${icone} Pedidos Recentes</h4>
      <p><strong>Data:</strong> ${data}</p>
      <p><strong>Total:</strong> R$ ${totalGeral.toFixed(2)}</p>
      <ul style="margin-top: 10px; padding-left: 20px;">
        ${pedidos.map(p => `<li>${p.qtd_produto}x ${p.nome} - <strong>R$ ${(p.qtd_produto * p.preco_produto).toFixed(2)}</strong></li>`).join("")}
      </ul>
    `;

    container.appendChild(div);
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Erro ao carregar pedidos.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarPedidos);
