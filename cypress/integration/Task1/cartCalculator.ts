export type CartItems= { product: string; price: string | number; qty: number };



export function calculateCartTotal(items: CartItems[]): number {
  const total = items.reduce((sum, { price, qty = 0 }) => {
    const parsedPrice = Number(String(price).replace(/[^0-9.]/g, '')) || 0;
    return sum + parsedPrice * qty;
  }, 0);

  return Math.round(total * 100) / 100; // round to 2 decimals
}
