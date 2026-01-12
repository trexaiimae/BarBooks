import CartPage from "./CartPage";

class InventoryPage {

  sortLowToHigh() {
    cy.get('[data-test="product-sort-container"]').select("Price (low to high)");
  }

  addTwoCheapestItems() {
    // get all price elements
    cy.get(".inventory_item").then(items => {

      // extract prices and index
      const pricesWithIndex = [...items].map((item, index) => {
        const priceText = item.querySelector(".inventory_item_price").innerText;
        const price = parseFloat(priceText.replace("$", ""));
        return { price, index };
      });

    
      const sorted = pricesWithIndex.sort((a, b) => a.price - b.price);   // sort by price ascending

      cy.get(".inventory_item").eq(sorted[0].index).contains("Add to cart").click();
      cy.get(".inventory_item").eq(sorted[1].index).contains("Add to cart").click();
    });
  }

  goToCart() {
    cy.get(".shopping_cart_link").click();
    return new CartPage();
  }
}

export default InventoryPage;
