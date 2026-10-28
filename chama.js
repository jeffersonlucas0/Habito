// chama.js — o desenho da ofensiva, usado por todas as páginas.
// Depende de comum.js (chaveDoDia, diasAtras).

// Cada nível liga "enfeites" no desenho. Quanto mais longe, mais enfeites.
const NIVEIS = [
  { min: 0,   nome: "Brasa apagada", ext: ["#9aa4ad", "#6b7680"], int: ["#c9d0d6", "#9aa4ad"], brasa: "#b7c0c7", escala: .34, brasas: 0 },
  { min: 1,   nome: "Faísca",        ext: ["#ffb347", "#ff7a1a"], int: ["#ffe7a3", "#ffc04d"], brasa: "#ffb347", escala: .36, brasas: 2 },
  { min: 3,   nome: "Chama",         ext: ["#ff8a1f", "#f0441a"], int: ["#ffe08a", "#ffab2e"], brasa: "#ff9a3c", escala: .44, brasas: 3, aro: "#ffb347", nucleo: true },
  { min: 7,   nome: "Fogueira",      ext: ["#ff7a1a", "#d92b1a"], int: ["#fff0a8", "#ffb42e"], brasa: "#ffb347", escala: .5,  brasas: 6, aro: "#ff8a1f", nucleo: true },
  { min: 14,  nome: "Labareda",      ext: ["#ff5a1f", "#c4161c"], int: ["#fff3b8", "#ff9f1a"], brasa: "#ffd166", escala: .54, brasas: 10, aro: "#ff6a1f", nucleo: true, laterais: true, pontos: true },
  { min: 30,  nome: "Chama Azul",    ext: ["#5b8cff", "#3b2fd1"], int: ["#e3f7ff", "#7fd3ff"], brasa: "#9fe2ff", escala: .56, brasas: 12, aro: "#5b8cff", nucleo: true, laterais: true, pontos: true, raios: "#7fb2ff", raiosQtd: 12 },
  { min: 60,  nome: "Chama Dourada", ext: ["#ffcc33", "#e07b00"], int: ["#fffbe0", "#ffe066"], brasa: "#ffe58a", escala: .58, brasas: 16, aro: "#ffc233", nucleo: true, laterais: true, pontos: true, raios: "#ffd966", raiosQtd: 16, louro: "#e0a400", estrelas: true },
  { min: 100, nome: "Lendária",      ext: ["#ff4fd8", "#7a2cff"], int: ["#ffffff", "#ffb8f2"], brasa: "#ffd6fa", escala: .58, brasas: 22, aro: "#c86bff", nucleo: true, laterais: true, raios: "#ff9ff0", raiosQtd: 16, louro: "#c86bff", estrelas: true, arcoiris: true },
  { min: 150, nome: "Esmeralda",     ext: ["#3ee08f", "#0b7a4b"], int: ["#effff6", "#8ff5c0"], brasa: "#b8ffd9", escala: .54, brasas: 18, aro: "#2fd07f", nucleo: true, laterais: true, estrelas: true, moldura: "hex" },
  { min: 200, nome: "Rubi",          ext: ["#ff4d6d", "#8f0a2a"], int: ["#fff0f3", "#ff9fb2"], brasa: "#ffc2cf", escala: .54, brasas: 20, aro: "#ff4d6d", nucleo: true, laterais: true, estrelas: true, moldura: "gema" },
  { min: 250, nome: "Cósmica",       ext: ["#7af0ff", "#5a2cff"], int: ["#ffffff", "#b8f6ff"], brasa: "#d6fbff", escala: .52, brasas: 22, aro: "#7a6bff", nucleo: true, laterais: true, moldura: "cosmos" },
  { min: 365, nome: "Coroa Solar",   ext: ["#ffe066", "#ff8a00"], int: ["#ffffff", "#fff2b3"], brasa: "#fff0a0", escala: .5,  brasas: 24, aro: "#ffb000", nucleo: true, laterais: true, estrelas: true, moldura: "sol", louro: "#d99a00", coroa: true },
  { min: 500, nome: "Chama Eterna",  ext: null,                  int: ["#ffffff", "#ffe6fb"], brasa: "#ffffff", escala: .48, brasas: 30, aro: "#ff9ff0", nucleo: true, laterais: true, estrelas: true, raios: "#ffffff", raiosQtd: 20, arcoiris: true, coroa: true, asas: true, prisma: true }
];
const nivelDe = (dias) => NIVEIS.reduce((acc, n, i) => dias >= n.min ? i : acc, 0);
const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ARCO_IRIS = ["#ff4f4f", "#ffb84f", "#fff04f", "#4fff8a", "#4fc8ff", "#9a4fff", "#ff4fd8", "#ff4f4f"];

