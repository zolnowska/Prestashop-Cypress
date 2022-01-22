/// import { find } from "cypress/types/lodash";
/// <reference types="cypress" />

describe("Create an account page:", () => {
  beforeEach(() => {
    cy.visit("/gb/login?create_account=1");
  });

  it('User doesnt input any data in the create account form. User just clicks button "SAVE".', () => {
    cy.get("h1").and("be.visible").contains("Create an account");
    cy.get('[name="firstname"]').as("firstNameInput");
    cy.get("@firstNameInput").should("be.visible");
    cy.get('[name="birthday"]')
      .should("be.visible")
      .and("have.attr", "placeholder", "YYYY-MM-DD");
    cy.contains('[data-link-action="save-customer"]', "Save").click();
    let termsAndConditions = 3;
    cy.get('[class="custom-checkbox"] label')
      .eq(termsAndConditions)
      .should("be.visible")
      .and(
        "contain",
        "I agree to the terms and conditions and the privacy policy"
      );
    cy.get("@firstNameInput").should("be.visible");
    let exampleOfBirthday = 2;
    cy.get('[class="form-control-comment"]')
      .eq(exampleOfBirthday)
      .should("be.visible")
      .and("contain", "(E.g.: 1970-05-31)");
    cy.get('[name="birthday"]')
      .should("be.visible")
      .and("have.attr", "placeholder", "YYYY-MM-DD");
    cy.get('[data-link-action="save-customer"]')
      .should("be.visible")
      .contains("Save");
    cy.url().should("include", "create_account");
  });

  it('User inputs all data with already used e-mail. User clicks button "SAVE".', () => {
    cy.get('[class="register-form"] p')
      .should("be.visible")
      .contains("Already have an account?");
    cy.get('[id="category-3"] [class="dropdown-item"]')
      .should("be.visible")
      .contains("Clothes");
    cy.get('[class="user-info"] [class="hidden-sm-down"]').as("signInBtn");
    cy.get("@signInBtn").should("be.visible").contains("Sign in");
    cy.get('[name="id_gender"][value="2"]').click();
    cy.get('[name="firstname"]').as("firstNameInput");
    cy.get("@firstNameInput").should("be.visible").clear().type("FirstName");
    cy.get('[name="lastname"]').should("be.visible").clear().type("LastName");
    cy.get('[name="email"][class="form-control"]')
      .should("be.visible")
      .clear()
      .type("test@test.com");
    cy.get('[name="password"]').should("be.visible").clear().type("Zxcvb1234%");
    cy.get('[name="birthday"]').as("birthdayInput");
    cy.get("@birthdayInput").should("be.visible").clear().type("2000-01-01");
    cy.get('[name="customer_privacy"]').click();
    cy.get('[name="psgdpr"]').click();
    cy.get('[data-link-action="save-customer"]').as("saveBtn");
    cy.get("@saveBtn").should("contain", "Save").click();
    cy.get('[class="alert alert-danger"]')
      .should("be.visible")
      .contains(
        "The email is already used, please choose another one or sign in"
      );
    cy.get("@firstNameInput").should("have.value", "FirstName");
    cy.get("@signInBtn").should("be.visible").contains("Sign in");
    cy.get("@birthdayInput").should("have.value", "2000-01-01");
    cy.get("@saveBtn").should("contain", "Save");
    cy.url().should("include", "create_account");
  });

  //Missing import of Faker library. In this case random e-mail and password can't be generated so this test is skiped
  //I could type script to generate e-mail alone but I know it's not recomended
  it('User inputs all correct data. User clicks button "SAVE".', () => {
    cy.get('[class="register-form"] p')
      .should("be.visible")
      .contains("Already have an account?");
    cy.get('[id="category-3"][class="dropdown-item"]')
      .should("be.visible")
      .contains("Clothes");
    cy.get('[class="user-info"][class="hidden-sm-down"]').as("signInBtn");
    cy.get("@signInBtn").should("be.visible").contains("Sign in");
    cy.get('[name="id_gender"][value="2"]').click();
    cy.get('[name="firstname"]').as("firstNameInput");
    cy.get("@firstNameInput").clear().type("FirstName");
    cy.get('[name="lastname"]').clear().type("LastName");
    cy.get('[name="email"][class="form-control"]')
      //input random, correct email
      .clear()
      .type("email@email.com");
    cy.get('[name="password"]')
      //input random, correct password
      .clear()
      .type("password");
    cy.get('[name="birthday"]').as("birthdayInput");
    cy.get("@birthdayInput").clear().type("2000-01-01");
    cy.get('[name="customer_privacy"]').click();
    cy.get('[name="psgdpr"]').click();
    cy.contains('[data-link-action="save-customer"]', "Save").click();
  });
});
