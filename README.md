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
   Este projeto usa `fetch()` para carregar dados de arquivos JSON. Por isso, **não funciona
abrindo o `index.html` diretamente com duplo clique** (o protocolo `file://` bloqueia esse
tipo de requisição por segurança do navegador). É necessário rodar por um servidor local
ou publicado.

### Opção 1: VS Code + Live Server (recomendado para desenvolvimento)
1. Abra a pasta do projeto no VS Code.
2. **Abra o Chrome manualmente antes** (deixe ele já aberto, mesmo que em outra aba).
3. Clique com o botão direito no `index.html` e selecione **"Open with Live Server"**
   (ou clique em "Go Live" na barra inferior).
4. Com o Chrome já aberto, a página carrega normalmente de primeira, incluindo a
   animação de fundo.
5. Se o Chrome estiver fechado antes de clicar em "Go Live", ele vai abrir sozinho e a
   página pode carregar em branco na primeira tentativa — nesse caso, basta pressionar
   **F5** para recarregar.
6. Faça login com um dos usuários cadastrados em `data/usuarios.json`.

### Opção 2: Netlify Drop (para testar sem instalar nada)
1. Acesse [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta inteira do projeto para a área indicada.
3. Aguarde a publicação e acesse o link gerado — login e navegação funcionam
   normalmente, pois o site já roda em um servidor real.

## Observação
O projeto foi atualizado com melhorias de acessibilidade, responsividade, uso de métodos de array e integração com a Clipboard API.
