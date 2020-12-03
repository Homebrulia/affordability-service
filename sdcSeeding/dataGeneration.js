const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 4,
    min: 1
  }
})

//Generates true at rate of probability
let probability = (probability) => {
  return Math.random() > (1-probability);
}

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

//Eventually aiming for 1 Million discounts (roughly 10% of homes will have discounts)
const generateDiscounts = (numDiscounts, homes) => {
  let discountData = [];
  let id = 1;
  while (id <= numDiscounts) {
    let target = homes[Math.floor(Math.random() * homes.length)]
    let name = probability(0.5) ? lorem.generateWords(1) : null;
    let price = Math.floor(target.price * ((Math.random() * 0.2) + 0.1))
    let start = null;
    let end = null;
    let max_discount_points = probability(0.5) ? (Math.floor(Math.random() * 10)) : null;
    let min_down_payment = probability(0.3) ? Math.floor((((Math.random() * 0.18) + 0.06)) * target.price) : null;
    let min_interest_rate = probability(0.4) ? ((Math.random() * 0.15) + 0.05).toFixed(3) : null;
    let low_income = probability(0.2);
    let veteran = probability(0.1);
    let combinable = probability(0.05);
    let home_id = target.id;
    discountData.push({
      id,
      name,
      price,
      start,
      end,
      max_discount_points,
      min_down_payment,
      min_interest_rate,
      low_income,
      veteran,
      combinable,
      home_id
    })
    id++;
  }
  return discountData;
}

const generateDataRecords = (numRecords) => {
  let homePrices = generateHomePrices(numRecords);
  let discounts = generateDiscounts(numRecords * 0.1, homePrices);
  return {
    homePrices,
    discounts
  }
}

console.log(generateDataRecords(10000000));