import CartPage from "./CartPage";

class InventoryPage {
  sortLowToHigh() {
    cy.get('[data-test="product-sort-container"]').select("Price (low to high)");

  }

  addTwoCheapestItems() {
    
    cy.get(".inventory_item_price").then(priceEls => {
      const prices = [...priceEls].map(el => parseFloat(el.innerText.replace("$", "")));

      const sorted = prices
        .map((price, index) => ({ price, index }))
        .sort((a, b) => a.price - b.price);

      cy.get(".inventory_item")
        .eq(sorted[0].index)
        .contains("Add to cart")
        .click();

      cy.get(".inventory_item")
        .eq(sorted[1].index)
        .contains("Add to cart")
        .click();
    });
  }

  goToCart() {
    cy.get(".shopping_cart_link").click();
    return new CartPage();
  }
}

export default InventoryPage;
