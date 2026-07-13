# G@meService

## Objetivo
Este projeto é uma aplicação simples em HTML, CSS e JavaScript para controlar login, cadastro de clientes, cadastro de ordens de serviço e visualização do dashboard do sistema G@meService.

## Funcionalidades
- Login com validação usando dados em JSON
- Dashboard com cards e tabela de ordens
- Filtro por status e busca por cliente/equipamento
- Cálculo de resumos com uso de reduce()
- Renderização dinâmica de dados com map()
- Copiar resumo das ordens com Clipboard API
- Cadastro de clientes
- Busca de CEP via API (ViaCEP)
- A consulta ao ViaCEP depende de conexão com a internet e da disponibilidade do serviço; CEPs inválidos, indisponíveis ou problemas de rede podem retornar erro ou não preencher os campos automaticamente.
- Cadastro de ordens de serviço
- Dados iniciais mockados em arquivos JSON
- Menu responsivo com acessibilidade melhorada

## Estrutura de pastas
- `index.html` → tela de login
- `dashboard.html` → painel principal
- `cadastro_clientes.html` → formulário de cadastro de clientes
- `cadastro_os.html` → formulário de cadastro de ordens
- `css/` → arquivos de estilo
- `js/` → lógica do sistema
- `data/` → JSON com usuários, clientes e ordens

## Checklist do projeto

### Login
- [x] Tela de login criada
- [x] Validação de usuário e senha
- [x] Redirecionamento para o dashboard

### Dashboard
- [x] Cards com contadores
- [x] Tabela com ordens
- [x] Filtro por status
- [x] Busca por cliente/equipamento
- [x] Uso de map() e reduce()
- [x] Botão para copiar resumo das ordens

### Cadastro de clientes
- [x] Formulário com campos principais
- [x] Busca de CEP via API
- [x] Preenchimento automático de endereço, bairro, cidade e estado
- [x] Salvamento no localStorage

### Cadastro de OS
- [x] Formulário com campos necessários
- [x] Seleção de cliente
- [x] Salvamento no localStorage

### Dados mockados
- [x] Arquivos JSON na pasta `data`
- [x] Dados iniciais para clientes e ordens

### Organização do projeto
- [x] HTML, CSS e JS separados
- [x] CSS base compartilhado
- [x] README atualizado

## Como executar
Abra o arquivo `index.html` no navegador.

## Observação
O projeto foi atualizado com melhorias de acessibilidade, responsividade, uso de métodos de array e integração com a Clipboard API.
