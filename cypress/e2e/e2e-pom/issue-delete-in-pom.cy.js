
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    });
  });
  
    it('Deletes issue successfully', () => {
      IssueModal.clickDeleteButton();
      IssueModal.confirmDeletion();
      IssueModal.validateIssueVisibilityState('This is an issue of type: Task.', false);
    });
    
  
    
  it('Should cancel deletion process successfully', () => {
    IssueModal.ensureIssueIsVisibleOnBoard
    IssueModal.clickDeleteButton
    IssueModal.cancelDeletion
    IssueModal.closeDetailModal
    IssueModal.validateIssueVisibilityState
      
    });
  

});