export const calculateTotal = function calculateCharges({
  roomFee,
  utilitiesFee = 0,
  servicesFee = 0,
  discount = 0,
  lateFee = 0,
}) {
  const subtotal = roomFee + utilitiesFee + servicesFee;
  const total = subtotal - discount + lateFee;
  return total;
};
