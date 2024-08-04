
describe("register form validation", () => {

    //for the first row
    it('registeration complete', () => {
      cy.visit('http://127.0.0.1:5500/pages/register.html');
  
      cy.get('h1').should('be.visible').and('have.text', 'טופס הרשמה');
      cy.get('#name')
        .should('have.attr', 'placeholder', 'שם מלא')
        .type('ישראל ישראלי');
  
      cy.get('#email')
        .should('have.attr', 'placeholder', 'כתובת מייל')
        .type('israel@example.com');
  
      cy.get('#password')
        .should('have.attr', 'placeholder', 'סיסמה')
        .type('Pass123!')
  
      cy.get('#btn').click();
  
      cy.get('#msg')
        .should('have.class', 'success')
        .and('have.text', 'ההרשמה בוצעה בהצלחה')
    })
  
  });