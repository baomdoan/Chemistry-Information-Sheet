const fs = require("fs");
const csv = require("csv-parser");
const results = [];

fs.createReadStream("../src/PubChemElements_all.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {

        console.log(`Loaded ${results.length} Elements!`)

        const userInput = readName();
        const elementIndex = search(userInput, results);
        displayElement(elementIndex, results);
    });

function isNumber(value) 
{
    return !isNaN(Number(value));
}
function readName() 
{
    const prompt = require('prompt-sync') ({sigint: true});

    let elementInput = prompt('Please enter the name/symbol/atomic number of an element! ');
    let hasWhiteSpace = elementInput.trim(); //check for empty or white space

    while (hasWhiteSpace.length === 0)
    {
        elementInput = prompt('Please enter the name/symbol/atomic number of an element! ');

        hasWhiteSpace = elementInput.trim();
    }
    

    //Check if input is a number or string
    if (isNumber(elementInput))
    {
        elementInput = Number(elementInput);
    }
    else
    {
        elementInput = elementInput.charAt(0).toUpperCase() + elementInput.slice(1).toLowerCase();
    }

    return elementInput;
}


//search function, will return the index of the intended element, if no result print such element

function search(userInput, elemArray)
{
    //if input is number, look through atomic number, else symbol (only 2 characters long) or name
    let elementIndex = -1;

    if (isNumber(userInput))
    {
        for (let i = 0; i < elemArray.length; i++)
        {
            if (Number(elemArray[i].AtomicNumber) === userInput)
            {
                elementIndex = i;
                break;
            }
        }
    }
    else
    {
        for (let i =  0; i < elemArray.length; i++)
        {
            if (elemArray[i].Name === userInput)
            {
                elementIndex = i;
                break;
            }
            else if (elemArray[i].Symbol === userInput)
            {
                elementIndex = i;
                break;
            }
        }
    }

    return elementIndex;
}

function displayElement(elementIndex, elemArray)
{
    if (elementIndex === -1)
    {
        console.log("No element found!");
    }
    else
    {
        const element = elemArray[elementIndex];
        console.log("Element Found!");
        console.log(`Element Atomic Number: ${element.AtomicNumber}`);
        console.log(`Element Symbol: ${element.Symbol}`);
        console.log(`Element Name: ${element.Name}`);
        console.log(`Element Atomic Mass: ${element.AtomicMass} u`);
        console.log(`Element Standard State: ${element.StandardState}`);
        console.log(`Element Boiling Point: ${element.BoilingPoint ? element.BoilingPoint + " K" : "N/A"}`);
        console.log(`Element Melting Point: ${element.MeltingPoint ? element.MeltingPoint + " K": "N/A"}`);
        console.log(`Element Density: ${element.Density} g/cm^3`);
        console.log(`Element Group: ${element.GroupBlock}`);
        console.log(`Element Discovery Year: ${element.YearDiscovered}`);
    }
}