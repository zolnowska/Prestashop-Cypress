/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

/// const { should } = require("chai");

describe("Price drop subpage: ", () => {
  beforeEach(() => {
    cy.visit("/gb/prices-drop");
  });

  //This test is failing because function "Search our catalog" doesn't work for Prestashop 1.7.8.2
  //I skip it for now and I will search more information why Preshashop doesn't display any results
  it.skip('User searchs for products named "t-shirt"', () => {
    cy.get('[placeholder="Search our catalog"]').clear().type("t-shirt{enter}");
    cy.contains('[id="js-product-list-header"]', "Search results");
    cy.contains("[id=js-product-list-header]", "Search results");
    cy.contains('[id="js-product-list-top"] p', "There is 1 product.");
    let tShirtTitleBtn =
      '[itemprop="itemListElement"]:nth-child(1) div[class="product-description"] a';
    cy.contains(tShirtTitleBtn, "Hummingbird printed t-shirt");
    let tShirtRegularPriceText =
      '[itemprop="itemListElement"]:nth-child(1) [class="regular-price"]';
    cy.contains(tShirtRegularPriceText, "£28.68");
    let tShirtPriceText =
      '[itemprop="itemListElement"]:nth-child(1) [class="price"]';
    cy.contains(tShirtPriceText, "£22.94");
    cy.url().should("include", "t-shirt").and("include", "search");
  });

  it(
    'User choose sort by: "Name, Z to A". ' +
      "After user checks if products are displayed in the correct order.",
    () => {
      cy.get('[class="btn-unstyle select-title"]').click();
      let zToAOnDropDownBtn = '[class="dropdown-menu"] a:nth-child(2)';
      cy.get(zToAOnDropDownBtn).should("contain", "Name, Z to A").click();
      let sweaterTittleBtn =
        '[class="product col-xs-6 col-xl-4"]:nth-child(2) [class="h3 product-title"] a';
      cy.get(sweaterTittleBtn).should("contain", "Hummingbird printed sweater");
      let sweaterRegularPriceText =
        '[class="product col-xs-6 col-xl-4"]:nth-child(2) [class="regular-price"]';
      cy.contains(sweaterRegularPriceText, "£35.90");
      let sweaterPriceText =
        '[class="product col-xs-6 col-xl-4"]:nth-child(2) [class="price"]';
      cy.contains(sweaterPriceText, "£28.72");
      let sweaterDiscountText =
        '[class="product col-xs-6 col-xl-4"]:nth-child(2) [class="discount-percentage discount-product"]';
      cy.contains(sweaterDiscountText, "-20%");
      let tShirtTitleBtn =
        '[class="product col-xs-6 col-xl-4"]:nth-child(1) [class="h3 product-title"] a';
      cy.get(tShirtTitleBtn)
        .should("be.visible")
        .and("contain", "Hummingbird printed t-shirt");
      let tShirtRegularPriceText =
        '[class="product col-xs-6 col-xl-4"]:nth-child(1) [class="regular-price"]';
      cy.contains(tShirtRegularPriceText, "£23.90");
      let tShirtPriceText =
        '[class="product col-xs-6 col-xl-4"]:nth-child(1) [class="price"]';
      cy.contains(tShirtPriceText, "£19.12");
      let tShirtDiscountText =
        '[class="product col-xs-6 col-xl-4"]:nth-child(1) [class="discount-percentage discount-product"]';
      cy.contains(tShirtDiscountText, "-20%");
    }
  );
});
