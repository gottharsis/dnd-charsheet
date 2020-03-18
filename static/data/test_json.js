const fs = require("fs");

const str = fs.readFileSync("./spells.json", "utf-8");

const data = JSON.parse(str);

console.log(data);
