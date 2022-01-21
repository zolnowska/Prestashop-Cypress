/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

/// const { should } = require("chai");

describe("Footer: ", () => {
  before(() => {
    cy.visit("/gb/");
  });

  it(
    'User clicks button "New products" on the "Prices drop" subpage. ' +
      'After user clicks button "Sign in".',
    () => {
      cy.visit("/gb/prices-drop");
      cy.contains(
        '[id="link-product-page-new-products-1"]',
        "New products"
      ).click();
      cy.get('[id="js-product-list-header"]')
        .should("be.visible")
        .contains("New products");
      cy.get("h4").should("be.visible").contains("No products available yet");
      cy.get('[id="content"] p')
        .should("be.visible")
        .contains(
          "Stay tuned! More products will be shown here as they are added."
        );
      let searchCategoryInput = 1;
      cy.get('[aria-label="Search"]')
        .eq(searchCategoryInput)
        .should("be.visible")
        .and("have.attr", "placeholder", "Search our catalog");
      cy.contains('[title="Log in to your customer account"] span', "Sign in");
      let clothesSubmenuBtn = 0;
      cy.get('[class="category-sub-menu"] a')
        .eq(clothesSubmenuBtn)
        .should("be.visible")
        .and("have.text", "Clothes");
      cy.url().should("include", "new-products");
      cy.contains('[id="_desktop_user_info"] span', "Sign in").click();
      cy.get('[type="password"]').should("be.visible");
      cy.url().should("include", "login").and("include", "my-account");
    }
  );

  it(
    'User clicks button "Best sales" on the "New products" subpage. ' +
      'After user clicks button "Contact us".',
    () => {
      cy.visit("/gb/new-products");
      cy.contains(
        '[id="link-product-page-best-sales-1"]',
        "Best sales"
      ).click();
      cy.get('[id="js-product-list-header"]')
        .should("be.visible")
        .contains("Best sellers");
      cy.get('[id="wrapper"] span')
        .should("be.visible")
        .contains("Best sellers");
      cy.get('[id="content"] h4')
        .should("be.visible")
        .contains("No products available yet");
      cy.get('[type="email"]')
        .should("be.visible")
        .and("have.attr", "placeholder", "Your email address");
      cy.url().should("include", "best-sales");
      cy.contains('[id="contact-link"] a', "Contact us").click();
      cy.get('[id="contactform-message"] ')
        .should("be.visible")
        .and("have.attr", "placeholder", "How can we help?");
      cy.url().should("include", "contact-us");
    }
  );

  it(
    'User clicks button "Delivery" on the "Login in" subpage. ' +
      'After user clicks button "Art".',
    () => {
      cy.visit("/gb/login?back=my-account");
      cy.contains('[id="link-cms-page-1-2"]', "Delivery").click();
      cy.get('[id="main"] h1').should("be.visible").contains("Delivery");
      cy.get('[id="content"] h2')
        .should("be.visible")
        .contains("Shipments and returns");
      cy.get('[id="content"] h3')
        .should("be.visible")
        .contains("Your pack shipment");
      cy.url().should("include", "delivery");
      cy.contains('[id="category-9"] a', "Art").click();
      cy.url().should("include", "art");
    }
  );

  it(
    'User clicks button "Legal Notice" on the "Create an account" subpage. ' +
      'After user clicks button "Accessories".',
    () => {
      cy.visit("/gb/login?create_account=1");
      cy.contains('[id="link-cms-page-2-2"]', "Legal Notice").click();
      cy.get('[id="content-wrapper"] h1')
        .should("be.visible")
        .contains("Legal Notice");
      cy.get('[id="content"] h2').should("be.visible").contains("Legal");
      cy.get('[id="content"] h3').should("be.visible").contains("Credits");
      cy.url().should("include", "legal-notice");
      cy.contains('[id="category-6"] a', "Accessories").click();
      cy.url().should("include", "accessories");
    }
  );

  it(
    'User clicks button "Terms and conditions of use" on the "Acessories" subpage. ' +
      'After user clicks button "Home Accessories".',
    () => {
      cy.visit("/gb/6-accessories");
      cy.contains(
        '[id="link-cms-page-3-2"]',
        "Terms and conditions of use"
      ).click();
      cy.get('[id="main"] h1')
        .should("be.visible")
        .contains("Terms and conditions of use");
      cy.get('[id="content"] h1')
        .should("be.visible")
        .contains("Terms and conditions of use");
      cy.url().should("include", "terms-and-conditions-of-use");
      cy.get('[id="category-6"] a')
        .should("be.visible")
        .and("contain", "Accessories")
        .realHover();
      cy.get('[id="category-8"] a')
        .should("contain", "Home Accessories")
        .and("be.visible")
        .realClick();
      cy.url().should("include", "home-accessories");
    }
  );
});
