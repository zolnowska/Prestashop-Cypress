/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

describe('Login in page:', () =>  {
    beforeEach(() => {
        cy.visit('http://127.0.0.1/prestashop/gb/login?back=my-account')
    })

    it('User login in by using correct email and correct password. User inputs first email then password, after user clicks button "SIGN IN".', () => {
        cy.get('[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test@test.com');
        cy.get('[name="password"]')
            .should('be.visible')
            .type('QWERTY12345');
        cy.get('[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('[class="account"] [class="hidden-sm-down"]', 'FirstName LastName')
            .should('be.visible');
        cy.contains('h1', 'Your account')
            .should('be.visible');
        cy.url()
            .should('include', 'my-account');
    })

    it('User login in by using correct email and password. User inputs first password then email, after user clicks button "SIGN IN".', () => {
        cy.get('[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test@test.com');
        cy.get('[name="password"]')
            .should('be.visible')
            .type('QWERTY12345');
        cy.get('[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('[class="account"] [class="hidden-sm-down"]', 'FirstName LastName')
            .should('be.visible');
        cy.contains('h1', 'Your account')
            .should('be.visible');
        cy.url()
            .should('include', 'my-account');
    })

    it('User tries to login in by using unregistered email and uncorrect password. User inputs first password then email, after user clicks button "SIGN IN".', () => {
        cy.get('[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test321@test.com');
        cy.get('[name="password"]')
            .should('be.visible')
            .type('1q2w3e4r5t');
        cy.get('[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('[class="alert alert-danger"]', 'Authentication failed.');
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('[id="submit-login"]', 'Sign in')
            .should('be.visible');
        cy.url()
            .should('include', 'my-account')
            .and('include', 'login');
    })

    it('User tries to login in by only click button "SIGN IN".', () => {
        cy.get('[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('[id="submit-login"]', 'Sign in')
            .should('be.visible');
        cy.url()
            .should('include', 'my-account')
            .and('include', 'login');
    })

    it('User tries to login in by using correct email. User doesnt input password, then clicks button "SIGN IN".', () => {
        cy.get('[name="password"]')
            .should('be.visible')
            .type('QWERTY12345');
        cy.get('[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('[id="submit-login"]', 'Sign in')
            .should('be.visible');
        cy.url()
            .should('include', 'my-account')
            .and('include', 'login');
    })

    it('User tries to login in by using correct password. User doesnt input email, after user clicks button "SIGN IN".', () => {
        cy.get('[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test@test.com');
        cy.get('[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('[id="submit-login"]', 'Sign in')
            .should('be.visible');
        cy.url()
            .should('include', 'my-account')
            .and('include', 'login');
    })

    it('User tries to login in by using correct email and 2 characters password, after user clicks button "SIGN IN".', () => {
        cy.get('[name="email"][class="form-control"]')
            .should('be.visible')
            .type('trewq@wp.com');
        cy.get('[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.get('[name="password"]')
            .should('be.visible')
            .type('2s');
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('[id="submit-login"]', 'Sign in')
            .should('be.visible');
        cy.get('[name="email"][class="form-control"]')
            .should('be.visible')
            .and('have.value', 'trewq@wp.com');
        cy.get('[name="password"]')
            .invoke('val')
            .should('have.length', 2);
        cy.url()
            .should('include', 'my-account')
            .and('include', 'login');
    })

})

