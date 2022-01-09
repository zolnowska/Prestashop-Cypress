/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

//const { should } = require("chai");

describe('Homepage:', () =>  {
    beforeEach(() => {
        cy.visit('http://127.0.0.1/prestashop/gb/')
    })
      
        it('Button "Contact Us" is displayed. User clicks this button.', () => {
            cy.contains('[id="contact-link"] a', 'Contact us')
                .click();
            cy.get('textarea').as('messageInput')
            cy.get('@messageInput')
                .invoke('attr', 'placeholder')
                //Why I can't type cy.cointains('@messageInput', 'How can we help?') to use alias?
                .should('contain', 'How can we help?')
            cy.get('@messageInput')
                .click();
            cy.url()
                .should('include', 'contact-us'); 
        })

        it('Button "English GB" to open drop-down to change language is displayed. User changes language of the website to Polish by using this dropdown.', () => {
            //English GB is default language and on dropdown are displayed Polski and English GB
            // user change language to English GB
            cy.url()
                .should('include', 'gb');
            cy.get('[class="hidden-sm-down btn-unstyle"] span').as('languageBtn');
            cy.get('@languageBtn')
                .should('have.text', 'English GB')
                .and('be.visible')
                .click();
            cy.get('[class="dropdown-menu hidden-sm-down"] a').first().as('firstLanguagedropdown');
            cy.get('@firstLanguagedropdown')
                .should('have.text', 'Polski')
                .and('be.visible');
            cy.get('[class="dropdown-menu hidden-sm-down"] a').eq(1).as('secondLanguagedropdown');
            cy.get('@secondLanguagedropdown')
                .should('have.text', 'English GB')
                .and('be.visible')
                .click();
            cy.url()
                .should('include', 'gb');
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
            cy.url()
                .should('include', 'pl'); 
        })

        it('Button "Sign in" is displayed. User clicks this button.', () => {
            cy.contains('[title="Log in to your customer account"] span', 'Sign in')
                .should('be.visible')
                .click();
            cy.contains('[class="no-account"] a', 'No account? Create one here')
                .should('be.visible')
                .click();
            cy.url()
                .should('include', 'create_account');
        })

        it('Button "Basket(0)" is displayed. This button is inactive and it doesnt have any product inside.', () => {
            cy.get('.cart-preview')
                .should('be.visible')
                .and('have.class', 'inactive');
            cy.contains('div[class="header"] span[class="hidden-sm-down"]', 'Basket')
                .should('be.visible');
            cy.contains('.cart-products-count', '(0)')
                .should('be.visible');
        })

    it('Button "CLOTHES" is displayed. User mouse-over this button and drop-down with buttons "MEN" and "WOMEN" buttones are displayed. User clicks "MEN" button.', () => {
        cy.get('#category-3')
        .realHover()
        cy.contains('[id="category-5"] a', 'Women')
            .should('be.visible');
        cy.contains('[id="category-4"] a', 'Men')
            .should('be.visible')
            .realClick();
        cy.contains('h1', 'Men')
            .should('be.visible');
    })

    it('Inputfield "Search our catalog" is displayed. User enters text "sweater" in this inputfield and clicks button with image of loupe.', () => {
        cy.get('input[aria-label="Search"]')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'Search our catalog')
            .type('sweater');
        cy.get('button[type="submit"]')
            .should('be.visible')
            .realClick();
        cy.contains('[data-id-product="2"] a', 'Hummingbird printed sweater')
            .should('be.visible');
        cy.contains('[class="regular-price"]', '£43.08')
            .should('be.visible');
        cy.contains('[class="price"]', '£34.46')
            .should('be.visible');
        cy.url()
            .should('include', 'search')
            .and('include', 's=sweater');
    })

    it('Banner is displayed. User clicks to check next and previous image on this banner.', () => {
        cy.get('[class="carousel-inner"]')
            .should('be.visible');
        cy.contains('[class="display-1 text-uppercase"]', 'Sample 1')
            .should('be.visible');
        cy.get('[class="icon-prev hidden-xs"] i')
            .should('be.visible')
            .realClick();
        cy.get('[class="carousel-inner"]')
            .should('be.visible');
        cy.contains('[class="display-1 text-uppercase"]', 'Sample 3')
            .should('be.visible');
        cy.get('[class="icon-next"] i')
            .should('be.visible')
            .realClick();
        cy.get('[class="carousel-inner"]')
            .should('be.visible');
        cy.contains('[class="display-1 text-uppercase"]', 'Sample 1')
            .should('be.visible');
    })

    it('List of popular products is displayed. User clicks product "Hummingbird printed t-shirt" of "white" colour.', () => {
        cy.contains('[class="h2 products-section-title text-uppercase"]', 'Popular Products')
            .should('be.visible');
        cy.contains('[data-id-product=1] a', 'Hummingbird printed t-shirt')
            .should('be.visible');
        cy.contains('[data-id-product=1] [class="product-flag discount"]', '-20%')
            .should('be.visible');
        cy.contains('[data-id-product=1] [class="product-flag new"]', 'New')
            .should('be.visible');
        cy.contains('[data-id-product=1] [class="regular-price"]', '£28.68')
            .should('be.visible');
        cy.contains('[data-id-product=1] [class="price"]', '£22.94')
            .should('be.visible');
        cy.get('[data-id-product=1] h3')
            .realHover();
        cy.get('[class="highlighted-informations hidden-sm-down"] [title="White"]')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Hummingbird printed t-shirt')
            .should('be.visible');
        cy.url()
            .should('include', 'hummingbird-printed-t-shirt')
            .and('include', 'size-s')
            .and('include', 'colour-white');
    })

    it('Button "All products" is displayed. User clicks this button.', () => {
        cy.contains('[class="featured-products clearfix"] a', 'All products')
            .should('be.visible')
            .click();
        cy.contains('h1', 'Home')
            .should('be.visible');
        cy.url()
            .should('include', 'home');
    })

    it('Inputfield "Your email address" is displayed. User enters already used e-mail in this inputfield.', () => {
        cy.get('[name="email"]').invoke('attr', 'placeholder')
            .should('contain', 'Your email address');
        cy.get('[name="email"]')
            .should('be.visible')
            .type("test@test.com");
        cy.get('[value="Subscribe"]')
            .should('be.visible')
            .click();
        cy.contains('[class="alert alert-danger block_newsletter_alert"]', 'This email address is already registered.')
            .should('be.visible');
    })
})