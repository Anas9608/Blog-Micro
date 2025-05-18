const bcrypt = require('bcrypt');
const saltRounds = 10;

let plainText = "abc@1234";
let somePass = "abc@1234";  
let hashPass = "$2b$10$dUDcqc0ANhJo.uhIR4rMde4TBwIA5JKlpRn5hz.neFccC7aEs0qA.";
let hash = bcrypt.hashSync(plainText, saltRounds);
console.log(hash);

console.log(bcrypt.compareSync(plainText, hashPass));