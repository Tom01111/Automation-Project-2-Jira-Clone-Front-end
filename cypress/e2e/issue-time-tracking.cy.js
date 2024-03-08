describe('Time estimation functionality', () => {
  beforeEach(() => {
    visitBoard();
    cy.contains('This is an issue of type: Task.').should('be.visible').click();
  });
});
describe('Time estimation functionality', () => {
  const estimatedTime = '60';
  const estimatedTimeUpdated = '70';
  const loggedTime = '75';
  const loggedTimeUpdated = '60';
  const remainingTime = '130';
  const remainingTimeUpdated = '180';

  const visitBoard = () => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
  };

  const IssueDetailsmodal = () => cy.get('[data-testid="modal:issue-details"]');
  const TimetrackingWindow = () => cy.get('[data-testid="modal:tracking"]');

  beforeEach(() => {
    visitBoard();
  });

  it('Should add, edit, and remove time estimation', () => {
    IssueDetailsmodal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu')
        .click()
        .clear()
        .type(estimatedTime)
        .type('{enter}');
      cy.get('.sc-dxgOiQ.HrhWu').should('value', estimatedTime);
      cy.get('.sc-rBLzX.irwmBe').should('contain', estimatedTime);
      cy.get('.sc-bMvGRv.IstSR').click();
    });

    TimetrackingWindow().within(() => {
      cy.get('.sc-fhYwyz.jxvanQ').should('contain', estimatedTime);
      cy.get('[data-testid="icon:close"]').click().should('not.exist');
    });

    IssueDetailsmodal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu')
        .click()
        .clear()
        .type(estimatedTimeUpdated)
        .type('{enter}');
      cy.get('.sc-dxgOiQ.HrhWu').should('value', estimatedTimeUpdated);
      cy.get('.sc-rBLzX.irwmBe').should('contain', estimatedTimeUpdated);
      cy.get('.sc-bMvGRv.IstSR').click();
    });

    TimetrackingWindow().within(() => {
      cy.get('.sc-fhYwyz.jxvanQ').should('contain', estimatedTimeUpdated);
      cy.get('[data-testid="icon:close"]').click().should('not.exist');
    });

    IssueDetailsmodal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu').click().clear().type('{enter}');
      cy.get('.sc-dxgOiQ.HrhWu').should('be.empty');
      cy.get('.sc-rBLzX.irwmBe').find('div').should('have.length', 1);
      cy.get('.sc-bMvGRv.IstSR').click();
    });

    TimetrackingWindow().within(() => {
      cy.get('.sc-rBLzX.irwmBe').find('div').should('have.length', 1);
      cy.get('[data-testid="icon:close"]').click().should('not.exist');
    });
  });

  it('Should add, edit, and remove time spent and remaining', () => {
    IssueDetailsmodal().within(() => {
      cy.get('.sc-bMvGRv.IstSR').click();
    });

    TimetrackingWindow().within(() => {
      cy.get('input[placeholder="Number"]')
        .first()
        .click()
        .clear()
        .type(loggedTime);
      cy.get('input[placeholder="Number"]').eq(1).clear().type(remainingTime);
    });

    TimetrackingWindow().within(() => {
      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get('.sc-rBLzX.irwmBe')
      .should('contain', loggedTime)
      .and('contain', 'logged');
    cy.get('.sc-rBLzX.irwmBe')
      .should('contain', remainingTime)
      .and('contain', 'remaining');

    IssueDetailsmodal().within(() => {
      cy.get('.sc-bMvGRv.IstSR').click();
    });

    TimetrackingWindow().within(() => {
      cy.get('input[placeholder="Number"]')
        .first()
        .should('have.value', loggedTime)
        .clear()
        .type(loggedTimeUpdated);
      cy.get('input[placeholder="Number"]')
        .eq(1)
        .should('have.value', remainingTime)
        .clear()
        .type(remainingTimeUpdated);
    });

    TimetrackingWindow().within(() => {
      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get('.sc-rBLzX.irwmBe')
      .should('contain', loggedTimeUpdated)
      .and('contain', 'logged');
    cy.get('.sc-rBLzX.irwmBe')
      .should('contain', remainingTime)
      .and('contain', 'remaining');

    IssueDetailsmodal().within(() => {
      cy.get('.sc-bMvGRv.IstSR').click();
    });

    TimetrackingWindow().within(() => {
      cy.get('input[placeholder="Number"]').first().click().clear();
      cy.get('input[placeholder="Number"]').eq(1).click().clear();
    });

    TimetrackingWindow().within(() => {
      cy.contains('button', 'Done').click().should('not.exist');
    });

    cy.get('.sc-rBLzX.irwmBe').should('contain', 'No time logged');
    IssueDetailsmodal().within(() => {
      cy.get('[class="sc-dxgOiQ HrhWu"]').click().clear().type('{enter}');
      cy.get('.sc-dxgOiQ.HrhWu').should('be.empty');
    });
    cy.get('.sc-rBLzX.irwmBe').find('div').should('have.length', 1);
  });
});
