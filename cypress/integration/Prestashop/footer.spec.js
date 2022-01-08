/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

describe('Footer subpages', () =>  {
    before(() => {
        cy.visit('http://127.0.0.1/prestashop/gb/')
    })

    it.skip('User click footer button "Prices drop" on the homepage', () =>{
        cy.contains('[title="Our special products"]', 'Prices drop')
            .should('be.visible')
            .click();
        cy.contains('[id="js-product-list-header"]', 'On sale')
            .should('be.visible');
        //First product on discount
        cy.get('[itemprop="name"] a').first()
            .should('be.visible')
            .and('have.text', 'Hummingbird printed sweater');
        cy.get('[aria-label="Regular price"]').first()
            .should('be.visible')
            .and('have.text', '£43.08');
        cy.get('[aria-label="Price"]').first()
            .should('be.visible')
            .and('have.text', '£34.46');
        cy.get('[class="discount-percentage discount-product"]').first()
            .should('have.text', '-20%');
        //Second product on discount
        cy.get('[itemprop="name"] a').eq(1)
            .should('be.visible')
            .and('have.text', 'Hummingbird printed t-shirt');
        cy.get('[aria-label="Regular price"]').eq(1)
            .should('be.visible')
            .and('have.text', '£28.68');
        cy.get('[aria-label="Price"]').eq(1)
            .should('be.visible')
            .and('have.text', '£22.94');
        cy.get('[class="discount-percentage discount-product"]').eq(1)
            .should('have.text', '-20%');
    })
    it.only('User click Footer button "New products" on the "Prices drop" subpage', () => {
        cy.visit('http://127.0.0.1/prestashop/gb/prices-drop');
        cy.contains('[id="link-product-page-new-products-1"]', 'New products')
            .should('be.visible')
            .click();
        cy.contains('[id="js-product-list-header"]', 'New products')
            .should('be.visible');
        cy.contains('h4', 'Sorry for the inconvenience.')
            .should('be.visible');
        cy.contains('[id="content"] p', 'Search again what you are looking for')
            .should('be.visible');
        cy.get('[aria-label="Search"]').eq(1)
            .should('be.visible')
            .and('have.attr', 'placeholder', 'Search our catalog');
        cy.contains('[title="Log in to your customer account"] span', 'Sign in');
        cy.get('[class="category-sub-menu"] a').first()
            .should('have.text', 'Clothes');
    })
})