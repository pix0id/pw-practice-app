import { test, expect } from "@playwright/test";

// beforeAll: use to run specific tests before running your whole test suite.
// for example, populating data or just any general precondition needed.
// test.beforeAll(() => {});

// beforeEach: Run this before every single test case.
// for example, if you need to return to a certain page or something before running each test case, this will run before each test.
/* test.beforeEach(async ({ page }) => {
  await page.goto("localhost:4200");
}); */

// basic test:
// param 1: string -> name of test
// param 2: callback -> action to run
// {page}: the page fixture represents the browser page object
/* test("first test", async ({ page }) => {
  await page.getByText("Form Layouts").click();
});

test("navigate to datepicker page", async ({ page }) => {
  await page.getByText("Datepicker").click();
}); */

// afterAll / afterEach: same as the beforeAll/beforeEach, but runs after your test cases.
// for example, run afterAll to delete test data from a database or afterEach to clear/fill an input field.
// test.afterEach(() => {})
// test.afterAll(() => {})

// group tests as part of a test suite
// param 1: string -> name
// param 2: function -> add your tests in the callback.
// the context of the different test suites will be different
// for example, pre-loaded data etc.
/* test.describe("test suite 1", () => {
  test("second test", () => {});
}); */

/* test.beforeEach(async ({ page }) => {
  await page.goto("localhost:4200");
}); */

/* test.describe("suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts", { exact: true }).click();
  });

  // basic test:
  // param 1: string -> name of test
  // param 2: callback -> action to run
  // {page}: the page fixture represents the browser page object
  test("charts test 1", async ({ page }) => {
    await page.getByText("Echarts", { exact: true }).click();
  });

  test("charts test 2", async ({ page }) => {
    await page.getByText("Charts", { exact: true }).click();
  });
});

test.describe("suite 2", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });

  test("forms test 1", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("forms test 2", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
}); */

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  // Use CSS values

  // by tag name - finds all input elements
  // if it is not unique, it will throw an error. Make sure to
  await page.locator("input").first().click();

  // by ID
  await page.locator("#inputEmail1").click();

  // by class
  page.locator(".shape-rectangle");

  // find by attribute
  page.locator('[placeholder="Email"]');

  // by full class value:
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  // combine different selectors
  page.locator('input[placeholder="email"].shape-rectangle');

  // by XPath {NOT RECOMMENDED}
  page.locator('//*[@id="email1"]');

  // by partial text match
  page.locator(':text("Using")');

  // by exact text match
  page.locator(":text-is('Using the Grid')");
});

// user facing locators
// best practice to have your locators resemble what the user sees on the page, instead of always grabbing ids or classes or whatnot

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click();
  await page.getByPlaceholder("Jane Doe").click();

  await page.getByText("Using the Grid").click();

  // Add the test id to your HTML code using the data-testid attribute.
  // example in form-layouts.component.html
  await page.getByTestId("SignIn").click();

  await page.getByTitle("IoT Dashboard").click();
});

test("locating child elements", async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();
  // you can also chain the locators
  // await page.locator('nb-card').locator('nb-radio') etc...

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  // select the 4th nb-card
  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("Locating parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("(':text-is('Using the Grid')")
    .locator("..")
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing the locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("test@example.com");

  await basicForm.getByRole("textbox", { name: "Password" }).fill("Password1!");

  await basicForm.locator("nb-checkbox").click();

  await basicForm.getByRole("button").click();

  await expect(emailField).toHaveValue("test@example.com");
});

test("Extracting values", async ({ page }) => {
  // single text value
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();

  expect(buttonText).toEqual("Submit");

  // all text values
  const allRadioButtonsLabels = await page
    .locator("nb-radio")
    .allTextContents();

  expect(allRadioButtonsLabels).toContain("Option 1");

  // Input value
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("test@test.com");

  const emailValue = await emailField.inputValue();

  expect(emailValue).toEqual("test@test.com");

  const placeholderValue = await emailField.getAttribute("placeholder");

  expect(placeholderValue).toEqual("Email");
});

test("assertions", async ({ page }) => {
  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .locator("button");

  // general assertions
  // Will be immediately executed when line of code is reached
  const value = 5;
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  // locator assertion
  // will wait up to 5 seconds to trigger
  await expect(basicFormButton).toHaveText("Submit");

  // soft assertion
  // continue test even if assertion failed
  await expect.soft(basicFormButton).toHaveText("Submit5");
  await basicFormButton.click();
});