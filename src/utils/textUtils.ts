export const safeDecode = (str: string): string => {
  if (!str) return str;
  try {
    return decodeURIComponent(str);
  } catch (e) {
    console.warn('Failed to decode string:', str);
    return str;
  }
};
