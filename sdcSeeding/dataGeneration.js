const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 4,
    min: 1
  }
})

console.log(lorem.generateSentences(1));
/*  NEEDED FIELDS
HOME PRICES:
id
name
price

DISCOUNTS:
id
name
price
start date
end date
max discount points
min down payment
min interest rate
low income
veteran
combinable
foreign key to a home price
*/

//Eventually aiming for 10 Million homes (primary records)
const generateHomePrices = (numHomes) => {
  let homePriceData = [];
  let id = 1;
  while (id <= numHomes) {
    let name = lorem.generateSentences(1);
    let price = 10000 * (Math.floor(Math.random() * 250) + 50);
    homePriceData.push({id: id, name: name, price: price})
    id++;
  }
  return homePriceData;
}


//Eventually aiming for a rough 1 Million discounts (roughly 10% of homes have discounts)
const generateDiscounts = (numDiscounts) => {

}

const generateDataRecords = (numRecords) => {

}