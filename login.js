// Alternar entre os painéis Sign In e Sign Up
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Função para carregar os usuários e senhas do arquivo JSON
function loadUsers() {
    return fetch('users.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao carregar o arquivo de usuários:', error);
            return {}; // Retorna um objeto vazio se houver erro
        });
}

// Função para exibir ou ocultar a senha
function togglePasswordVisibility(passwordFieldId, toggleButtonId) {
    const passwordField = document.getElementById(passwordFieldId);
    const toggleButton = document.getElementById(toggleButtonId);
    const icon = toggleButton.querySelector("i");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Adicione eventos de clique nos botões de visualização da senha
document.getElementById("togglePassword1").addEventListener("click", () => {
    togglePasswordVisibility("password1", "togglePassword1");
});

document.getElementById("togglePassword2").addEventListener("click", () => {
    togglePasswordVisibility("password2", "togglePassword2");
});

// Função de login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password2").value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = ""; // Limpa qualquer mensagem de erro anterior

    if (username === "" || password === "") {
        errorMessage.textContent = "E-mail e senha são obrigatórios!";
        errorMessage.classList.add("error");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(username)) {
        errorMessage.textContent = "E-mail inválido!";
        errorMessage.classList.add("error");
        return;
    }

    // Carregar usuários do arquivo JSON
    loadUsers().then(validUsers => {
        if (validUsers[username] && validUsers[username] === password) {
            window.location.href = "welcome/index.html"; // Redirecionar após login bem-sucedido
        } else {
            errorMessage.textContent = "E-mail ou senha inválidos!";
            errorMessage.classList.add("error");
        }
    });
}

// Detectar a tecla Enter para enviar o formulário de login
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Previne o envio do formulário
        login();
    }
});
