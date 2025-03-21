# Documentação do Projeto: Página de Login

## 1. **Criar Repositório para o Projeto**

O primeiro passo é criar um repositório no GitHub para armazenar o código-fonte e a estrutura do projeto.

### Passos:
- Acesse o GitHub e crie um novo repositório.
- Dê um nome ao repositório (ex: `login-page`).
- Escolha a visibilidade (público ou privado).
- Selecione a opção para criar o repositório com um arquivo `README.md` (opcional).
- Crie o repositório e copie a URL para realizar o clone.

### Comando para clonar:
```bash
git clone https://github.com/seu-usuario/login-page.git
```

---

## 2. **Criar o Esboço da Página de Login**

A página de login é composta por dois formulários principais: **Cadastro** e **Login**. O esboço inicial da página pode ser feito com HTML básico e deve incluir:
- Inputs para email, senha, e nome (para cadastro).
- Links para redes sociais (Facebook, Google, LinkedIn).
- Botões de ação para "Sign Up" e "Sign In".
- Estilização simples para o layout da página.

### Página de Login/Cadastro:

<div align="center">
    <img src="./images/login.png">
</div>

---

## 3. **Criar os Requisitos**

Os requisitos podem ser encontrados no link do Google Sheets fornecido: [Requisitos do Projeto](https://docs.google.com/spreadsheets/d/1sBozhmf2DiyuuFpKVSNXGExuf7cqiDg6zzc33_MyJ_4/edit?gid=0#gid=0).

- **Objetivo:** Certificar-se de que os requisitos do projeto estão claramente documentados para garantir que todas as funcionalidades da página sejam implementadas.
- **Ações:** Crie uma tabela com os requisitos funcionais, como:
  - Validação de campos (email e senha).
  - Login e cadastro com dados válidos/invalidos.
  - Exibição de mensagens de erro.
  - Funcionalidade de visualização de senha.

---

## 4. **Criar a Branch `html`**

Crie uma branch específica para o desenvolvimento da estrutura HTML da página.

### Passos:
```bash
git checkout -b html
```

Nessa branch, você vai realizar as modificações no arquivo HTML e submeter as mudanças para o repositório.

---

## 5. **Criar a Branch `css`**

Crie uma branch para a parte de estilização do projeto.

### Passos:
```bash
git checkout -b css
```

Essa branch será responsável pela criação do arquivo `styles.css` e adição de estilização à página de login.

---

## 6. **Criar a Branch `js`**

Crie uma branch para a implementação da lógica de JavaScript da página.

### Passos:
```bash
git checkout -b js
```

Nessa branch, você vai implementar as interações da página de login, como validação de campos, manipulação de erros, e exibição de mensagens.

---

## 7. **Criar a Branch do Framework**

Se o projeto utilizar algum framework, como **Bootstrap** ou **Tailwind CSS**, crie uma branch dedicada para a configuração e integração do framework.

### Passos:
```bash
git checkout -b framework
```

Esse framework será utilizado para melhorar a estrutura visual e responsiva da página.

---

## 8. **Instalação da Ferramenta de Testes**

Instale o **Cypress** (ou outra ferramenta de testes que você preferir) para automatizar os testes da página.

### Passos:
```bash
npm install cypress --save-dev
```

A instalação do Cypress permitirá rodar testes automatizados para garantir que as funcionalidades da página de login funcionem corretamente.

---

## 9. **Criar os Cenários de Teste**

Com base nos requisitos, crie os cenários de teste para validar as funcionalidades. Alguns exemplos de cenários podem ser:

- **Cenário 1:** Teste de Login com credenciais válidas.
- **Cenário 2:** Teste de Login com email inválido.
- **Cenário 3:** Teste de Login com senha incorreta.
- **Cenário 4:** Teste de Login com campos vazios.
- **Cenário 5:** Teste de Login com email e senha vazios.

### Exemplo de teste Cypress (Login com credenciais válidas):
```javascript
it('Login Válido', () => {
      cy.get('#username').type('usuario@example.com');
      cy.get('#password2').type('1q2w3e4r'); 
      cy.get('#button').click();
      cy.contains('Bem-vindo').should('be.visible');
    });
```

---

## 10. **Executar os Testes Funcionais com Base nos Requisitos**

Com os cenários de teste definidos, execute os testes para verificar se a implementação atende aos requisitos do projeto.

### Passos:
```bash
npx cypress open  # Para rodar o Cypress e verificar interativamente os testes
npx cypress run --headless   # Para rodar os testes em modo headless (sem interface)
```

---

## 11. **Deployar a Página no GitHub Pages**

Depois de validar que a página está funcionando corretamente, faça o deploy da página no GitHub Pages.

### Passos:
1. Crie a branch `gh-pages`:
   ```bash
   git checkout -b gh-pages
   ```
2. Faça o deploy com a ação `GitHub Pages` no fluxo de CI/CD.

---

## 12. **Criar os Testes Automatizados com Cypress**

Implemente testes automatizados no Cypress para validar funcionalidades como:

- **Validação de campos**.
- **Testes de login/cadastro**.
- **Erros ao enviar formulários incompletos**.
- **Mensagens de erro visíveis**.

Os testes serão executados de forma automática sempre que houver alterações no código.

---

## 13. **Validar os Resultados**

Após rodar os testes, valide se todos os cenários de teste passaram. Se algum teste falhar, faça ajustes no código até que todos os testes sejam bem-sucedidos.

---

## 14. **Criar o CI/CD**

Para automatizar o processo de deploy e testes, crie um arquivo de configuração do GitHub Actions (`.github/workflows/ci.yml`).

### Exemplo de configuração para CI/CD:

```yaml
name: Run Cypress tests and Deploy to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "cypress-tests"
  cancel-in-progress: false

jobs:
  cypress-tests-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # Passo 1: Checkout do código
      - name: Checkout code
        uses: actions/checkout@v4

      # Passo 2: Configurar Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'  # Usando uma versão estável do Node.js (18.x ou 16.x)

      # Passo 3: Instalar dependências
      - name: Install dependencies
        run: |
          npm install

      # Passo 4: Rodar os testes do Cypress
      - name: Run Cypress tests
        run: |
          npx cypress run --headless

      # Passo 5: Configurar Pages
      - name: Setup Pages
        uses: actions/configure-pages@v5

      # Passo 6: Fazer upload dos arquivos necessários para o GitHub Pages
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './site'  # Aqui você envia o diretório que contém seus arquivos estáticos (HTML, CSS, JS)

      # Passo 7: Fazer deploy para o GitHub Pages
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 15. **Preparar Apresentação do Projeto (1h)**

A apresentação do projeto deve incluir os seguintes tópicos:
- **Objetivo do Projeto**: Explicar o propósito da página de login.
- **Tecnologias Usadas**: Descrever as tecnologias utilizadas (HTML, CSS, JS, Cypress, GitHub Pages).
- **Testes Realizados**: Apresentar os testes criados e os cenários cobertos.
- **Demonstração**: Mostrar o funcionamento do sistema com base nos requisitos.
- **CI/CD**: Explicar o processo automatizado de testes e deploy com GitHub Actions.

--- 

Com essa documentação, você tem um guia completo para o desenvolvimento, testes e deploy da página de login, além de integrar o fluxo de trabalho automatizado com CI/CD.