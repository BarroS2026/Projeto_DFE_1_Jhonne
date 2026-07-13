console.log('Dashboard carregado'); 

const usuario = localStorage.getItem('usuario_logado');
if (!usuario) { 
  window.location.href = 'index.html';
}

const nomeUsuario = document.getElementById('nome-usuario');
if (nomeUsuario) {
  nomeUsuario.textContent = 'Usuário: ' + usuario;
}

let ordensVisiveis = []; 

async function carregarDadosMockados() { 
  try {
    const respostaClientes = await fetch('data/clientes.json');
    const respostaOrdens = await fetch('data/ordens.json');

    if (!respostaClientes.ok || !respostaOrdens.ok) {
      throw new Error('Erro ao carregar os dados JSON.');
    }

    const clientes = await respostaClientes.json();
    const ordens = await respostaOrdens.json();

    localStorage.setItem('clientes', JSON.stringify(clientes));
    localStorage.setItem('ordens', JSON.stringify(ordens));
  } catch (erro) {
    console.log('Não foi possível atualizar os dados:', erro);
  }
}

function pegarDados() {
  return JSON.parse(localStorage.getItem('ordens') || '[]');
}

function calcularResumo(ordens) {
  return ordens.reduce(function (resumo, ordem) {
    const status = ordem.status || 'aberto';
    resumo[status] = (resumo[status] || 0) + 1;
    return resumo;
  }, { aberto: 0, andamento: 0, concluida: 0 });
}

function renderizarTabela(ordens) {
  const tabela = document.getElementById('tabela-os');

  if (!tabela) {
    return;
  }

  const linhas = ordens.map(function (ordem) {
    return `
      <tr>
        <td data-label="#">${ordem.id}</td>
        <td data-label="Cliente">${ordem.cliente}</td>
        <td data-label="Equipamento">${ordem.equipamento}</td>
        <td data-label="Status">${ordem.status}</td>
        <td data-label="Nº Série">${ordem.numeroSerie || '-'}</td>
      </tr>
    `;
  });

  tabela.innerHTML = linhas.length
    ? linhas.join('')
    : `
      <tr>
        <td colspan="5">Nenhuma ordem encontrada.</td>
      </tr>
    `;
}

function carregarDados() {
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
  const ordens = pegarDados();
  const resumo = calcularResumo(ordens);

  ordensVisiveis = ordens;

  const totalClientes = document.getElementById('total-clientes');
  const totalOs = document.getElementById('total-os');
  const osConcluidas = document.getElementById('os-concluidas');
  const osAndamento = document.getElementById('os-andamento');
  const osAbertas = document.getElementById('os-abertas');

  if (totalClientes) totalClientes.textContent = clientes.length;
  if (totalOs) totalOs.textContent = ordens.length;
  if (osConcluidas) osConcluidas.textContent = resumo.concluida || 0;
  if (osAndamento) osAndamento.textContent = resumo.andamento || 0;
  if (osAbertas) osAbertas.textContent = resumo.aberto || 0;

  renderizarTabela(ordens);
}

const btnBusca = document.getElementById('btnBusca');

if (btnBusca) {
  btnBusca.addEventListener('click', function () {

    const campoBusca = document.getElementById('busca');
    const seletorStatus = document.getElementById('status');

    if (!campoBusca || !seletorStatus) {
      return;
    }

    const busca = campoBusca.value.toLowerCase();
    const status = seletorStatus.value;

    const ordens = pegarDados();

    const ordensFiltradas = ordens.filter(function (ordem) {

      const nomeOk = ordem.cliente.toLowerCase().includes(busca);
      const equipamentoOk = ordem.equipamento.toLowerCase().includes(busca);
      const statusOk = status === 'todos' || ordem.status === status;

      return (nomeOk || equipamentoOk) && statusOk;

    });

    ordensVisiveis = ordensFiltradas;
    renderizarTabela(ordensFiltradas);

  });
}


const btnCopiarResumo = document.getElementById('btnCopiarResumo');

if (btnCopiarResumo) {

  btnCopiarResumo.addEventListener('click', async function () {

    const mensagem = document.getElementById('mensagemResumo');

    if (!ordensVisiveis.length) {

      mensagem.textContent = '⚠ Nenhuma ordem para copiar.';
      mensagem.style.color = '#f59e0b';
      mensagem.classList.add('mostrar');

      setTimeout(function () {
        mensagem.classList.remove('mostrar');
        mensagem.textContent = '';
        mensagem.style.color = '#16a34a';
      }, 3000);

      return;
    }

    const textoResumo = ordensVisiveis.map(function (ordem) {
      return `${ordem.id} - ${ordem.cliente} (${ordem.status})`;
    }).join('\n');

    try {

      await navigator.clipboard.writeText(textoResumo);

      mensagem.textContent = '✅ Resumo copiado com sucesso!';
      mensagem.style.color = '#16a34a';
      mensagem.classList.add('mostrar');

    } catch (erro) {

      mensagem.textContent = '❌ Não foi possível copiar o resumo.';
      mensagem.style.color = '#dc2626';
      mensagem.classList.add('mostrar');

    }

    setTimeout(function () {

      mensagem.classList.remove('mostrar');
      mensagem.textContent = '';
      mensagem.style.color = '#16a34a';

    }, 3000);

  });

}


async function inicializarDashboard() {

  await carregarDadosMockados();

  carregarDados();

}

inicializarDashboard();