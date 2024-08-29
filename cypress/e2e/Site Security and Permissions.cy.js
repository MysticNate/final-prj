describe("Site Security and Permissions", () => {

    // This will run before each test
    beforeEach(() => {
    cy.visit('http://localhost:5173/');
    });


    it('Test if can access main page while not logged in', () => {

        cy.visit('http://localhost:5173/');

        cy.get('h1').should('be.visible').and('have.text', 'Login');

        cy.visit('http://localhost:5173/pages/main.html');

        cy.url().should('include', 'login.html'); 
    });


    it('Test Special char input in the campaign', () => {

        cy.get('h1').should('be.visible').and('have.text', 'Login');

        cy.get('#username').type('Giora'); 
        cy.get('#password').type('the drunk russian'); 
        cy.get('form#loginForm').submit();

        cy.url().should('include', 'main.html'); 

        cy.visit('http://localhost:5173/pages/campaign.html');

        cy.get('#campaignName').type('h###');
        cy.get('#startDate').type('2020-12-12');
        cy.get('#endDate').type('2024-12-12');
        cy.get('form#campaignForm').submit();
        cy.get('#errorMessage').should('be.visible').and('have.text', 'Campaign name must contain only letters.');
    });

    it('Test invalid date input in the campaign', () => {

        cy.get('h1').should('be.visible').and('have.text', 'Login');

        cy.get('#username').type('Giora'); 
        cy.get('#password').type('the drunk russian'); 
        cy.get('form#loginForm').submit();

        cy.url().should('include', 'main.html'); 

        cy.visit('http://localhost:5173/pages/campaign.html');

        cy.get('#campaignName').type('Hello World');
        cy.get('#startDate').type('2024-12-12');
        cy.get('#endDate').type('2022-12-12');
        cy.get('form#campaignForm').submit();
        cy.get('#errorMessage').should('be.visible').and('have.text', 'Invalid date range.');
    });


});