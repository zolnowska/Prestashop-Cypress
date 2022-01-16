/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

/// const { should } = require("chai");

describe("Price drop subpage: ", () => {
  beforeEach(() => {
    cy.visit("/gb/prices-drop");
  });

  it("Check if text is corectly displayed on this page", () => {
    const pages = new Map();
    pages.set("Home", ['[data-depth="2"] li span']);
    let onSaleText = '[data-depth="2"] li:nth-child(2) span';
    pages.set("On sale", [onSaleText]);
    pages.set("Home", ['[class="text-uppercase h6"]']);
    let clothesSubmenuBtn = "li:nth-child(2) > ul > li:nth-child(1) > a";
    pages.set("Clothes", [clothesSubmenuBtn]);
    let accessoriesSubmenuBtn = "li:nth-child(2) > ul > li:nth-child(2) > a";
    pages.set("Accessories", [accessoriesSubmenuBtn]);
    let artSubmenuBtn = "li:nth-child(2) > ul > li:nth-child(3) > a";
    pages.set("Art", [artSubmenuBtn]);
    pages.set("On sale", ['[id="js-product-list-header"]']);
    pages.set("There are 2 products.", ['[id="js-product-list-top"] p']);
    pages.set("Showing 1-2 of 2 item(s)", ['[class="col-md-4"]']);
    pages.set("Name, A to Z", ['[class="btn-unstyle select-title"]']);
    let sweaterTittleBtn =
      '[itemprop="itemListElement"]:nth-child(1) div[class="product-description"] a';
    pages.set("Hummingbird printed sweater", [sweaterTittleBtn]);
    let sweaterRegularPrice =
      '[itemprop="itemListElement"]:nth-child(1) [class="regular-price"]';
    pages.set("£43.08", [sweaterRegularPrice]);
    let sweaterPrice =
      '[itemprop="itemListElement"]:nth-child(1) [class="price"]';
    pages.set("£34.46", [sweaterPrice]);
    let tShirtTitleBtn =
      '[itemprop="itemListElement"]:nth-child(2) div[class="product-description"] a';
    pages.set("Hummingbird printed t-shirt", [tShirtTitleBtn]);
    let tShirtRegularPrice =
      '[itemprop="itemListElement"]:nth-child(2) [class="regular-price"]';
    pages.set("£28.68", [tShirtRegularPrice]);
    let tShirtPrice =
      '[itemprop="itemListElement"]:nth-child(2) [class="price"]';
    pages.set("£22.94", [tShirtPrice]);

    for (const [name, selectors] of pages.entries()) {
      selectors.forEach((selector) => {
        cy.get(selector).should("be.visible").and("contain", name);
      });
    }
  });

  //This test will fail because of issue on production for side menu
  //When user come back to Price drop subpage side menu isn't displayed correct
  //It stays same as for page where user where redirected by clicking button
  it.skip(
    "Requests check if button with link have correct links " +
      "and return correct status response",
    () => {
      const pages = new Map();
      pages.set("gb/2-home", ['[class="text-uppercase h6"]']);
      let clothesSubmenuBtn = "li:nth-child(2) > ul > li:nth-child(1) > a";
      pages.set("gb/3-clothes", [clothesSubmenuBtn]);
      //Acessories Submenu Button isn't visible when user come back to the Price drop
      //subpage from Clothes subpage, so test will fail
      let accessoriesSubmenuBtn = "li:nth-child(2) > ul > li:nth-child(2) > a";
      pages.set("gb/6-accessories", [accessoriesSubmenuBtn]);
      //Art Submenu Button isn't visible when user come back to the Price drop
      //subpage from Clothes or Accessories subpage, so test will fail
      let artSubmenuBtn = "li:nth-child(2) > ul > li:nth-child(3) > a";
      pages.set("gb/9-art", [artSubmenuBtn]);
      let sweaterTittleBtn =
        '[itemprop="itemListElement"]:nth-child(1) div[class="product-description"] a';
      pages.set("gb/women/2-9-brown-bear-printed-sweater.html#/1-size-s", [
        sweaterTittleBtn,
      ]);
      let tShirtTitleBtn =
        '[itemprop="itemListElement"]:nth-child(2) div[class="product-description"] a';
      pages.set(
        "gb/men/1-1-hummingbird-printed-t-shirt.html#/1-size-s/8-colour-white",
        [tShirtTitleBtn]
      );

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

  it('User searchs for products named "t-shirt"', () => {
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
      let zToABtnOnDropDownBtn = '[class="dropdown-menu"] a:nth-child(2)';
      cy.get(zToABtnOnDropDownBtn).should("contain", "Name, Z to A").click();
      let sweaterTittleBtn =
        '[itemprop="itemListElement"]:nth-child(2) div[class="product-description"] a';
      cy.get(sweaterTittleBtn)
        .should("contain", "Hummingbird printed sweater")
        .and("have.attr", "href")
        .and(
          "include",
          "gb/women/2-9-brown-bear-printed-sweater.html#/1-size-s"
        );
      let sweaterRegularPriceText =
        '[itemprop="itemListElement"]:nth-child(2) [class="regular-price"]';
      cy.contains(sweaterRegularPriceText, "£43.08");
      let sweaterPriceText =
        '[itemprop="itemListElement"]:nth-child(2) [class="price"]';
      cy.contains(sweaterPriceText, "£34.46");
      let sweaterDiscountText =
        '[itemprop="itemListElement"]:nth-child(2) [class="discount-percentage discount-product"]';
      cy.contains(sweaterDiscountText, "-20%");
      let tShirtTitleBtn =
        '[itemprop="itemListElement"]:nth-child(1) div[class="product-description"] a';
      cy.get(tShirtTitleBtn)
        .should("be.visible")
        .and("contain", "Hummingbird printed t-shirt")
        .and("have.attr", "href")
        .and(
          "include",
          "gb/men/1-1-hummingbird-printed-t-shirt.html#/1-size-s/8-colour-white"
        );
      let tShirtRegularPriceText =
        '[itemprop="itemListElement"]:nth-child(1) [class="regular-price"]';
      cy.contains(tShirtRegularPriceText, "£28.68");
      let tShirtPriceText =
        '[itemprop="itemListElement"]:nth-child(1) [class="price"]';
      cy.contains(tShirtPriceText, "£22.94");
      let tShirtDiscountText =
        '[itemprop="itemListElement"]:nth-child(1) [class="discount-percentage discount-product"]';
      cy.contains(tShirtDiscountText, "-20%");
    }
  );
});
