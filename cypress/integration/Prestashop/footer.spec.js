/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

/// const { should } = require("chai");

describe("Footer: ", () => {
  before(() => {
    cy.visit("/gb/");
  });

  //useless
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
      cy.get("h4")
        .should("be.visible")
        .contains("Sorry for the inconvenience.");
      cy.get('[id="content"] p')
        .should("be.visible")
        .contains("Search again what you are looking for");
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

  //useless
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
        .contains("Sorry for the inconvenience.");
      cy.get('[type="email"]')
        .should("be.visible")
        .and("have.attr", "placeholder", "Your email address");
      cy.url().should("include", "best-sales");
      cy.contains('[id="contact-link"] a', "Contact us").click();
      cy.get('[name="id_contact"] [value="2"]')
        .should("be.visible")
        .contains("Customer service");
      cy.url().should("include", "contact-us");
    }
  );

  //useless
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

  //useless
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

  //useless
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

  it("Check if footer categories have correct names", () => {
    const pages = new Map();
    pages.set("Prices drop", ['[id="link-product-page-prices-drop-1"]']);
    pages.set("New products", ['[id="link-product-page-new-products-1"]']);
    pages.set("Best sales", ['[id="link-product-page-best-sales-1"]']);
    pages.set("Delivery", ['[id="link-cms-page-1-2"]']);
    pages.set("Legal Notice", ['[id="link-cms-page-2-2"]']);
    pages.set("Terms and conditions of use", ['[id="link-cms-page-3-2"]']);
    pages.set("About us", ['[id="link-cms-page-4-2"]']);
    pages.set("Secure payment", ['[id="link-cms-page-5-2"]']);
    pages.set("Contact us", ['[id="link-static-page-contact-2"]']);
    pages.set("Sitemap", ['[id="link-static-page-sitemap-2"]']);
    pages.set("Stores", ['[id="link-static-page-stores-2"]']);
    pages.set("Personal info", ['[title="Personal info"]']);
    pages.set("Orders", ['[title="Orders"]']);
    pages.set("Credit notes", ['[title="Credit notes"]']);
    pages.set("Addresses", ['[title="Addresses"]']);

    for (const [name, selectors] of pages.entries()) {
      selectors.forEach((selector) => {
        cy.get(selector).should("be.visible").and("contain", name);
      });
    }
  });

  it(
    "Requests check if footer categories have correct links " +
      "and return correct status response",
    () => {
      const pages = new Map();
      pages.set("gb/prices-drop", ['[id="link-product-page-prices-drop-1"]']);
      pages.set("gb/new-products", ['[id="link-product-page-new-products-1"]']);
      pages.set("gb/best-sales", ['[id="link-product-page-best-sales-1"]']);
      pages.set("gb/content/1-delivery", ['[id="link-cms-page-1-2"]']);
      pages.set("gb/content/2-legal-notice", ['[id="link-cms-page-2-2"]']);
      pages.set("gb/content/3-terms-and-conditions-of-use", [
        '[id="link-cms-page-3-2"]',
      ]);
      pages.set("gb/content/4-about-us", ['[id="link-cms-page-4-2"]']);
      pages.set("gb/content/5-secure-payment", ['[id="link-cms-page-5-2"]']);
      pages.set("gb/contact-us", ['[id="link-static-page-contact-2"]']);
      pages.set("gb/sitemap", ['[id="link-static-page-sitemap-2"]']);
      pages.set("gb/stores", ['[id="link-static-page-stores-2"]']);
      pages.set("gb/identity", ['[title="Personal info"]']);
      pages.set("gb/order-history", ['[title="Orders"]']);
      pages.set("gb/credit-slip", ['[title="Credit notes"]']);
      pages.set("gb/addresses", ['[title="Addresses"]']);

      for (const [url, selectors] of pages.entries()) {
        selectors.forEach((selector) => {
          cy.get(selector)
            .as("selector")
            .should("have.attr", "href")
            .and("include", url);
          cy.get("@selector").click().go("back");
          cy.get("@selector").then((link) => {
            cy.request(link.prop("href"));
          });
        });
      }
    }
  );
});
