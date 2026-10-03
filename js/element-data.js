const fs = require('node:fs/promises');

export async function getElementData()
{
    let elementData;
    try {
        const response = await fs.readFile("./json/elements.json", {encoding: 'utf-8'});
        elementData = JSON.parse(response);
        console.log(elementData);
    }catch (err)
    {
        console.error(err);
    }

    const elementByNumber = new Map();
    const elementBySymbol = new Map();
    const elementByName = new Map();

    elementData.forEach (element => 
    {
        elementByNumber.set(element.AtomicNumber, element);
        elementBySymbol.set(element.Symbol.toLowerCase(), element);
        elementByName.set(element.Name.toLowerCase(), element);
    });

    return {elementByNumber, elementBySymbol, elementByName};
}

function filterElement(userInput, elData)
{
    const input = userInput.trim().toLowerCase();
    if (!input) return null;

    const num = Number(input);
    if (!isNaN(num))
    {
        const el = elData.elementByNumber.get(num);
        return el ? [el] : null;
    }

    if (input.length <= 2)
    {
        const el = elData.elementBySymbol.get(input);
        return el ? [el] : null;
    }

    const elName = elData.elementByName.get(input);
    if (elName) return [elName];
}

getElementData();