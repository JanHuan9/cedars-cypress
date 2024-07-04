/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', (email, password) => {
    // Should implement login as api but for now we will use UI

    cy.session(email, () => {
        cy.intercept('/favicon.ico').as('favicon')
        cy.visit('/')
        cy.wait(3000) // Wait for 3000 ms to ensure the page is loaded
        cy.get('[data-testid="emailInput"]').focus().type(email)
        cy.get('[data-testid="passwordInput"]').focus().type(password)  
        cy.get('[data-testid="login_btn"]').click().then(() => {
            cy.wait(2000) // Wait for 1000 ms to ensure the page is loaded
            cy.get('[data-testid="ok_btn"]').should('be.visible').click() // Click default boundary
            cy.get('button').contains('Create new project').should('be.visible')
            
        })
    })
})

