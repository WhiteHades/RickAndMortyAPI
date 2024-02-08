describe('1 - HomeComponent E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('should display characters after page load', () => {
    cy.get('.table').should('exist');
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('.character-avatar').should('have.length', 1);
        cy.get('.character-name').should('exist');
        cy.get('.character-species').should('exist');
        cy.get('.character-status').should('exist');
      });
    });
  });

  it('should filter characters based on search term', () => {
    cy.get('.search-container input').type('Rick');
    cy.get('.character-name').each(($el) => {
      cy.wrap($el).should('contain', 'Rick');
    });
  });

  it('should navigate to a character profile when avatar is clicked', () => {
    cy.get('.character-avatar').first().click();
    cy.url().should('include', '/profile/1');
  });
});
