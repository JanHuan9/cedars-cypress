describe('Test Login Page', () => {
  beforeEach(() => {
    cy.login('tester@helloworld.com', 'HelloWorld@2024')
    cy.visit('/account-management')
  })

  describe('Cancel create department', () => {
    it('Cancel', () => {
      // Test case for cancel button
      cy.get('[href="/account-management/create-department"]').click()
      cy.url().should('include', '/account-management/create-department')
      cy.get('[data-testid="cancel_btn"]').click()
      cy.url().should('include', '/account-management')
      cy.url().should('not.include', '/account-management/create-department')
    })
  })

  describe('Create department', () => {
    beforeEach(() => {
    cy.get('[href="/account-management/create-department"]').click()
    cy.url().should('include', '/account-management/create-department')
    })

    it('Name: " "', () => {
      // Test case for space
      cy.get('[data-testid="new_dept_name"]').focus().type(' ')
      cy.get('[data-testid="ok_btn"]').click()
      cy.get('[data-testid="close_btn"]').click()
      cy.get('td').invoke('text').then((text) => {expect(text).to.contain(' ')}) // get text a and assert
    })
  
    it('Name: "a"', () => {
      // Test case for 1 character
      cy.get('[data-testid="new_dept_name"]').focus().type('a')
      cy.get('[data-testid="ok_btn"]').click()
      cy.get('[data-testid="close_btn"]').click()
      cy.get('tbody').contains('a').should('exist') // get text a and assert
    })
  
    it('Name: "AA"', () => {
      // Test case for 2 characters
      cy.get('[data-testid="new_dept_name"]').focus().type('AA')
      cy.get('[data-testid="ok_btn"]').click()
      cy.get('[data-testid="close_btn"]').click()
      cy.get('tbody').should('exist') // get text a and assert
    })
  
    it('Name: "!@$%$^&*^&*()"', () => {
      // Test case for special characters
      cy.get('[data-testid="new_dept_name"]').focus().type('!@$%$^&*^&*()')
      cy.get('[data-testid="ok_btn"]').click()
      cy.get('[data-testid="close_btn"]').click()
      cy.get('tbody').contains('!@$%$^&*^&*()').should('exist') // get text a and assert
    })
  
    it('Name: "3hkbfu9hjKk3J09fhL20J3g792kjbf"', () => {
      // Test case for long characters(30)
      cy.get('[data-testid="new_dept_name"]').focus().type('3hkbfu9hjKk3J09fhL20J3g792kjbf')
      cy.get('[data-testid="ok_btn"]').click()
      cy.get('[data-testid="close_btn"]').click()
      cy.get('tbody').should('exist') // get text a and assert
    })
  
    it('Duplicate Name: "this is duplicate"', () => {
      // Test case for cancel button
      cy.get('[data-testid="new_dept_name"]').focus().type('this is duplicate')
      cy.get('[data-testid="ok_btn"]').click()
      cy.get('[data-testid="close_btn"]').click()
      cy.get('tbody').contains('this is duplicate').should('exist') // get text a and assert
      
      // Duplicate Name
      cy.get('[href="/account-management/create-department"]').click()
      cy.url().should('include', '/account-management/create-department')
      cy.get('[data-testid="new_dept_name"]').focus().type('this is duplicate')
      cy.get('p').contains('This department already exists. Please enter a new department name.').should('exist') // get text a and assert
      cy.get('[data-testid="cancel_btn"]').click() // cancel create department
      cy.get('section [data-testid="ok_btn"]').click() // confirm cancel create department
    })
  
    afterEach(() => {
      // tear down delete department
      cy.get('[data-testid="delete department"]').first().click()
      cy.get('[data-testid="ok_btn"]').click()
      cy.get('tbody').should('not.exist') // get text a and assert
    })
  })
})