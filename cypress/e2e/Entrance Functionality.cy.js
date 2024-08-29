describe("Entrance Functionality", () => {

  // This will run before each test
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Trying to log in with a valid set of credentials', () => {

      cy.get('h1').should('be.visible').and('have.text', 'Login');

      cy.get('#username').type('Giora'); 
      cy.get('#password').type('the drunk russian'); 
      cy.get('form#loginForm').submit();

      cy.url().should('include', 'main.html'); 
  });

  it('Trying to log in with a invalid set of credentials', () => {

    cy.get('h1').should('be.visible').and('have.text', 'Login');

    cy.get('#username').type('He'); 
    cy.get('#password').type('242'); 
    cy.get('form#loginForm').submit();

    cy.get('#errorMessage').should('be.visible').and('have.text', 'Invalid username or password');

    cy.url().should('include', 'login.html');
});

  it('Trying to log in with a valid username but invalid password (unmatching)', () => {

    cy.get('h1').should('be.visible').and('have.text', 'Login');

    cy.get('#username').type('Nati'); 
    cy.get('#password').type('242'); 
    cy.get('form#loginForm').submit();

    cy.get('#errorMessage').should('be.visible').and('have.text', 'Invalid username or password');

    cy.url().should('include', 'login.html');
  });


  it('Trying to log in with invalid set of credentials 10 times to see if we get blocked', () => {

    for (let i = 0; i < 10; i++) {
      cy.get('h1').should('be.visible').and('have.text', 'Login');

      cy.get('#username').clear().type('He'); 
      cy.get('#password').clear().type('242'); 
      cy.get('form#loginForm').submit();

      cy.get('#errorMessage').should('be.visible').and('have.text', 'Invalid username or password');

      cy.url().should('include', 'login.html');
    }

    cy.get('#errorMessage').should('be.visible').and('have.text', 'Too many login attempts');
  });


});