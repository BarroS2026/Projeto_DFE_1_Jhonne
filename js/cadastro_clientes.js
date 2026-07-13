const formularioCliente = document.getElementById('formCliente'); 
const mensagemCliente = document.getElementById('mensagem-cliente'); 
const botaoBuscarCep = document.getElementById('buscarCep');

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefone(telefone) {
  const somenteNumeros = telefone.replace(/\D/g, '');
  return somenteNumeros.length >= 10 && somenteNumeros.length <= 11;
}

async function buscarCep() {
  const cepInput = document.getElementById('cep'); 
  const cep = cepInput.value.replace(/\D/g, ''); 

  if (cep.length !== 8) {
    mensagemCliente.textContent = 'Digite um CEP válido com 8 números.';
    mensagemCliente.style.color = 'red'; 
    return; 
  }

  mensagemCliente.textContent = 'Buscando CEP...'; 
  mensagemCliente.style.color = '#666'; 

  try { 
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`); 
    const dados = await resposta.json(); 

    if (dados.erro) {
      mensagemCliente.textContent = 'CEP não encontrado.'; 
      mensagemCliente.style.color = 'red'; 
      return; 
    }

    cepInput.value = dados.cep;
    document.getElementById('endereco').value = dados.logradouro; 
    document.getElementById('bairro').value = dados.bairro; 
    document.getElementById('cidade').value = dados.localidade;
    document.getElementById('estado').value = dados.uf;

    mensagemCliente.textContent = 'CEP preenchido com sucesso!'; 
    mensagemCliente.style.color = 'green';
  } catch (erro) { 
    mensagemCliente.textContent = 'Não foi possível buscar o CEP.';
    mensagemCliente.style.color = 'red'; 
  }
}

function carregarClientesIniciais() {
  const clientesSalvos = localStorage.getItem('clientes');

  if (!clientesSalvos) {
    fetch('data/clientes.json') 
      .then(function (resposta) { 
        return resposta.json(); 
      })
      .then(function (clientes) { 
        localStorage.setItem('clientes', JSON.stringify(clientes));
      })
      .catch(function () {
        localStorage.setItem('clientes', JSON.stringify([]));
      });
  }
}

botaoBuscarCep.addEventListener('click', buscarCep);

formularioCliente.addEventListener('submit', function (event) { 
  event.preventDefault(); 

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const cep = document.getElementById('cep').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const bairro = document.getElementById('bairro').value.trim(); 
  const cidade = document.getElementById('cidade').value.trim();
  const estado = document.getElementById('estado').value; 
  const cepNumerico = cep.replace(/\D/g, '');

  if (!nome || !email || !telefone || !cep || !endereco || !bairro || !cidade || !estado) { 
    mensagemCliente.textContent = 'Preencha todos os campos.'; 
    mensagemCliente.style.color = 'red'; 
    return;
  }

  if (!validarEmail(email)) {
    mensagemCliente.textContent = 'Digite um e-mail válido.';
    mensagemCliente.style.color = 'red';
    return;
  }

  if (!validarTelefone(telefone)) {
    mensagemCliente.textContent = 'Digite um telefone válido com DDD e 8 ou 9 dígitos.';
    mensagemCliente.style.color = 'red';
    return;
  }

  if (cepNumerico.length !== 8) {
    mensagemCliente.textContent = 'Digite um CEP válido com 8 números.';
    mensagemCliente.style.color = 'red';
    return;
  }

  const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

  const novoCliente = {
    id: clientes.length + 1,
    nome: nome, 
    email: email, 
    telefone: telefone, 
    cep: cepNumerico,
    endereco: endereco,
    bairro: bairro, 
    cidade: cidade,
    estado: estado
  };

  clientes.push(novoCliente); 
  localStorage.setItem('clientes', JSON.stringify(clientes));

  mensagemCliente.textContent = 'Cliente cadastrado com sucesso!'; 
  mensagemCliente.style.color = 'green'; 
  formularioCliente.reset(); 
});

carregarClientesIniciais(); 
