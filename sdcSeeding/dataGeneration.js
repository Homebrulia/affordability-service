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

const zeroPadding = (number, totalNumDigits) => {
  let string = number.toString();
  while (string.length < totalNumDigits) {
    string = '0' + string
  }
  return string;
}

const generatePhoneNumber = () => {
  let areaCode = Math.floor(Math.random() * 1000);
  let firstThreeDigits = Math.floor(Math.random() * 1000);
  let lastFourDigits = Math.floor(Math.random() * 10000);
  return `1(${zeroPadding(areaCode, 3)})${zeroPadding(firstThreeDigits, 3)}-${zeroPadding(lastFourDigits, 4)}`
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
    agentData.push({
      id: id,
      name: lorem.generateWords(1),
      phone: generatePhoneNumber(),
      email: generateEmail(),
      rating: (Math.random() * 5).toFixed(1)
    })
    id++;
  }
  return agentData;
}

//Eventually aiming for 10 Million homes (primary records)
const generateHomePrices = (numHomes, agents) => {
  let homePriceData = [];
  let id = 1;
  while (id <= numHomes) {
    let name = lorem.generateSentences(1);
    let price = 10000 * (Math.floor(Math.random() * 250) + 50);
    let home_owners_association = probability(0.4) ? Math.floor(Math.random() * 15000) : null;
    let home_insurance = probability(0.4) ? 75 : null;
    let property_tax_rate = (Math.random() * 0.08).toFixed(3);
    let agent_id = agents[Math.floor(Math.random() * agents.length)].id
    homePriceData.push({
      id,
      name,
      price,
      home_owners_association,
      home_insurance,
      property_tax_rate,
      agent_id
    })
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
  let agents = generateAgents(numRecords * 0.05)
  let homePrices = generateHomePrices(numRecords, agents);
  let discounts = generateDiscounts(numRecords * 0.1, homePrices);
  return {
    agents,
    homePrices,
    discounts
  }
}
