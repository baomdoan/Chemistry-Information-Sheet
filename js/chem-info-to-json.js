//This is simple script to convert csv to json for use in the website, it is not intended to be used as a csv parser and is not optimised for that purpose. It is also not intended to be used as a general csv to json converter, it is specifically designed for the PubChemElements_all.csv file and may not work correctly with other csv files.

const csvFilePath = "../src/PubChemElements_all.csv";
const csv = require('csvtojson');
const fs = require('fs');

csv()
.fromFile(csvFilePath)
.then((jsonObs) =>
{
    //Save to a json file
    const jsonString = JSON.stringify(jsonObs, null, 2);
    fs.writeFileSync("../json/elements.json", jsonString);
    console.log(`Converted ${jsonObs.length} elements to JSON and saved to elements.json!`);
})
.catch((error) => 
{
    console.log("Error converting CSV to JSON: ", error);
});