describe('Brand', () => {
it('should redirect to home page when form is submitted', () => {
    cy.intercept('GET', '/Auth/UserToken', {
      statusCode: 200,
      fixture: 'dashboard/auth-token.json',
    }).as('getUserToken');

    cy.visit('/auth/login');
    cy.wait('@getUserToken');

    cy.intercept('POST', '/Auth/Login', {
        statusCode: 200,
      fixture: 'login/success.json',
    }).as('successfulLogin');

    cy.intercept(
        'GET',
        '/Transaction/Balance?PublicKey=public_key&FilterZeroBalances=false&PageNumber=1&PageSize=4',
        {
          statusCode: 200,
          fixture: 'dashboard/balances.json',
        },
      ).as('getBalances');  

    cy.get('[data-cy=email-input]').type('valid@email.com');
    cy.get('[data-cy=password-input]').type('password');
    cy.get('[data-cy=submit-button]').click();

    cy.wait('@getBalances');
    cy.wait('@successfulLogin');
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