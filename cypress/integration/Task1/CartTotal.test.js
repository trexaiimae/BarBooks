// cartTotal.test.ts
import { calculateCartTotal, CartItems } from "./cartCalculator";

test("TCS1: Item Cart Total Calculation - Valid Data", () => {
  const cart = [
    { product: "Mouse", price: "$5.50", qty: 3 },
    { product: "Keyboard", price: "$5.00", qty: 2 },
  ];
  const expectedTotal = 5.5 * 3 + 5 * 2; // manually calculated
  expect(calculateCartTotal(cart)).toBe(expectedTotal);
});

test("TCS2: Price has string $0 or has 0 quantity handling", () => {
  const cart = [
    { product: "Banana", price: "$0", qty: 5 },
    { product: "Grapes", price: "$3.00", qty: 0 },
  ];
  const expectedTotal = 0;
  expect(calculateCartTotal(cart)).toBe(expectedTotal);
});

test("TCS3: Incorrect data handling", () => {
  const cart = [
    { product: "Mango", price: "abc", qty: 3 },
    { product: "Peach", price: "$2.50", qty: 2 },
  ];
  const expectedTotal = 0 * 3 + 2.5 * 2; // parsed "abc" -> 0
  expect(calculateCartTotal(cart)).toBe(expectedTotal);
});

test("TCS4: String and Number Price handling", () => {
  const cart = [
    { product: "Mango", price: "$2", qty: 3 },
    { product: "Peach", price: "2.50", qty: 2 },
  ];
  const expectedTotal = 2 * 3 + 2.5 * 2;
  expect(calculateCartTotal(cart)).toBe(expectedTotal);
});
