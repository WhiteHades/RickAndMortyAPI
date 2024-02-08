describe('2 - ProfileComponent E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/profile/1');
  });

  it('should display character details after page load', () => {
    cy.get('.profile-container').should('exist');
    cy.get('.character-image').should('be.visible');
    cy.get('h2').should('contain', 'Rick Sanchez');
    cy.get('p').contains('Status: Alive').should('exist');
    cy.get('.character-species').should('contain', 'Human');
  });

  it('should navigate back to the character list', () => {
    cy.get('.button-container').contains('Explore Characters').click({ force: true });
    cy.url().should('include', '/home');
  });

  it('should navigate to the next character when Next button is clicked', () => {
    cy.get('button').contains('Next').click({ force: true });
    cy.url().should('include', '/profile/2');
  });

  it('should navigate to the previous character when Previous button is clicked', () => {
    cy.visit('/profile/2');
    cy.get('button').contains('Previous').click({ force: true });
    cy.url().should('include', '/profile/1');
  });
});
