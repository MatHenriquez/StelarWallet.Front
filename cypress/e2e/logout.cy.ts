describe('Brand', () => {
it('should redirect to home page when form is submitted', () => {
    cy.intercept('GET', '/Auth/UserToken', {
      statusCode: 200,
      fixture: 'dashboard/auth-token.json',
    }).as('getUserToken');

    cy.visit('/auth/login');

    cy.wait('@getUserToken');

    cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=null&FilterZeroBalances=false&PageNumber=1&PageSize=8',
        {
          statusCode: 200,
          fixture: 'dashboard/balances.json',
        },
      ).as('getBalances');  

    cy.wait('@getUserToken');
    cy.wait('@getBalances');
    cy.url().should('include', '/dashboard');

    cy.get('[data-cy=header]').should('exist');

    cy.get('[data-cy=avatar-button]').click();
    cy.get('[data-cy=logout-button]').trigger('click');

    cy.intercept('GET', '/Auth/UserToken', {
        statusCode: 401,
      });
    cy.url().should('include', '/auth/login');
  });
});