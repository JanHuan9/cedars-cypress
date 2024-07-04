describe('Test Login Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check Login btn', () => {
    cy.get('[data-testid="emailInput"]').focus().type('tester@helloworld.com')
    cy.get('[data-testid="passwordInput"]').focus().type('HelloWorld')
    cy.get('[data-testid="login_btn"]').should('be.enabled')
  })

  it('Only insert account', () => {
    cy.get('[data-testid="emailInput"]').focus().type('tester@helloworld.com')
    cy.get('[data-testid="login_btn"]').should('be.disabled')
  })

  it('Only insert password', () => {
    cy.get('[data-testid="passwordInput"]').focus().type('HelloWorld@2024')
    cy.get('[data-testid="login_btn"]').should('be.disabled')
  })

  it('Wrong account', () => {
    cy.get('[data-testid="emailInput"]').focus().type('tester@helloworld.co')
    cy.get('[data-testid="passwordInput"]').focus().type('HelloWorld@2024')
    cy.get('[data-testid="login_btn"]').focus().click()
    cy.get('[data-testid="error_msg"]').should('be.exist')
  })

  it('Wrong password', () => {
    cy.get('[data-testid="emailInput"]').focus().type('tester@helloworld.com')
    cy.get('[data-testid="passwordInput"]').focus().type('HelloWorld')
    cy.get('[data-testid="login_btn"]').focus().click()
    cy.get('[data-testid="error_msg"]').should('be.exist')
  })

  it('Forgot Password page', () => {
    cy.wait(1500) // Wait for the page to load down
    cy.get('[data-testid="forget_password"]').click()
    cy.get('[data-testid="send_veri_email"]').should('be.exist')
  })

  it('Login successfully', () => {
    cy.get('[data-testid="emailInput"]').focus().type('tester@helloworld.com')
    cy.get('[data-testid="passwordInput"]').focus().type('HelloWorld@2024')
    cy.get('[data-testid="login_btn"]').click().then(() => {
      cy.get('[data-testid="logout_btn"]').should('exist'); // Assert login successfully
    });
  })
})