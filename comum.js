// comum.js — funções que todas as páginas usam: datas, salvar, avisos, navegação e rodapé.

// ===== Seu nome no rodapé (mude aqui e vale para todas as páginas) =====
const AUTOR = "Jefferson";

// ===== Onde cada parte guarda seus dados no navegador =====
const CHAVES = {
  habitos: "habito-a-habito-v2",
  foco: "habito-a-habito-foco-v1",
  treino: "habito-a-habito-treino-v1"
};

function ler(chave) {
  try { const t = localStorage.getItem(chave); return t ? JSON.parse(t) : null; }
  catch (e) { return null; }
}
function gravar(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
}

// ===== Datas =====
// Transforma uma data em texto "2026-10-28", usado como etiqueta de cada dia.
function chaveDoDia(data) {
  return data.getFullYear() + "-" + String(data.getMonth() + 1).padStart(2, "0") + "-" + String(data.getDate()).padStart(2, "0");
}
// A data de "n" dias atrás (0 = hoje), ao meio-dia para evitar problemas de fuso.
function diasAtras(n) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}
const hojeChave = () => chaveDoDia(diasAtras(0));
const formatarData = (chave) => { const [a, m, d] = chave.split("-"); return d + "/" + m + "/" + a.slice(2); };
const NOMES_DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const NOMES_MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

// ===== Aviso rápido no rodapé =====
let _toastTimer = null;
function avisar(texto) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = texto; t.hidden = false;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => { t.hidden = true; }, 3500);
}

// ===== Navegação entre as áreas =====
const AREAS = [
  { pagina: "index.html", nome: "Hoje",
    icone: '<path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' },
  { pagina: "foco.html", nome: "Foco",
    icone: '<circle cx="12" cy="13" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v4.5l3 1.8M9.5 3h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' },
  { pagina: "treino.html", nome: "Treino",
    icone: '<path d="M3 9v6M6 6.5v11M18 6.5v11M21 9v6M6 12h12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' },
  { pagina: "conquistas.html", nome: "Conquistas",
    icone: '<path d="M12 21c-4 0-6.5-2.6-6.5-6 0-3 2-5 3.4-6.6.3 1.6 1 2.6 2 3.1-.2-3 1.3-6.2 3.6-8.5.3 3.2 1.4 5 2.8 6.6 1.1 1.3 1.7 3 1.7 5.1 0 3.6-2.7 6.3-7 6.3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' }
];

function montarNav(atual) {
  const nav = document.getElementById("nav-app");
  if (!nav) return;
  nav.className = "nav-app";
  nav.setAttribute("aria-label", "Áreas do app");
  nav.innerHTML = "";
  for (const a of AREAS) {
    const link = document.createElement("a");
    link.href = a.pagina;
    link.className = "nav-item";
    if (a.pagina === atual) link.setAttribute("aria-current", "page");
    link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + a.icone + "</svg><span>" + a.nome + "</span>";
    nav.appendChild(link);
  }
}

// ===== Rodapé =====
// Coloca "Feito por ... · © ano" no fim de cada página. O ano se atualiza sozinho.
function montarRodape() {
  const wrap = document.querySelector(".wrap");
  if (!wrap || document.querySelector(".rodape")) return;
  const rodape = document.createElement("footer");
  rodape.className = "rodape";
  const ano = new Date().getFullYear();
  rodape.innerHTML = "<span>Feito por <strong></strong></span><span></span>";
  rodape.querySelector("strong").textContent = AUTOR;
  rodape.lastChild.textContent = "© " + ano + " " + AUTOR + ". Todos os direitos reservados.";
  wrap.appendChild(rodape);
}
montarRodape();

// ===== Logo pequeno ao lado do título (Foco, Treino e Conquistas) =====
// Na Hoje o logo já aparece grande, então lá não faz nada. O logo leva de volta à Hoje.
function montarLogoPequeno() {
  const titulo = document.querySelector(".wrap h1");
  if (!titulo || titulo.classList.contains("logo") || titulo.querySelector(".mini-logo")) return;
  const link = document.createElement("a");
  link.href = "index.html";
  link.className = "mini-logo";
  link.innerHTML = '<img src="habito-logo.png" alt="Hábito a Hábito, voltar para Hoje" width="640" height="473">';
  titulo.classList.add("titulo-com-logo");
  titulo.prepend(link);
}
montarLogoPequeno();
