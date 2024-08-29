describe("Site Security and Permissions", () => {

    // This will run before each test
    beforeEach(() => {
        cy.visit('http://localhost:5173/');

        cy.get('h1').should('be.visible').and('have.text', 'Login');

        cy.get('#username').type('Giora'); 
        cy.get('#password').type('the drunk russian'); 
        cy.get('form#loginForm').submit();
    });


    it('Test if URL contains main.html', () => {
        cy.url().should('include', 'main.html'); 
    });


    it('Test if there exists a preview of a campaign', () => {
        cy.get('#campaignOverview');
    });

    it('Test if menu navigation works correctly', () => {
        cy.get('#bannerPage').click();
        cy.url().should('include', 'banner.html');
        cy.get('#marketingPage').click();
        cy.url().should('include','marketing.html');
        cy.get('#campaignPage').click();
        cy.url().should('include','campaign.html');
        cy.get('#logoutPage').click();
        cy.url().should('include','login.html');
        
    });


});