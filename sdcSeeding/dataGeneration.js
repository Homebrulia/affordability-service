const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 4,
    min: 1
  }
})

////HELPER FUNCTIONS
const probability = (probability) => {
  return Math.random() > (1-probability);
}

const randomDateWithin3Months = () => {
  let targetDate = new Date();
  const positiveOrNegative = Math.random() > 0.5 ? 1 : -1;
  const numberOfDays = Math.round(Math.random() * 90);
  targetDate.setDate(targetDate.getDate() + (positiveOrNegative * numberOfDays));
  return targetDate;
}

const addRandomDays = (date) => {
  let newDate = new Date(date);
  const randomDays = Math.floor(Math.random() * 365);
  newDate.setDate(newDate.getDate() + randomDays)
  return newDate;
}

const generatePhoneNumber = () => {
  return `1(${Math.floor(Math.random() * 1000)})${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`
}

const generateEmail = () => {
  const domains = ['com', 'org', 'net', 'int', 'edu', 'gov', 'mil']
  return `${lorem.generateWords(1)}@${lorem.generateWords(1)}.${domains[Math.floor(Math.random() * domains.length)]}`
}

////Seeding Functions

// Eventually aiming for about 500k agents (each agent will manage 20 listings on average)
const generateAgents = (numAgents) => {
  let agentData = [];
  let id = 1;
  while (id <= numAgents) {
    let name = lorem.generateWords(1);
    let phoneNumber = generatePhoneNumber();
    let
  }


  return numAgents;
}

//Eventually aiming for 10 Million homes (primary records)
const generateHomePrices = (numHomes) => {
  let homePriceData = [];
  let id = 1;
  while (id <= numHomes) {
    homePriceDate.push( {

    })
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
    let price = Math.floor(target.price * ((Math.random() * 0.2) + 0.1));
    let start = probability(0.8) ? randomDateWithin3Months() : null;
    let end = (probability(0.8) && start) ? addRandomDays(start) : null;
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

// console.log(generateDataRecords(100));