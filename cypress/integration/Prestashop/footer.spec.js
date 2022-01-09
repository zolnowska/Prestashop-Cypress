/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

/// const { should } = require("chai");

describe('Footer subpages:', () =>  {
    before(() => {
        cy.visit('http://127.0.0.1/prestashop/gb/');
    })

    it('User clicks button "Prices drop" on the homepage.', () =>{
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
        cy.url()
            .should('include', 'prices-drop');
    })

    it('User clicks button "New products" on the "Prices drop" subpage, after user clicks button "Sign in".', () => {
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
        cy.url()
            .should('include', 'new-products');
        cy.contains('[id="_desktop_user_info"] span', 'Sign in')
            .should('be.visible')
            .click();
        cy.get('[type="password"]')
            .should('be.visible');
        cy.url()
            .should('include', 'login')
            .and('include', 'my-account');
    })

    it('User clicks button "Best sales" on the "New products" subpage, after user clicks button "Contact us".', () => {
        cy.visit('http://127.0.0.1/prestashop/gb/new-products');
        cy.contains('[id="link-product-page-best-sales-1"]', 'Best sales')
            .should('be.visible')
            .click();
        cy.contains('[id="js-product-list-header"]', 'Best sellers')
            .should('be.visible');
        cy.contains('[id="wrapper"] span', 'Best sellers')
            .should('be.visible');
        cy.contains('[id="content"] h4', 'Sorry for the inconvenience.')
            .should('be.visible');
        cy.get('[type="email"]')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'Your email address');
        cy.url()
            .should('include', 'best-sales');
        cy.contains('[id="contact-link"] a', 'Contact us')
            .should('be.visible')
            .click();
        cy.contains('[name="id_contact"] [value="2"]', 'Customer service')
            .should('be.visible');
        cy.url()
            .should('include', 'contact-us');
    })

    it('User clicks button "Delivery" on the "Login in" subpage, after user clicks button "Art".', () => {
        cy.visit('http://127.0.0.1/prestashop/gb/login?back=my-account');
        cy.contains('[id="link-cms-page-1-2"]', 'Delivery')
            .should('be.visible')
            .click();
        cy.contains('[id="main"] h1', 'Delivery')
            .should('be.visible');
        cy.contains('[id="content"] h2', 'Shipments and returns')
            .should('be.visible');
        cy.contains('[id="content"] h3', 'Your pack shipment')
            .should('be.visible');
        cy.url()
            .should('include', 'delivery');
        cy.contains('[id="category-9"] a', 'Art')
            .should('be.visible')
            .click();
        cy.url()
            .should('include', 'art');
    })

    it('User clicks button "Legal Notice" on the "Create an account" subpage, after user clicks button "Accessories".', () => {
        cy.visit('http://127.0.0.1/prestashop/gb/login?create_account=1');
        cy.contains('[id="link-cms-page-2-2"]', 'Legal Notice')
            .should('be.visible')
            .click();
        cy.contains('[id="content-wrapper"] h1', 'Legal Notice')
            .should('be.visible');
        cy.contains('[id="content"] h2', 'Legal')
            .should('be.visible');
        cy.contains('[id="content"] h3', 'Credits')
            .should('be.visible');
        cy.url()
            .should('include', 'legal-notice');
        cy.contains('[id="category-6"] a', 'Accessories')
            .should('be.visible')
            .click();
        cy.url()
            .should('include', 'accessories');
    })

    it('User clicks button "Terms and conditions of use" on the "Acessories" subpage, after user clicks button "Home Accessories".', () => {
        cy.visit('http://127.0.0.1/prestashop/gb/6-accessories');
        cy.contains('[id="link-cms-page-3-2"]', 'Terms and conditions of use')
            .should('be.visible')
            .click();
        cy.contains('[id="main"] h1', 'Terms and conditions of use')
            .should('be.visible');
        cy.contains('[id="content"] h1', 'Terms and conditions of use')
            .should('be.visible');
        cy.url()
            .should('include', 'terms-and-conditions-of-use');
        cy.get('[id="category-6"] a')
            .should('be.visible')
            .and('contain', 'Accessories')
            .realHover();
        cy.get('[id="category-8"] a')
            .should('be.visible')
            .and('contain', 'Home Accessories')
            .realClick();
        cy.url()
            .should('include', 'home-accessories');
    })
})