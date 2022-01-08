/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

//const { should } = require("chai");

describe('Top menu of homepage', () =>  {
    beforeEach(() => {
        cy.visit('http://127.0.0.1/prestashop/gb/')
    })
      
        it('displays button Contact Us', () => {
            cy.contains('[id="contact-link"] a', 'Contact us')
                .click();
            cy.get('textarea').as('messageInput')
            cy.get('@messageInput')
                .invoke('attr', 'placeholder')
                //Why I can't type .cointains(''How can we help?'') or use alias in cy.contains?
                .should('contain', 'How can we help?')
            cy.get('@messageInput')
                .click();
        })

        it('displays button with dropdown to change language on the website to English or Polish', () => {
            //English GB is default language and on dropdown are displayed Polski and English GB
            // user change language to English GB
            cy.get('[class="hidden-sm-down btn-unstyle"] span').as('languageBtn');
            cy.get('@languageBtn')
                .should('have.text', 'English GB')
                .and('be.visible')
                .click();
            cy.get('[class="dropdown-menu hidden-sm-down"]>li>a').first().as('firstLanguagedropdown');
            cy.get('@firstLanguagedropdown')
                .should('have.text', 'Polski')
                .and('be.visible');
            cy.get('[class="dropdown-menu hidden-sm-down"]>li>a').eq(1).as('secondLanguagedropdown');
            cy.get('@secondLanguagedropdown')
                .should('have.text', 'English GB')
                .and('be.visible')
                .click();
            //user change lanugage to Polski
            cy.get('@languageBtn') 
                .should('have.text', 'English GB')
                .and('be.visible')
                .click();
            cy.get('@secondLanguagedropdown')
                .should('have.text', 'English GB')
                .and('be.visible');
            cy.get('@firstLanguagedropdown')
                .should('have.text', 'Polski')
                .and('be.visible')
                .click();
            cy.get('@languageBtn')
                .should('have.text', 'Polski')
                .and('be.visible')
                .click();
            cy.get('@firstLanguagedropdown')
                .should('have.text', 'Polski')
                .and('be.visible');
            cy.get('@secondLanguagedropdown')
                .should('have.text', 'English GB')
                .and('be.visible');
        })

        it('displays button Sign in', () => {
            cy.contains('[title="Log in to your customer account"] span', 'Sign in')
                .should('be.visible')
                .click();
            cy.contains('[class="no-account"] a', 'No account? Create one here')
                .should('be.visible')
                .click();
        })

        it('displays button "Basket(0)" which is inactive and doesnt have product inside', () => {
            cy.get('.cart-preview')
                .should('be.visible')
                .and('have.class', 'inactive');
            cy.contains('div[class="header"] > span[class="hidden-sm-down"]', 'Basket')
                .should('be.visible');
            cy.contains('.cart-products-count', '(0)')
                .should('be.visible');
        })

    it('displays button "CLOTHES", after hover it displays drop-down with buttons "MEN" and "WOMEN"', () => {
        cy.get('#category-3').realHover()
        cy.contains('#category-5 > a', 'Women')
            .should('be.visible');
        cy.contains('#category-4 > a', 'Men')
            .should('be.visible')
            .realClick();
        cy.contains('h1', 'Men')
            .should('be.visible');
    })

    it('displays search for products which after input text "sweater" and press button with loupe, it will diplay product including "sweater" in the name', () => {
        cy.get('input[aria-label="Search"]')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'Search our catalog')
            .type('sweater');
        cy.get('button[type="submit"]')
            .should('be.visible')
            .realClick();
        cy.contains('h2[class="h3 product-title"] > a', 'Hummingbird printed sweater')
            .should('be.visible');
        cy.contains('span[class="regular-price"]', '£43.08')
            .should('be.visible');
        cy.contains('span[class="price"]', '£34.46')
            .should('be.visible');
    })

    it('displays banner, user can click to check next and previous image on the banner', () => {
        cy.get('[class="carousel-inner"]')
            .should('be.visible');
        cy.contains('h2[class="display-1 text-uppercase"]', 'Sample 1')
            .should('be.visible');
        cy.get('[class="icon-prev hidden-xs"] > i')
            .should('be.visible')
            .realClick();
        cy.get('[class="carousel-inner"]')
            .should('be.visible');
        cy.contains('h2[class="display-1 text-uppercase"]', 'Sample 3')
            .should('be.visible');
        cy.get('[class="icon-next"] > i')
            .should('be.visible')
            .realClick();
        cy.get('[class="carousel-inner"]')
            .should('be.visible');
        cy.contains('h2[class="display-1 text-uppercase"]', 'Sample 1')
        .should('be.visible');
    })

    it('displays list of popular products', () => {
        cy.contains('[class="h2 products-section-title text-uppercase"]', 'Popular Products')
            .should('be.visible');
        cy.contains('[data-id-product=1] > div > div > h3 > a', 'Hummingbird printed t-shirt')
            .should('be.visible');
        cy.contains('[data-id-product=1] > div > ul > li[class="product-flag discount"]', '-20%')
            .should('be.visible');
        cy.contains('[data-id-product=1] > div > ul > li[class="product-flag new"]', 'New')
        .should('be.visible');
        cy.contains('[data-id-product=1] > div > div > div > span[class="regular-price"]', '£28.68')
            .should('be.visible');
        cy.contains('[data-id-product=1] > div > div > div > span[class="price"]', '£22.94')
            .should('be.visible');
        cy.get('[data-id-product=1] > div > div > h3')
            .realHover();
        cy.get('[class="highlighted-informations hidden-sm-down"] > div > a[title="White"]')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Hummingbird printed t-shirt')
        .should('be.visible');
    })

    it('displays button which allow to show all products available in this store', () => {
        cy.contains('[class="all-product-link float-xs-left float-md-right h4"]', 'All products')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Home')
            .should('be.visible');
    })

    it('displays message, that entered e-mail is already registered into newsletter', () => {
        cy.get('input[name="email"]').invoke('attr', 'placeholder')
            .should('contain', 'Your email address');
        cy.get('input[name="email"]')
            .should('be.visible')
            .type("test@test.com");
        cy.get('input[value="Subscribe"]')
            .should('be.visible')
            .click();
        cy.contains('[class="alert alert-danger block_newsletter_alert"]', 'This email address is already registered.')
            .should('be.visible');
    })
})