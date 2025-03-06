describe('Teste de Login', () => {

    beforeEach(() => {
      // Visita a página de login antes de cada teste
      cy.visit('https://horadoqa.github.io/ci-cd-cypress/');
    });

    it('Cenário 1: Campos Vazios', () => {
      cy.get('#username').clear();
      cy.get('#password2').clear();
      cy.get('#button').click();
      cy.get('#error-message').should('contain', 'E-mail e senha são obrigatórios!');
    });

    it('Cenário 2: E-mail Válido e Senha Inválida', () => {
      cy.get('#username').type('usuario@example.com');
      cy.get('#password2').type('senhaInvalida');
      cy.get('#button').click();
      cy.get('#error-message').should('contain', 'E-mail ou senha inválidos!'); 
    });

    it('Cenário 3: E-mail Inválido e Senha Válida', () => {
      cy.get('#username').type('usuarioexample.com');
      cy.get('#password2').type('1q2w3e4r'); 
      cy.get('#button').click(); 
      cy.get('#error-message').should('contain', 'E-mail inválido!'); 
    });
  
    it('Cenário 4: Ambos Inválidos', () => {
      cy.get('#username').type('usuarioexample.com');
      cy.get('#password2').type('senhaIncorreta');
      cy.get('#button').click();
      cy.get('#error-message').should('contain', 'E-mail inválido!');
    });
    
    it('Cenário 5: Ambos Válidos', () => {
      cy.get('#username').type('usuario@example.com');
      cy.get('#password2').type('1q2w3e4r'); 
      cy.get('#button').click();
      cy.contains('Bem-vindo').should('be.visible');
    });
  });
  