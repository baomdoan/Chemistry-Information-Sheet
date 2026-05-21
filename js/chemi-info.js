const fs = require("fs");
const csv = require("csv-parser");
const results = [];

fs.createReadStream("../src/PubChemElements_all.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {

        const elementByNumber = new Map();
        results.forEach (element => elementByNumber.set(element.AtomicNumber, element));

        const elementBySymbol = new Map();
        const elementByName = new Map();

        for (const element of elementByNumber.values())
        {
            elementBySymbol.set(element.Symbol.toLowerCase(), element);
            elementByName.set(element.Name.toLowerCase(), element);
        }
        console.log(`Loaded ${results.length} Elements!`)
        let continuePrompt = true;

        while (continuePrompt)
        {
            const userInput = readName();
            const element = lookUp(userInput, elementByNumber, elementBySymbol, elementByName);
            displayElement(element);

            const userContinue = continueLookUp();
            if (userContinue === 'no' || userContinue === 'n')
            {
                continuePrompt = false;
            }
        }

    });

function isNumber(value) 
{
    return !isNaN(Number(value));
}

function continueLookUp()
{
    const prompt = require('prompt-sync') ({sigint: true});

    let userContinue = prompt('Do you want to look up another element? ');
    let validInput = userContinue.trim().toLowerCase();

    while (validInput !== 'yes' && validInput !== 'no' && validInput !== 'y' && validInput !== 'n')
    {
        userContinue = prompt('Please enter (Y)es or (N)o! ');
        validInput = userContinue.trim().toLowerCase();
    }

    return validInput;
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
        elementInput = elementInput.toLowerCase();
    }

    return elementInput;
}


//search function will return the object of the intended element if no result prints such element

function lookUp(userInput, elementByNumber, elementBySymbol, elementByName)
{
    //Normalise input
    const normalisedInput = userInput.toString().trim();
    let elementResult;
    //If input is a number, get number, if input length is between 1 and 2, get symbol else get name
    if (isNumber(normalisedInput))
    {
        elementResult = elementByNumber.get(normalisedInput);
    }
    else if (normalisedInput.length <= 2)
    {
        elementResult = elementBySymbol.get(normalisedInput);
    }
    else
    {
        elementResult = elementByName.get(normalisedInput);
    }

    return elementResult;
}

function displayElement(elem)
{
    if (!elem)
    {
        console.log("No element found!");
    }
    else
    {
        console.log("Element Found!");
        console.log(`Element Atomic Number: ${elem.AtomicNumber}`);
        console.log(`Element Symbol: ${elem.Symbol}`);
        console.log(`Element Name: ${elem.Name}`);
        console.log(`Element Atomic Mass: ${elem.AtomicMass} u`);
        console.log(`Element Standard State: ${elem.StandardState}`);
        console.log(`Element Boiling Point: ${elem.BoilingPoint ? elem.BoilingPoint + " K" : "N/A"}`);
        console.log(`Element Melting Point: ${elem.MeltingPoint ? elem.MeltingPoint + " K": "N/A"}`);
        console.log(`Element Density: ${elem.Density ? elem.Density + " g/cm^3" : "N/A"}`);
        console.log(`Element Group: ${elem.GroupBlock}`);
        console.log(`Element Discovery Year: ${elem.YearDiscovered}`);
    }
}