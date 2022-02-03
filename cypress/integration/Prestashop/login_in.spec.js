/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

describe('Login in page: ', () => {
  beforeEach(() => {
    cy.visit('/gb/login?back=my-account')
  })

  it(
    'User login in by using correct email and correct password. ' +
      'User inputs first email then password. After user clicks button "SIGN IN".',
    () => {
      cy.get('[name="email"][class="form-control"]').type('test@test.com')
      cy.get('[name="password"]').type('QWERTY12345')
      cy.get('[id="submit-login"]').click()
      cy.get('[class="account"] [class="hidden-sm-down"]')
        .should('be.visible')
        .contains('FirstName LastName')
      cy.get('h1').should('be.visible').contains('Your account')
      cy.url().should('include', 'my-account')
    }
  )

  it(
    'User login in by using correct email and password. ' +
      'User inputs first password then email. After user clicks button "SIGN IN".',
    () => {
      cy.get('[name="email"][class="form-control"]').type('test@test.com')
      cy.get('[name="password"]').type('QWERTY12345')
      cy.get('[id="submit-login"]').click()
      cy.get('[class="account"] [class="hidden-sm-down"]')
        .should('be.visible')
        .contains('FirstName LastName')
      cy.get('h1').should('be.visible').contains('Your account')
      cy.url().should('include', 'my-account')
    }
  )

  it(
    'User tries to login in by using unregistered email and uncorrect password. ' +
      'User inputs first password then email. After user clicks button "SIGN IN".',
    () => {
      cy.get('[name="email"][class="form-control"]').type('test321@test.com')
      cy.get('[name="password"]').type('1q2w3e4r5t')
      cy.get('[id="submit-login"]').click()
      cy.contains('[class="alert alert-danger"]', 'Authentication failed.')
      cy.get('h1').should('be.visible').contains('Log in to your account')
      cy.get('[id="submit-login"]').should('be.visible').contains('Sign in')
      cy.url().should('include', 'my-account').and('include', 'login')
    }
  )

  it('User tries to login in by only click button "SIGN IN".', () => {
    cy.get('[id="submit-login"]').click()
    cy.get('h1').should('be.visible').contains('Log in to your account')
    cy.get('[id="submit-login"]').should('be.visible').contains('Sign in')
    cy.url().should('include', 'my-account').and('include', 'login')
  })

  it(
    'User tries to login in by using correct email. ' +
      'User doesnt input password. After user clicks button "SIGN IN".',
    () => {
      cy.get('[name="password"]').type('QWERTY12345')
      cy.get('[id="submit-login"]').click()
      cy.get('h1').should('be.visible').contains('Log in to your account')
      cy.get('[id="submit-login"]').should('be.visible').contains('Sign in')
      cy.url().should('include', 'my-account').and('include', 'login')
    }
  )

  it(
    'User tries to login in by using correct password. ' +
      'User doesnt input email. After user clicks button "SIGN IN".',
    () => {
      cy.get('[name="email"][class="form-control"]').type('test@test.com')
      cy.get('[id="submit-login"]').click()
      cy.get('h1').should('be.visible').contains('Log in to your account')
      cy.get('[id="submit-login"]').should('be.visible').contains('Sign in')
      cy.url().should('include', 'my-account').and('include', 'login')
    }
  )

  it(
    'User tries to login in by using correct email and 2 characters password. ' +
      'After user clicks button "SIGN IN".',
    () => {
      cy.get('[name="email"][class="form-control"]').type('trewq@wp.com')
      cy.get('[id="submit-login"]').click()
      cy.get('[name="password"]').type('2s')
      cy.get('h1').should('be.visible').contains('Log in to your account')
      cy.get('[id="submit-login"]').should('be.visible').contains('Sign in')
      cy.get('[name="email"][class="form-control"]')
        .should('be.visible')
        .and('have.value', 'trewq@wp.com')
      cy.get('[name="password"]').invoke('val').should('have.length', 2)
      cy.url().should('include', 'my-account').and('include', 'login')
    }
  )
})
