const fs = require("node:fs/promises");
const path = require("path");

async function getElementData() {
  let elementData;
  const dataPath = path.join(__dirname, "../json/elements.json");
  try {
    const response = await fs.readFile(dataPath, {
      encoding: "utf-8",
    });
    elementData = JSON.parse(response);
    //console.log(typeof elementData.AtomicNumber);
  } catch (err) {
    console.error(err);
  }

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
}

function filterElement(userInput, elData) {
  const input = String(userInput).trim().toLowerCase();

  if (!input) throw new Error("Element not found");

  let element;

  const num = Number(input);
  if (!isNaN(num)) {
    element = elData.elementByNumber.get(num);
  } else if (input.length <= 2) {
    element = elData.elementBySymbol.get(input);
  } else {
    element = elData.elementByName.get(input);
  }

  if (!element) throw new Error("Element not found");

  return element;
}

module.exports = { getElementData, filterElement };
