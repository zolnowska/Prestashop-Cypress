/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

//const { should } = require("chai");

describe("Homepage: ", () => {
  beforeEach(() => {
    cy.visit("/gb/");
  });

  it('User clicks button "Contact Us"', () => {
    cy.contains('[id="contact-link"] a', "Contact us").click();
    cy.get("textarea").as("messageInput");
    cy.get("@messageInput")
      .invoke("attr", "placeholder")
      .should("contain", "How can we help?");
    cy.get("@messageInput").click();
    cy.url().should("include", "contact-us");
  });

  it(
    "User changes language of the website to Polish and after changes back to English GB " +
      'by using drop down displayed after clicks button "English GB"',
    () => {
      //English GB is default language, on drop down is displayed Polski and English GB
      // user change language to Polski
      cy.url().should("include", "gb");
      cy.get('[class="hidden-sm-down btn-unstyle"] span').as("languageBtn");
      cy.get("@languageBtn").click();
      let secondLanguageDropDown = 1;
      cy.get('[class="dropdown-menu hidden-sm-down"] a')
        .eq(secondLanguageDropDown)
        .as("secondLanguageDropDown");
      cy.get("@secondLanguageDropDown")
        .should("be.visible")
        .and("have.text", "English GB");
      let firstLanguageDropDown = 0;
      cy.get('[class="dropdown-menu hidden-sm-down"] a')
        .eq(firstLanguageDropDown)
        .as("firstLanguageDropDown");
      cy.get("@firstLanguageDropDown").and("have.text", "Polski").click();
      cy.url().should("include", "pl");
      //user changes back lanugage to English GB
      cy.get("@languageBtn").should("have.text", "Polski").click();
      cy.get("@secondLanguageDropDown").and("have.text", "English GB").click();
      cy.url().should("include", "gb");
    }
  );

  it('User clicks button "Sign in".', () => {
    cy.contains(
      '[title="Log in to your customer account"] span',
      "Sign in"
    ).click();
    cy.contains(
      '[class="no-account"] a',
      "No account? Create one here"
    ).click();
    cy.url().should("include", "create_account");
  });

  it('Button "Basket(0)" is displayed. Its inactive and doesnt have any product inside.', () => {
    cy.get(".cart-preview").should("be.visible").and("have.class", "inactive");
    cy.get('div[class="header"] span[class="hidden-sm-down"]')
      .should("be.visible")
      .contains("Basket");
    cy.get(".cart-products-count").should("be.visible").contains("(0)");
  });

  it('User mouse-over button "CLOTHES" in top menu and clicks "MEN" button from the drop down.', () => {
    cy.get("#category-3").realHover();
    cy.get('[id="category-5"] a').should("be.visible").contains("Women");
    cy.get('[id="category-4"] a')
      .should("be.visible")
      .contains("Men")
      .realClick();
    cy.get("h1").should("be.visible").contains("Men");
  });

  it('User enters text "sweater" in inputfield "Search our catalog" and clicks button with image of loupe.', () => {
    cy.get('input[aria-label="Search"]')
      .should("have.attr", "placeholder", "Search our catalog")
      .type("sweater");
    cy.get('button[type="submit"]').should("be.visible").realClick();
    cy.get('[data-id-product="2"] a')
      .should("be.visible")
      .contains("Hummingbird printed sweater");
    cy.get('[class="regular-price"]').should("be.visible").contains("£43.08");
    cy.get('[class="price"]').should("be.visible").contains("£34.46");
    cy.url().should("include", "search").and("include", "sweater");
  });

  it("User clicks to check next and previous image on this banner.", () => {
    cy.get('[class="carousel-inner"]').should("be.visible");
    cy.get('[class="display-1 text-uppercase"]')
      .should("be.visible")
      .contains("Sample 1");
    cy.get('[class="icon-prev hidden-xs"] i').should("be.visible").realClick();
    cy.get('[class="carousel-inner"]').should("be.visible");
    cy.get('[class="display-1 text-uppercase"]')
      .should("be.visible")
      .contains("Sample 3");
    cy.get('[class="icon-next"] i').should("be.visible").realClick();
    cy.get('[class="carousel-inner"]').should("be.visible");
    cy.get('[class="display-1 text-uppercase"]')
      .should("be.visible")
      .contains("Sample 1");
  });

  it('User clicks the button "All products".', () => {
    cy.contains(
      '[class="featured-products clearfix"] a',
      "All products"
    ).click();
    cy.get("h1").should("be.visible").contains("Home");
    cy.url().should("include", "home");
  });

  it("User tries subscribe newsletter by already used e-mail", () => {
    cy.get('[name="email"]').type("test@test.com");
    cy.get('[value="Subscribe"]').click();
    cy.get('[class="alert alert-danger block_newsletter_alert"]')
      .should("be.visible")
      .contains("This email address is already registered.");
  });

  it(
    "Requests check if buttons in navigation bar have correct links" +
      "and return correct status response",
    () => {
      const pages = new Map();
      pages.set("gb/3-clothes", ['[id="category-3"] [data-depth="0"]']);
      pages.set("gb/4-men", ['[id="category-4"] [data-depth="1"]']);
      pages.set("gb/5-women", ['[id="category-5"] [data-depth="1"]']);
      pages.set("gb/6-accessories", ['[id="category-6"] [data-depth="0"]']);
      pages.set("gb/7-stationery", ['[id="category-7"] [data-depth="1"]']);
      pages.set("gb/8-home-accessories", [
        '[id="category-8"] [data-depth="1"]',
      ]);
      pages.set("gb/9-art", ['[id="category-9"] [data-depth="0"]']);

      for (const [url, selectors] of pages.entries()) {
        selectors.forEach((selector) => {
          cy.get(selector)
            .as("selector")
            .should("have.attr", "href")
            .and("include", url);
          cy.get("@selector").then((link) => {
            cy.request(link.prop("href"));
          });
        });
      }
    }
  );

  it(
    "Requests check if popular products have correct links " +
      "and return correct status response",
    () => {
      const pages = new Map();
      pages.set(
        "gb/men/1-1-hummingbird-printed-t-shirt.html#/1-size-s/8-colour-white",
        [
          '[data-id-product="1"] [class="thumbnail product-thumbnail"]',
          '[data-id-product="1"] [itemprop="url"]',
        ]
      );
      pages.set(
        "prestashop/gb/women/2-9-brown-bear-printed-sweater.html#/1-size-s",
        [
          '[data-id-product="2"] [class="thumbnail product-thumbnail"]',
          '[data-id-product="2"] [itemprop="url"]',
        ]
      );
      pages.set(
        "gb/art/3-13-the-best-is-yet-to-come-framed-poster.html#/19-dimension-40x60cm",
        [
          '[data-id-product="3"] [class="thumbnail product-thumbnail"]',
          '[data-id-product="3"] [itemprop="url"]',
        ]
      );
      pages.set(
        "gb/art/4-16-the-adventure-begins-framed-poster.html#/19-dimension-40x60cm",
        [
          '[data-id-product="4"] [class="thumbnail product-thumbnail"]',
          '[data-id-product="4"] [itemprop="url"]',
        ]
      );
      pages.set(
        "gb/art/5-19-today-is-a-good-day-framed-poster.html#/19-dimension-40x60cm",
        [
          '[data-id-product="5"] [class="thumbnail product-thumbnail"]',
          '[data-id-product="5"] [itemprop="url"]',
        ]
      );
      pages.set("gb/home-accessories/6-mug-the-best-is-yet-to-come.html", [
        '[data-id-product="6"] [class="thumbnail product-thumbnail"]',
        '[data-id-product="6"] [itemprop="url"]',
      ]);
      pages.set("gb/home-accessories/7-mug-the-adventure-begins.html", [
        '[data-id-product="7"] [class="thumbnail product-thumbnail"]',
        '[data-id-product="7"] [itemprop="url"]',
      ]);
      pages.set("gb/home-accessories/8-mug-today-is-a-good-day.html", [
        '[data-id-product="8"] [class="thumbnail product-thumbnail"]',
        '[data-id-product="8"] [itemprop="url"]',
      ]);

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
