describe("login form validation", () => {

  it('should redirect to main page for valid credentials', () => {
      cy.visit('http://localhost:5173/');

      cy.get('h1').should('be.visible').and('have.text', 'Login');

      cy.get('#username').type('Giora'); 
      cy.get('#password').type('the drunk russian'); 
      cy.get('form#loginForm').submit();

      cy.url().should('include', 'main.html'); 
  });
});
