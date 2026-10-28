# Hábito a Hábito

App de disciplina feito para estudar programação construindo algo útil: hábitos, foco, treino e uma ofensiva que evolui até 500 dias.

Funciona direto no navegador, sem instalar nada e sem servidor. Os dados ficam salvos no próprio navegador de quem usa.

## O que tem

**Hoje** (`index.html`)
- Hábitos com plano "quando… eu vou…", versão mínima para dias difíceis e horário
- Linha do tempo do dia com a hora atual
- Sequência que tolera uma falha ("nunca falhar duas vezes")
- Só o dia de hoje pode ser marcado: o histórico fica registrado
- Ofensiva com emblema animado que muda de nível

**Foco** (`foco.html`)
- Timer no estilo Pomodoro dentro de uma cena com fogueira
- A fogueira cresce durante o foco e apaga se você sair da aba por mais de 10 segundos
- Ambientes (noite, chuva, floresta, entardecer) com som gerado pelo navegador
- Caderno de distrações, tarefas com estimativa de blocos e relatório da semana

**Treino** (`treino.html`)
- Registro de exercícios, séries e cargas
- Recordes pessoais, timer de descanso e gráfico de evolução

**Conquistas** (`conquistas.html`)
- Trilha com 13 níveis de ofensiva, de 0 a 500 dias
- Desafios do mês com medalhas e números de sempre

## Como os arquivos se organizam

| Arquivo | Para que serve |
|---|---|
| `index.html` | Página Hoje (hábitos, linha do tempo, ofensiva) |
| `foco.html` | Página Foco |
| `treino.html` | Página Treino |
| `conquistas.html` | Página Conquistas |
| `comum.js` | Funções usadas por todas as páginas: datas, salvar dados, navegação |
| `chama.js` | O desenho da ofensiva em todos os níveis (canvas) |
| `comum.css` | Estilo da navegação e dos avisos |

## Como rodar

Abra o `index.html` no navegador. Para tudo funcionar igual ao site publicado, o ideal é usar um servidor local, por exemplo:

```bash
python3 -m http.server
```

e acessar `http://localhost:8000`.

## Tecnologias

HTML, CSS e JavaScript puros. Canvas para os desenhos animados, Web Audio API para os sons e `localStorage` para salvar os dados.

## A ciência por trás

- Intenções de implementação (plano "quando… eu vou…"): Gollwitzer e Oettingen
- Formação de hábitos em cerca de 66 dias, variando de 18 a 254: estudo de Lally e colegas
- Efeito recomeço (segundas e início do mês): Dai, Milkman e Riis
- Autoperdão e procrastinação: Wohl, Pychyl e Bennett
