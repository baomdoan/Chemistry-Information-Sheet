export function filterElement(userInput, elData) {
  const input = String(userInput).trim().toLowerCase();

  if (!input) throw new Error("Element not found");

  let element;

  const num = Number(input);
  if (!isNaN(num)) {
    if (num < 1 || num > 118) {
      throw new Error("Please enter a valid Element Number between 1 and 118!");
    }
    element = elData.elementByNumber.get(num);
  } else if (input.length <= 2) {
    element = elData.elementBySymbol.get(input);
  } else {
    element = elData.elementByName.get(input);
  }

  if (!element) throw new Error("Element not found");

  return element;
}
