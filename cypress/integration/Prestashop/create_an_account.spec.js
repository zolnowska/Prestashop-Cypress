/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />



describe('Create an account page:', () =>  {
    beforeEach(() => {
        cy.visit('http://127.0.0.1/prestashop/gb/login?create_account=1')
        })

    it('User just clicks button "SAVE".', () => {
        cy.contains('h1', 'Create an account')
            .should('be.visible');
        cy.get('[name="firstname"]')
            .should('be.visible');  
        cy.get('[name="birthday"]')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'YYYY-MM-DD');
        cy.contains('[data-link-action="save-customer"]', 'Save')
            .should('be.visible')
            .click();  
        cy.get('[class="custom-checkbox"] label').eq(3)
            .should('be.visible')
            .and('contain', 'I agree to the terms and conditions and the privacy policy');
        cy.get('[name="firstname"]')
            .should('be.visible');  
        cy.get('[class="form-control-comment"]').eq(2)
            .should('be.visible')
            .and('contain', '(E.g.: 1970-05-31)');
        cy.get('[name="birthday"]')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'YYYY-MM-DD');  
        cy.contains('[data-link-action="save-customer"]', 'Save')
            .should('be.visible');
        cy.url()
            .should('include', 'create_account');   
    })

    it('User inputs all data with already used e-mail and user clicks button "SAVE".', () => {
        cy.contains('[class="register-form"] p', 'Already have an account?')
            .should('be.visible');
        cy.contains('[id="category-3"] [class="dropdown-item"]', 'Clothes')
            .should('be.visible');  
        cy.get('[class="user-info"] [class="hidden-sm-down"]').as('signInBtn')
        cy.get('@signInBtn')
            .should('be.visible')
            .and('have.text','Sign in');
        cy.get('[name="id_gender"][value="2"]')
            .click();
        cy.get('[name="firstname"]').as('firstNameInput')
        cy.get('@firstNameInput')
            .should('be.visible')
            .type('FirstName');
        cy.get('[name="lastname"]')
            .should('be.visible')
            .type('LastName');
        cy.get('[name="email"][class="form-control"]')
            .should('be.visible')
            .type('test@test.com');
        cy.get('[name="password"]')
            .should('be.visible')
            .type('Zxcvb1234%');
        cy.get('[name="birthday"]').as('birthdayInput')
        cy.get('@birthdayInput')
            .should('be.visible')
            .type('2000-01-01');
        cy.get('[name="customer_privacy"]')
            .click();
        cy.get('[name="psgdpr"]')
            .click();
        cy.get('[data-link-action="save-customer"]').as('saveBtn')
        cy.get('@saveBtn')
            .should('contain', 'Save')
            .and('be.visible')
            .click();  
        cy.contains('[class="alert alert-danger"]', 'The email is already used, please choose another one or sign in')
            .should('be.visible');
        cy.get('@firstNameInput')
            .should('have.value', 'FirstName')
            .and('be.visible');  
        cy.get('@signInBtn')
            .should('be.visible')
            .and('have.text', 'Sign in');
        cy.get('@birthdayInput')
            .should('have.value', '2000-01-01')
            .and('be.visible');  
        cy.get('@saveBtn')
            .should('be.visible')
            .and('contain', 'Save');  
        cy.url()
            .should('include', 'create_account');   
    })

    it.skip('User inputs all correct data and user clicks button "SAVE".', () => {
        cy.contains('[class="register-form"] p', 'Already have an account?')
            .should('be.visible');
        cy.contains('[id="category-3"][class="dropdown-item"]', 'Clothes')
            .should('be.visible');  
        cy.get('[class="user-info"][class="hidden-sm-down"]').as('signInBtn')
        cy.get('@signInBtn')
            .should('be.visible')
            .and('have.text', 'Sign in');
        cy.get('[name="id_gender"][value="2"]')
            .click();
        cy.get('[name="firstname"]').as('firstNameInput')
        cy.get('@firstNameInput')
            .should('be.visible')
            .type('FirstName');
        cy.get('[name="lastname"]')
            .should('be.visible')
            .type('LastName');
        cy.get('[name="email"][class="form-control"]')
            .should('be.visible')
            //input random, correct email
            .type("email@email.com");
        cy.get('[name="password"]')
            .should('be.visible')
            //input random, correct password
            .type("password");
        cy.get('[name="birthday"]').as('birthdayInput')
        cy.get('@birthdayInput')
            .should('be.visible')
            .type('2000-01-01');
        cy.get('[name="customer_privacy"]')
            .click();
        cy.get('[name="psgdpr"]')
            .click();
        cy.contains('[data-link-action="save-customer"]', 'Save')
            .should('be.visible')
            .click();
        //next part of tests after create an account missing   
    })
})