// Ofensiva geral: dias com pelo menos um hábito marcado (mesma regra de "nunca falhar duas vezes")
function ofensivaDe(dados) {
  const habitos = (dados && dados.habitos) || [];
  const ativo = (n) => habitos.some(h => h.feitos[chaveDoDia(diasAtras(n))]);
  let n = ativo(0) ? 0 : 1, dias = 0, faltas = 0;
  while (n < 2000) {
    if (ativo(n)) { dias++; faltas = 0; } else { faltas++; if (faltas >= 2) break; }
    n++;
  }
  return { dias, acesaHoje: ativo(0) };
}

// ----- Peças do desenho -----
function caminhoChama(ctx, cx, base, w, h, f) {
  ctx.beginPath();
  ctx.moveTo(cx, base);
  ctx.bezierCurveTo(cx - w * .62, base, cx - w * .62, base - h * .42, cx - w * .3 + f * .5, base - h * .66);
  ctx.bezierCurveTo(cx - w * .14 + f, base - h * .8, cx - w * .02 + f, base - h * .86, cx + f * 1.4, base - h);
  ctx.bezierCurveTo(cx + w * .18 + f, base - h * .78, cx + w * .22, base - h * .74, cx + w * .3, base - h * .6);
  ctx.bezierCurveTo(cx + w * .4, base - h * .7, cx + w * .44, base - h * .72, cx + w * .46 + f * .4, base - h * .78);
  ctx.bezierCurveTo(cx + w * .66, base - h * .5, cx + w * .62, base, cx, base);
  ctx.closePath();
}
function pintarChama(ctx, cx, base, w, h, f, cores) {
  const g = ctx.createLinearGradient(0, base - h, 0, base);
  g.addColorStop(0, cores[0]); g.addColorStop(1, cores[1]);
  caminhoChama(ctx, cx, base, w, h, f);
  ctx.fillStyle = g; ctx.fill();
}
function estrela(ctx, x, y, r) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4, raio = i % 2 ? r * .3 : r;
    ctx.lineTo(x + Math.cos(a) * raio, y + Math.sin(a) * raio);
  }
  ctx.closePath(); ctx.fill();
}
function poligono(ctx, cx, cy, r, lados, giro) {
  ctx.beginPath();
  for (let i = 0; i < lados; i++) {
    const a = giro + i / lados * Math.PI * 2;
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  ctx.closePath();
}
// Número "aleatório" fixo, para as estrelas ficarem sempre no mesmo lugar
const pseudo = (i) => { const x = Math.sin(i * 127.1) * 43758.5453; return x - Math.floor(x); };

function desenharMoldura(ctx, S, c, N, t) {
  if (N.moldura === "hex") {
    poligono(ctx, c, c, S * .46, 6, Math.PI / 6);
    ctx.fillStyle = N.aro + "26"; ctx.fill();
    ctx.lineWidth = S * .03; ctx.strokeStyle = N.aro; ctx.stroke();
    poligono(ctx, c, c, S * .39, 6, Math.PI / 6);
    ctx.lineWidth = S * .008; ctx.strokeStyle = N.aro + "88"; ctx.stroke();
  }
  if (N.moldura === "gema") {
    const g = ctx.createLinearGradient(0, 0, S, S);
    g.addColorStop(0, N.aro + "40"); g.addColorStop(.5, N.aro + "14"); g.addColorStop(1, N.aro + "50");
    poligono(ctx, c, c, S * .47, 8, Math.PI / 8);
    ctx.fillStyle = g; ctx.fill();
    ctx.lineWidth = S * .025; ctx.strokeStyle = N.aro; ctx.stroke();
    ctx.lineWidth = S * .006; ctx.strokeStyle = N.aro + "70";
    for (let i = 0; i < 8; i++) {
      const a = Math.PI / 8 + i / 8 * Math.PI * 2;
      ctx.beginPath(); ctx.moveTo(c + Math.cos(a) * S * .47, c + Math.sin(a) * S * .47);
      ctx.lineTo(c + Math.cos(a) * S * .3, c + Math.sin(a) * S * .3); ctx.stroke();
    }
    poligono(ctx, c, c, S * .3, 8, Math.PI / 8); ctx.stroke();
  }
  if (N.moldura === "cosmos") {
    const g = ctx.createRadialGradient(c, c, 0, c, c, S * .47);
    g.addColorStop(0, "#2a1a6e"); g.addColorStop(1, "#07051a");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c, c, S * .47, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 40; i++) {
      const a = pseudo(i) * Math.PI * 2, r = Math.sqrt(pseudo(i + 99)) * S * .44;
      ctx.globalAlpha = .35 + .65 * (Math.sin(t * 2 + i) + 1) / 2;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath(); ctx.arc(c + Math.cos(a) * r, c + Math.sin(a) * r, S * (.004 + pseudo(i + 7) * .006), 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.save(); ctx.translate(c, c); ctx.rotate(-.35);
    ctx.strokeStyle = "#b8f6ff66"; ctx.lineWidth = S * .01;
    ctx.beginPath(); ctx.ellipse(0, 0, S * .42, S * .12, 0, 0, Math.PI * 2); ctx.stroke();
    const a = t * .9;
    ctx.fillStyle = "#ffcf6b";
    ctx.beginPath(); ctx.arc(Math.cos(a) * S * .42, Math.sin(a) * S * .12, S * .03, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  if (N.moldura === "sol") {
    ctx.save(); ctx.translate(c, c); ctx.rotate(t * .15);
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) {
      const a = i / 120 * Math.PI * 2;
      const r = S * (.42 + .045 * Math.sin(a * 18 + t * 2));
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    const g = ctx.createRadialGradient(0, 0, S * .2, 0, 0, S * .47);
    g.addColorStop(0, "#fff6c2"); g.addColorStop(1, N.aro + "aa");
    ctx.fillStyle = g; ctx.fill();
    ctx.restore();
  }
}

function desenharAsas(ctx, S, c, t) {
  const bate = Math.sin(t * 2) * .06;
  for (const lado of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const ang = -Math.PI / 2 + lado * (.55 + i * .22 + bate);
      const comp = S * (.3 - i * .025);
      const x0 = c + lado * S * .1, y0 = c + S * .06;
      const g = ctx.createLinearGradient(x0, y0, x0 + Math.cos(ang) * comp, y0 + Math.sin(ang) * comp);
      g.addColorStop(0, "#ffffff"); g.addColorStop(1, `hsl(${(t * 40 + i * 45) % 360}, 90%, 70%)`);
      ctx.save(); ctx.translate(x0, y0); ctx.rotate(ang);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.ellipse(comp / 2, 0, comp / 2, S * .035, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  }
}

function desenharCoroa(ctx, S, c) {
  const w = S * .24, h = S * .09, x = c - w / 2, y = c - S * .34;
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y + h * .2); ctx.lineTo(x + w * .25, y + h * .6);
  ctx.lineTo(x + w * .5, y - h * .1); ctx.lineTo(x + w * .75, y + h * .6);
  ctx.lineTo(x + w, y + h * .2); ctx.lineTo(x + w, y + h);
  ctx.closePath();
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, "#fff1a0"); g.addColorStop(1, "#e3a000");
  ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = S * .008; ctx.strokeStyle = "#a86f00"; ctx.stroke();
  ctx.fillStyle = "#ff4d6d";
  [[0, .2], [.5, -.1], [1, .2]].forEach(([px, py]) => { ctx.beginPath(); ctx.arc(x + w * px, y + h * py, S * .014, 0, Math.PI * 2); ctx.fill(); });
}

// ----- O emblema completo. S = tamanho em pixels, t = tempo em segundos -----
function desenharEmblema(ctx, S, nivel, t, opcoes) {
  const o = opcoes || {};
  const N = NIVEIS[nivel];
  const c = S / 2;
  ctx.save();
  ctx.clearRect(0, 0, S, S);

  if (o.bloqueado) {
    const css = getComputedStyle(document.documentElement);
    ctx.fillStyle = css.getPropertyValue("--line").trim() || "#ccc";
    ctx.globalAlpha = .6;
    ctx.beginPath(); ctx.arc(c, c, S * .44, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = css.getPropertyValue("--muted").trim() || "#888";
    caminhoChama(ctx, c, c + S * .2, S * .3, S * .42, 0); ctx.fill();
    ctx.restore(); return;
  }
  if (o.apagada) ctx.globalAlpha = .5;
  const alfa = ctx.globalAlpha;

  // Cores da chama (a Chama Eterna troca de cor o tempo todo)
  const ext = N.prisma
    ? [`hsl(${(t * 50) % 360}, 100%, 66%)`, `hsl(${(t * 50 + 80) % 360}, 95%, 48%)`]
    : N.ext;

  // Fundo
  if (N.moldura) desenharMoldura(ctx, S, c, N, t);
  else if (N.aro) {
    const rg = ctx.createRadialGradient(c, c, S * .1, c, c, S * .46);
    rg.addColorStop(0, N.aro + "55"); rg.addColorStop(1, N.aro + "11");
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(c, c, S * .46, 0, Math.PI * 2); ctx.fill();
  }
  if (N.raios) {
    ctx.save(); ctx.translate(c, c); ctx.rotate(t * .25);
    ctx.fillStyle = N.raios + (N.prisma ? "55" : "66");
    for (let i = 0; i < N.raiosQtd; i++) {
      ctx.rotate(Math.PI * 2 / N.raiosQtd);
      ctx.beginPath(); ctx.moveTo(-S * .025, S * .26); ctx.lineTo(0, S * .47); ctx.lineTo(S * .025, S * .26); ctx.fill();
    }
    ctx.restore();
  }
  if (N.pontos) {
    ctx.fillStyle = N.aro;
    for (let i = 0; i < 28; i++) {
      const a = i / 28 * Math.PI * 2 + (N.raios ? -t * .1 : 0);
      ctx.beginPath(); ctx.arc(c + Math.cos(a) * S * .43, c + Math.sin(a) * S * .43, S * .011, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (N.arcoiris && ctx.createConicGradient) {
    const cg = ctx.createConicGradient(t * .8, c, c);
    ARCO_IRIS.forEach((cor, i, a) => cg.addColorStop(i / (a.length - 1), cor));
    ctx.strokeStyle = cg; ctx.lineWidth = S * .035;
    ctx.beginPath(); ctx.arc(c, c, S * .465, 0, Math.PI * 2); ctx.stroke();
  }
  if (N.louro) {
    ctx.fillStyle = N.louro;
    for (const lado of [-1, 1]) {
      for (let i = 0; i < 7; i++) {
        const a = Math.PI / 2 + lado * (0.35 + i * 0.27);
        ctx.save(); ctx.translate(c + Math.cos(a) * S * .4, c + Math.sin(a) * S * .4); ctx.rotate(a + lado * 1.1);
        ctx.beginPath(); ctx.ellipse(0, 0, S * .045, S * .017, 0, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }
  }
  if (N.asas) desenharAsas(ctx, S, c, t);

  // Brilho atrás da chama
  const h = S * N.escala * (1 + (o.estouro || 0) * .15), w = h * .74;
  const base = c + h * .45;
  const brilho = ctx.createRadialGradient(c, base - h * .4, 0, c, base - h * .4, h * .8);
  brilho.addColorStop(0, N.int[1] + (nivel === 0 ? "22" : "88")); brilho.addColorStop(1, N.int[1] + "00");
  ctx.fillStyle = brilho; ctx.beginPath(); ctx.arc(c, base - h * .4, h * .8, 0, Math.PI * 2); ctx.fill();

  const f = (Math.sin(t * 6.1) * .05 + Math.sin(t * 9.7) * .03) * w;

  if (nivel === 0) {
    ctx.fillStyle = N.ext[1];
    ctx.beginPath(); ctx.ellipse(c, base - h * .12, w * .45, h * .16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = N.int[0]; ctx.lineWidth = S * .018; ctx.lineCap = "round";
    for (let i = 0; i < 2; i++) {
      const x = c + (i ? w * .15 : -w * .12), sobe = (t * .4 + i * .5) % 1;
      ctx.globalAlpha = alfa * (1 - sobe) * .8;
      ctx.beginPath(); ctx.moveTo(x, base - h * .3);
      ctx.bezierCurveTo(x + w * .2, base - h * .5, x - w * .2, base - h * .7, x + w * .05, base - h * (.85 + sobe * .2));
      ctx.stroke();
    }
    ctx.restore(); return;
  }

  if (N.laterais) {
    pintarChama(ctx, c - w * .42, base, w * .5, h * .6, -f * .8, ext);
    pintarChama(ctx, c + w * .42, base, w * .5, h * .62, f * .8, ext);
  }
  pintarChama(ctx, c, base, w, h, f, ext);
  pintarChama(ctx, c, base, w * .62, h * .66, f * .7, N.int);
  if (N.nucleo) pintarChama(ctx, c, base, w * .3, h * .32, f * .4, ["#ffffff", N.int[0]]);

  if (N.coroa) desenharCoroa(ctx, S, c);

  // Brasas subindo
  const qtd = N.brasas + Math.round((o.estouro || 0) * 20);
  for (let i = 0; i < qtd; i++) {
    const fase = (t * (.35 + (i % 5) * .06) + i * .37) % 1;
    const x = c + Math.sin(i * 12.99) * w * .55 + Math.sin(t * 2 + i) * w * .08;
    const y = base - h * .35 - fase * S * .45;
    ctx.fillStyle = N.prisma ? `hsl(${(i * 37 + t * 60) % 360}, 100%, 75%)` : N.brasa;
    ctx.globalAlpha = alfa * (1 - fase);
    ctx.beginPath(); ctx.arc(x, y, S * .013 * (1 - fase * .6), 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = alfa;

  if (N.estrelas) {
    ctx.fillStyle = N.moldura === "cosmos" ? "#ffffff" : "#fff6c2";
    [[.2, .25], [.8, .22], [.15, .62], [.86, .6], [.5, .1], [.3, .85], [.72, .86]].forEach(([px, py], i) => {
      const pisca = (Math.sin(t * 3 + i * 1.7) + 1) / 2;
      estrela(ctx, px * S, py * S, S * (.02 + pisca * .025));
    });
  }
  ctx.restore();
}

function prepararCanvas(canvas, tamanho) {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = tamanho * dpr; canvas.height = tamanho * dpr;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

function miniEmblema(dias) {
  const cv = document.createElement("canvas");
  cv.className = "mini-emblema"; cv.setAttribute("aria-hidden", "true");
  desenharEmblema(prepararCanvas(cv, 20), 20, nivelDe(dias), 0.4);
  return cv;
}

// Grava os níveis alcançados (com a data) e o recorde. Devolve true se algo mudou.
function registrarConquistas(dados) {
  const { dias } = ofensivaDe(dados);
  const nivel = nivelDe(dias);
  dados.conquistas = dados.conquistas || {};
  dados.recorde = dados.recorde || { dias: 0, data: null };
  let mudou = false;
  for (let i = 1; i <= nivel; i++) {
    if (!dados.conquistas[i]) { dados.conquistas[i] = hojeChave(); mudou = true; }
  }
  if (dias > dados.recorde.dias) { dados.recorde = { dias, data: hojeChave() }; mudou = true; }
  return mudou;
}
