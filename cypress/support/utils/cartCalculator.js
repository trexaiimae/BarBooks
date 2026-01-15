
function calculateCartTotal(items) {
  if (!Array.isArray(items)) return 0;

  const total = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = typeof item.qty === 'number' ? item.qty : 1;
    return sum + price * qty;
  }, 0);
  return Math.round(total * 100) / 100;
}

module.exports = { calculateCartTotal };
