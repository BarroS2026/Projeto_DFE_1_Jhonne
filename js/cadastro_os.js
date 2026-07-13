const formularioOS = document.getElementById('formOS');
const mensagemOS = document.getElementById('mensagem-os');

function carregarClientes() {
  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]'); 
  const selectCliente = document.getElementById('cliente');

  selectCliente.innerHTML = '<option value="">Selecione um cliente</option>';

  clientes.forEach(function (cliente) {
    const option = document.createElement('option');
    option.value = cliente.nome;
    option.textContent = cliente.nome;
    selectCliente.appendChild(option);
  });
}

function carregarDadosIniciais() { 
  if (!localStorage.getItem('clientes')) { 
    fetch('data/clientes.json') 
      .then(function (resposta) { 
        return resposta.json();
      })
      .then(function (clientes) { 
        localStorage.setItem('clientes', JSON.stringify(clientes));
        carregarClientes();
      })
      .catch(function () { 
        localStorage.setItem('clientes', JSON.stringify([]));
        carregarClientes(); 
      });
  } else { 
    carregarClientes();
  }

  if (!localStorage.getItem('ordens')) { 
    fetch('data/ordens.json') 
      .then(function (resposta) { 
        return resposta.json(); 
      })
      .then(function (ordens) { 
        localStorage.setItem('ordens', JSON.stringify(ordens));
      });
  }
}

function mostrarMensagem(texto, cor) {
  mensagemOS.textContent = texto; 
  mensagemOS.style.color = cor; 
}

formularioOS.addEventListener('submit', function (event) {
  event.preventDefault();

  const cliente = document.getElementById('cliente').value; 
  const equipamento = document.getElementById('equipamento').value.trim(); 
  const numeroSerie = document.getElementById('numeroSerie').value.trim(); 
  const defeito = document.getElementById('defeito').value.trim(); 
  const status = document.getElementById('status').value; 

  if (!cliente || !equipamento || !numeroSerie || !defeito || !status) { 
    mostrarMensagem('Preencha todos os campos.', 'red');
    return; 
  }

  const ordens = JSON.parse(localStorage.getItem('ordens') || '[]'); 

  const novaOS = { 
    id: ordens.length + 1, 
    cliente: cliente,
    equipamento: equipamento, 
    numeroSerie: numeroSerie, 
    defeito: defeito, 
    status: status 
  };

  ordens.push(novaOS); 
  localStorage.setItem('ordens', JSON.stringify(ordens)); 

  mostrarMensagem('OS cadastrada com sucesso!', 'green');
  formularioOS.reset();
});

carregarDadosIniciais();