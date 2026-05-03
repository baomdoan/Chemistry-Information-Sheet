const fs = require("fs");
const csv = require("csv-parser");
const results = [];

fs.createReadStream("../src/PubChemElements_all.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
    });

function isNumber(value) 
{
    return !isNaN(Number(value));
}
function readName() 
{
    const prompt = require('prompt-sync') ({sigint: true});

    let elementInput = prompt('Please enter the name/symbol/atomic number of an element!');
    let hasWhiteSpace = elementInput.trim(); //check for empty or white space

    while (hasWhiteSpace.length === 0)
    {
        elementInput = prompt('Please enter the name/symbol/atomic number of an element!');

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

const userInput = readName();

//search function, will return the index of the intended element, if no result print such element

function search(input, elemArray)
{
    //if input is number, look through atomic number, else symbol (only 2 characters long) or name
    let elementIndex = -1;

    if (isNumber(input))
    {
        for (let i = 0; i < elemArray.length; i++)
        {
            if (Number(elemArray[i].AtomicNumber) === input)
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
            if (elemArray[i].Name === input)
            {
                elementIndex = i;
                break;
            }
            else if (elemArray[i].Symbol === input)
            {
                elementIndex = i;
                break;
            }
        }
    }

    return elementIndex;
}