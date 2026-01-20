export type CartItem = { product: string; price: string | number; qty: number };

/**
 * Calculates the total price of items in the cart.
 * @param items - Array of cart items with product, price, and quantity.
 * @returns The total price rounded to 2 decimal places.
 */
export function calculateCartTotal(items: CartItem[]): number {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }

  const total = items.reduce((sum, { price, qty }) => {
    if (qty < 0) {
      throw new Error('Quantity cannot be negative');
    }

    const parsedPrice = parseFloat(String(price).replace(/[^0-9.-]/g, ''));

    if (isNaN(parsedPrice)) {
      throw new Error(`Invalid price for product: ${price}`);
    }

    return sum + parsedPrice * qty;
  }, 0);

  // Use toFixed for precise decimal rounding to avoid floating-point issues
  return parseFloat(total.toFixed(2));
}

