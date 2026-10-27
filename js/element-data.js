const dataPath = "./json/elements.json";

export async function getData() {
  try {
    const response = await fetch(dataPath);
    if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);

    // Parse JSON content to be done next
    const elementData = await response.json();

    const elementByNumber = new Map();
    const elementBySymbol = new Map();
    const elementByName = new Map();

    elementData.forEach((element) => {
      element.AtomicNumber = Number(element.AtomicNumber);
      elementByNumber.set(element.AtomicNumber, element);
      elementBySymbol.set(element.Symbol.toLowerCase(), element);
      elementByName.set(element.Name.toLowerCase(), element);
    });

    return { elementByNumber, elementBySymbol, elementByName };
  } catch (err) {
    document.getElementById("element-display").textContent =
      `Unable to load JSON data, Error ${err.message}`;
    return null;
  }
}

// function filterElement(userInput, elData) {
//   const input = String(userInput).trim().toLowerCase();

//   if (!input) throw new Error("Element not found");

//   let element;

//   const num = Number(input);
//   if (!isNaN(num)) {
//     element = elData.elementByNumber.get(num);
//   } else if (input.length <= 2) {
//     element = elData.elementBySymbol.get(input);
//   } else {
//     element = elData.elementByName.get(input);
//   }

//   if (!element) throw new Error("Element not found");

//   return element;
// }
