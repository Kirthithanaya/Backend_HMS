// Sum of all amounts
export const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.amount, 0);

// Group items by month (YYYY-MM)
export const groupByMonth = (records) => {
  return records.reduce((acc, item) => {
    const month = new Date(item.date).toISOString().slice(0, 7);
    acc[month] = (acc[month] || 0) + item.amount;
    return acc;
  }, {});
};
