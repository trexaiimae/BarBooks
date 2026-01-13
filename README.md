# BarBooks E2E & API Testing

This repository contains **Cypress end-to-end (E2E) tests** and **Jest API/utility tests** for the BarBooks project. It includes functionality for testing the checkout flow, validating item totals, and API headless testing.

---

## Prerequisites

Make sure you have **Node.js** and **npm** installed:

- Node.js >= 18.x  
- npm >= 9.x  

Check versions:

```bash
node -v
npm -v
```
## Install Tools
```bash
# Mochawesome for Cypress HTML reports
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator

# Jest for API / utility tests
npm install --save-dev jest

# TypeScript typings for Chai (optional, needed if using TypeScript + chai-json-schema)
npm install --save-dev @types/chai
```

##  Setup & Installation  

**1. Clone this repo** 
```bash
git clone https://github.com/trexaiimae/BarBooks.git
cd BarBooks
```

**2. Install Node.js (LTS version recommended)**  
[Download Node.js](https://nodejs.org/en/)

**3. Install Cypress**  
```bash
npm install cypress
```
**4. Install TypeScript **  
```bash
npm install --save-dev typescript @types/node @types/cypress
```

**5. Verify Cypress installation**  
```bash
npx cypress -v
```

▶️ Running the Tests

**Run Task 1 in Command Terminal**  
```bash
npm run test:CartTotal
```
**Run Task 2-4** 
**Option 1: Run via Cypress GUI**  
**1: Open Cypress GUI**  
```bash
npx cypress open
```

**2: Click on E2E testing**  
**3: Choose your preferred browser.**  

**4: Then select the spec you want to run in the Cypress runner:**  
➡️ MockAPIResponse.js  
➡️ APITestingHeadless.js  
➡️ E2EUIApplication.js



**Option 2: Run directly in CLI (headless mode)**  
```bash
# Run all Test
npm run runall

# Run MockAPIResponse
npm run mockAPI

# E2EApplication
npm run E2Etest

```


