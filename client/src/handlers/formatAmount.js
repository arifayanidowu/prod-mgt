export const formatAmount = (locales, code, amount) => {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency: code,
  }).format(amount);
};
