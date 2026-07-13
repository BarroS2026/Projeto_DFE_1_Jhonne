

const form = document.getElementById("login_Formulario");
const mensagem = document.getElementById("mensagem");


function mostrarMensagem(texto, cor) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();


    const nome_usuario = document.getElementById("usuario").value;
    const senha_acesso = document.getElementById("senha").value;

    if(nome_usuario === "" && senha_acesso === "") {
        mostrarMensagem("⚠️ Preencha usuário e senha", "red");
    }

    else if(nome_usuario === "") {
        mostrarMensagem("⚠️ Preencha o usuário", "red");
    }

    else if(senha_acesso === "") {
        mostrarMensagem("⚠️ Preencha a senha", "red");
    }

    else {
        const resposta_json = await fetch("data/usuarios.json");
        const usuarios = await resposta_json.json();

        const validacao_usuario = usuarios.find(function(busca_usuario_senha) {
            return busca_usuario_senha.usuario === nome_usuario && busca_usuario_senha.senha === senha_acesso;
        });

        if(validacao_usuario) {
            mostrarMensagem("✅ Login realizado com sucesso!", "green");
            localStorage.setItem("usuario_logado", nome_usuario);
            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            mostrarMensagem("❌ Usuário ou senha incorretos", "red");
        }
    }
});

/* lembrete para inserir emoji no vscode tecla Win + . */