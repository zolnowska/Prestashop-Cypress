/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

//const { should } = require("chai");

import {
  banner,
  topMenu,
  navigation,
  popularProducts,
  newsletter,
  homepage,
  contactUs,
  loginIn,
  men,
  allProducts,
  searchResult,
} from "../../support/selectors.js";

describe("Homepage: ", () => {
  beforeEach(() => {
    cy.visit("/gb/");
  });

  it('User clicks button "Contact Us"', () => {
    cy.contains(topMenu.contactUsBtn, "Contact us").click();
    cy.get(contactUs.messageInput).as("messageInput");
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
      cy.get(topMenu.languageBtn).as("languageBtn");
      cy.get("@languageBtn").click();
      cy.get(topMenu.secondLanguageDropDown).as("secondLanguageDropDown");
      cy.get("@secondLanguageDropDown")
        .should("be.visible")
        .and("have.text", "English GB");
      cy.get(topMenu.firstLanguageDropDown).as("firstLanguageDropDown");
      cy.get("@firstLanguageDropDown").and("have.text", "Polski").click();
      cy.url().should("include", "pl");
      //user changes back lanugage to English GB
      cy.get("@languageBtn").should("have.text", "Polski").click();
      cy.get("@secondLanguageDropDown").and("have.text", "English GB").click();
      cy.url().should("include", "gb");
    }
  );

  it('User clicks button "Sign in".', () => {
    cy.contains(topMenu.signInBtn, "Sign in").click();
    cy.contains(
      loginIn.createAccountBtn,
      "No account? Create one here"
    ).click();
    cy.url().should("include", "create_account");
  });

  it('Button "Basket(0)" is displayed. Its inactive and doesnt have any product inside.', () => {
    cy.get(topMenu.basketBtn)
      .should("be.visible")
      .and("have.class", "inactive");
    cy.get(topMenu.basketText).should("be.visible").contains("Basket");
    cy.get(topMenu.basketproductsCountText)
      .should("be.visible")
      .contains("(0)");
  });

  it('User mouse-over button "CLOTHES" in top menu and clicks "MEN" button from the drop down.', () => {
    cy.get(navigation.clothesBtn).realHover();
    cy.get(navigation.womenBtn).should("be.visible").contains("Women");
    cy.get(navigation.menBtn).should("be.visible").contains("Men").realClick();
    cy.get(men.menText).should("be.visible").contains("Men");
  });

  it('User enters text "sweater" in inputfield "Search our catalog" and clicks button with image of loupe.', () => {
    cy.get(navigation.searchInput)
      .should("have.attr", "placeholder", "Search our catalog")
      .type("sweater");
    cy.get(navigation.searchSubmitBtn).click();
    cy.get(searchResult.hummingbridPrintedSweaterText)
      .should("be.visible")
      .contains("Hummingbird printed sweater");
    cy.get(searchResult.regularPriceText)
      .should("be.visible")
      .contains("£43.08");
    cy.get(searchResult.priceText).should("be.visible").contains("£34.46");
    cy.url().should("include", "search").and("include", "sweater");
  });

  it("User clicks to check next and previous image on this banner.", () => {
    cy.get(banner.section).as("section").should("be.visible");
    cy.get(banner.titleText)
      .as("titleText")
      .should("be.visible")
      .contains("Sample 1");
    cy.get(banner.previousBtn).click();
    cy.get("@section").should("be.visible");
    cy.get("@titleText").should("be.visible").contains("Sample 3");
    cy.get(banner.nextBtn).click();
    cy.get("@section").should("be.visible");
    cy.get("@titleText").should("be.visible").contains("Sample 1");
  });

  it('User clicks the button "All products".', () => {
    cy.contains(homepage.allProductsBtn, "All products").click();
    cy.get(allProducts.homeText).should("be.visible").contains("Home");
    cy.url().should("include", "home");
  });

  it("User tries subscribe newsletter by already used e-mail", () => {
    cy.get(newsletter.emailInput).type("test@test.com");
    cy.get(newsletter.subscribeBtn).click();
    cy.get(newsletter.alertText)
      .should("be.visible")
      .contains("This email address is already registered.");
  });

  it(
    "Requests check if buttons in navigation bar have correct links" +
      "and return correct status response",
    () => {
      const pages = new Map();
      pages.set("gb/3-clothes", [navigation.clothesBtn]);
      pages.set("gb/4-men", [navigation.menBtn]);
      pages.set("gb/5-women", [navigation.womenBtn]);
      pages.set("gb/6-accessories", [navigation.accessoriesBtn]);
      pages.set("gb/7-stationery", [navigation.stationeryBtn]);
      pages.set("gb/8-home-accessories", [navigation.homeAccessoriesBtn]);
      pages.set("gb/9-art", [navigation.artBtn]);

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
          popularProducts.tshirtHummingbirdImageBtn,
          popularProducts.tshirtHummingbirTitleBtn,
        ]
      );
      pages.set(
        "prestashop/gb/women/2-9-brown-bear-printed-sweater.html#/1-size-s",
        [
          popularProducts.sweaterHummingbirdImageBtn,
          popularProducts.sweaterHummingbirdTitleBtn,
        ]
      );
      pages.set(
        "gb/art/3-13-the-best-is-yet-to-come-framed-poster.html#/19-dimension-40x60cm",
        [
          popularProducts.framePosterTheBestImageBtn,
          popularProducts.framePosterTheBestTitleBtn,
        ]
      );
      pages.set(
        "gb/art/4-16-the-adventure-begins-framed-poster.html#/19-dimension-40x60cm",
        [
          popularProducts.framePosterAdventureImageBtn,
          popularProducts.framePosterAdventureTitleBtn,
        ]
      );
      pages.set(
        "gb/art/5-19-today-is-a-good-day-framed-poster.html#/19-dimension-40x60cm",
        [
          popularProducts.framePosterTodayImageBtn,
          popularProducts.framePosterTodayTitleBtn,
        ]
      );
      pages.set("gb/home-accessories/6-mug-the-best-is-yet-to-come.html", [
        popularProducts.mugTheBestImageBtn,
        popularProducts.mugTheBestTitleBtn,
      ]);
      pages.set("gb/home-accessories/7-mug-the-adventure-begins.html", [
        popularProducts.mugAdventureImageBtn,
        popularProducts.mugAdventureTitleBtn,
      ]);
      pages.set("gb/home-accessories/8-mug-today-is-a-good-day.html", [
        popularProducts.mugTodayImageBtn,
        popularProducts.mugTodayTitleBtn,
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
