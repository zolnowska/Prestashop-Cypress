/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

describe('Login in page', () =>  {
    beforeEach(() => {
        cy.visit('http://127.0.0.1/prestashop/gb/login?back=my-account')
    })

    it('user login in by using correct email and correct password and he input first Email then Password, then he click button "SIGN IN"', () => {
        cy.get('input[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test@test.com');
        cy.get('input[name="password"]')
            .should('be.visible')
            .type('QWERTY12345');
        cy.get('button[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('[class="account"] > span[class="hidden-sm-down"]', 'FirstName LastName')
            .should('be.visible');
        cy.contains('h1', 'Your account')
            .should('be.visible');
    })

    it('user login in by using correct email and password and he input first Password then Email, then he click button "SIGN IN"', () => {
        cy.get('input[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test@test.com');
        cy.get('input[name="password"]')
            .should('be.visible')
            .type('QWERTY12345');
        cy.get('button[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('[class="account"] > span[class="hidden-sm-down"]', 'FirstName LastName')
            .should('be.visible');
        cy.contains('h1', 'Your account')
            .should('be.visible');
    })

    it('user try to login in by using unregistered email and uncorrect password and he input first Password then email, then he click button "SIGN IN"', () => {
        cy.get('input[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test321@test.com');
        cy.get('input[name="password"]')
            .should('be.visible')
            .type('1q2w3e4r5t');
        cy.get('button[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('[class="alert alert-danger"]', 'Authentication failed.');
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('button[id="submit-login"]', 'Sign in')
            .should('be.visible');
    })

    it('user try to login in by only click button "SIGN IN"', () => {
        cy.get('button[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('button[id="submit-login"]', 'Sign in')
            .should('be.visible');
    })

    it('user try to login in by using correct email and he doesnt input password, then he click button "SIGN IN"', () => {
        cy.get('input[name="password"]')
            .should('be.visible')
            .type('QWERTY12345');
        cy.get('button[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('button[id="submit-login"]', 'Sign in')
            .should('be.visible');
    })

    it('user try to login in by using correct password and he doesnt input email, then he click button "SIGN IN"', () => {
        cy.get('input[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test@test.com');
        cy.get('button[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('button[id="submit-login"]', 'Sign in')
            .should('be.visible');
    })

    it('user try to login in by using correct email and 2 characters password, then he click button "SIGN IN"', () => {
        cy.get('input[name="email"][class="form-control"]')
            .should('be.visible')
            .type('trewq@wp.com');
        cy.get('button[id="submit-login"]')
            .should('be.visible')
            .click();
        cy.get('input[name="password"]')
            .should('be.visible')
            .type('2s');
        cy.contains('h1', 'Log in to your account')
            .should('be.visible');
        cy.contains('button[id="submit-login"]', 'Sign in')
            .should('be.visible');
        cy.get('input[name="email"][class="form-control"]')
            .should('be.visible')
            .and('have.value', 'trewq@wp.com');
        cy.get('input[name="password"]')
            .invoke('val')
            .should('have.length', 2);
    })

})

