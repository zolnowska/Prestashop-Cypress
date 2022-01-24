/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

//const { should } = require("chai");

import {
  banner,
  topMenu,
  navigation,
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

  //This test is failing because function "Search our catalog" doesn't work for Prestashop 1.7.8.2
  //I skip it for now and I will search more information why Preshashop doesn't display any results
  it.skip('User searches "sweater" in inputfield "Search our catalog".', () => {
    cy.get(navigation.searchInput)
      .should("have.attr", "placeholder", "Search our catalog")
      .type("sweater{enter}");
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
});
