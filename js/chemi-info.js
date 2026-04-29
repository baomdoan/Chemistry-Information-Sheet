const fs = require("fs");
const csv = require("csv-parser");
const results = [];

fs.createReadStream("../src/PubChemElements_all.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
        console.log(results);
    });