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

### Optional Tools

- **Jest**: For API / utility tests outside Cypress  
- **Mochawesome**: For HTML reports of Cypress runs  
- **TypeScript**: Only if you plan to convert `.js` tests to `.ts`

##  Setup & Installation  

**1. Clone this repo** 
```bash
```bash
git clone https://github.com/trexaiimae/BarBooks.git
cd BarBooks
```
**2. Install Node.js [(LTS version recommended]([url](https://nodejs.org/en)))**  
- Make sure to select **“Add to PATH”** during installation (Windows). 
```bash
node -v
npm -v
```

**3. Install dependencies**  
```bash
npm install
npm install cypress
```
**4. Install dependencies**  
```bash
npm install cypress
```

**5. Verify Cypress installation**  
```bash
npx cypress -v
```

▶️ Running the Tests

**Option 1: Run via Cypress GUI**  
**1: Open Cypress GUI**  
```bash
npx cypress open
```

**2: Click on E2E testing**  
**3: Choose your preferred browser.** 
**4:Then select the spec you want to run in the cypress runner:
➡️MockAPIResponse.js
➡️APITestingHeadless.js
➡️E2EUIApplication.js



**Option 2: Run directly in CLI (headless mode)**  
```bash
# Run all Test
npm run runall

# Run MOckAPIResponse
npm run mockAPI

# E2EApplication
npm run E2Etest

```


