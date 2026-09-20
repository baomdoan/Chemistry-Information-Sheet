async export function getElementData()
{
    const response = await fetch("../json/element-data.json");
    if (!response.ok) throw new Error (`HTTP ${response.status}!`);

    const elementData = await response.json();

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