# Playwright Automation Framework (TypeScript)

This repository contains a simple and clean **Playwright Automation
Framework** built using **TypeScript** and the **Page Object Model
(POM)** design pattern.\
It is designed for learning, interview preparation, and showcasing
hands-on automation skills.

## 🚀 Features

-   Playwright Test Runner\
-   Page Object Model (POM)\
-   Login test\
-   Add-to-Cart test\
-   Screenshots on failure\
-   Video recording\
-   Trace viewer\
-   HTML test report\
-   Easy-to-understand code structure

## 📁 Project Structure

    playwright-demo/
     ├── tests/
     │     ├── login.spec.ts
     │     └── products.spec.ts
     ├── pages/
     │     ├── LoginPage.ts
     │     └── ProductsPage.ts
     ├── playwright.config.ts
     └── README.md

## 🛠 Technology Stack

-   Playwright\
-   TypeScript\
-   Node.js\
-   VS Code

## 📦 Installation

Clone the repository:

``` bash
git clone https://github.com/<your-username>/playwright-demo.git
cd playwright-demo
```

Install dependencies:

``` bash
npm install
npx playwright install
```

## ▶ How to Run Tests

Run all tests:

``` bash
npx playwright test
```

Run tests in headed mode:

``` bash
npx playwright test --headed
```

Run a specific file:

``` bash
npx playwright test tests/login.spec.ts
```

## 📊 View Test Reports

Generate and open HTML report:

``` bash
npx playwright show-report
```

You will see:

-   Screenshots\
-   Video recordings\
-   Trace viewer\
-   Step-by-step execution

## 🧱 Page Object Model (POM)

### LoginPage Example

``` ts
async login(username: string, password: string) {
  await this.page.fill('#user-name', username);
  await this.page.fill('#password', password);
  await this.page.click('#login-button');
}
```

## 🧪 Test Scenarios

### 1. Login Test

Ensures valid user can log in successfully.

``` ts
expect(await products.isLoggedIn()).toBeTruthy();
```

### 2. Add to Cart Test

Verifies a product can be added to the shopping cart.

``` ts
await expect(page.locator('.inventory_item_name')).toBeVisible();
```

## 🌐 Application Under Test

Tests run against:

https://www.saucedemo.com/

## 🎯 Purpose of This Project

This project demonstrates the following automation skills:

-   Writing Playwright tests\
-   Identifying and handling locators\
-   Structuring a test framework\
-   Implementing POM\
-   Working with assertions\
-   Viewing reports (HTML, video, trace)\
-   Preparing hands-on experience for QA interviews

## 👤 Author

**Nithin B C**\
QA Engineer \| Manual + Automation Learner\
India

## ⭐ Support

If you find this project helpful, feel free to ⭐ star the repo.
