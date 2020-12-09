const fs = require('fs');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 3,
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

////SEEDING STREAMS
const writeAgentsStream = fs.createWriteStream('agents.csv');

const writeAgents = (writer, encoding, callback, numAgents) => {
  let id = 0;
  writeAgentsStream.write('id,name,phone,email,rating\n', 'utf8');
  write();
  function write() {
    let ok = true;
    do {
      numAgents -= 1;
      id += 1;
      const name = lorem.generateWords(1);
      const phone = generatePhoneNumber();
      const email = generateEmail();
      const rating = (Math.random() * 5).toFixed(1);
      const data = `${id},${name},${phone},${email},${rating}\n`;
      if (numAgents === 0) {
        //This is the last write, so call the callback afterwards
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while ((numAgents > 0) && ok);
    if (numAgents > 0) {
      // Stopped because something not ok
      // Write again once it drains
      writer.once('drain', write);
    }
  }
}

let homeIdAndPrice = [];
const writeHomesStream = fs.createWriteStream('home_prices.csv');
const writeHomes = (writer, encoding, callback, numHomes) => {
  let id = 0;
  writeHomesStream.write('id,name,price,home_owners_association,home_insurance,property_tax_rate,agent_id\n', 'utf8');
  write();
  function write() {
    let ok = true;
    do {
      numHomes -= 1;
      id += 1;
      const name = lorem.generateSentences(1);
      const price = 10000 * (Math.floor(Math.random() * 250) + 50);
      const home_owners_association = probability(0.4) ? Math.floor(Math.random() * 15000) : null;
      const home_insurance = probability(0.4) ? 75 : null;
      const property_tax_rate = (Math.random() * 0.08).toFixed(3);
      //Hardcoding this for assumed agent ids 1 - 500k
      const agent_id = Math.ceil(Math.random() * 500000);
      //Roughly 10% of the time, push the current id, price to an array to use for generating Discounts
      if (probability(0.1)) {
        homeIdAndPrice.push([id,price]);
      }
      const data = `${id},${name},${price},${home_owners_association},${home_insurance},${property_tax_rate},${agent_id}\n`
      if (numHomes === 0) {
        //This is the last write, so call the callback afterwards
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while ((numHomes > 0) && ok);
    if (numHomes > 0) {
      // Stopped because something not ok
      // Write again once it drains
      writer.once('drain', write);
    }
  }
}

const writeDiscountsStream = fs.createWriteStream('discounts.csv');
const writeDiscounts = (writer, encoding, callback, numDiscounts) => {
  let id = 0;
  writeDiscountsStream.write('id,name,price,start,end,max_discount_points,min_down_payment,min_interest_rate,low_income,veteran,combinable,home_id\n', 'utf8');
  write();
  function write() {
    let ok = true;
    do {
      numDiscounts -= 1;
      id += 1;
      const randomDate = randomDateWithin3Months();
      const target = homeIdAndPrice[Math.floor(Math.random() * homeIdAndPrice.length)]
      const name = probability(0.5) ? lorem.generateWords(1) : null;
      const price = Math.floor(target[1] * ((Math.random() * 0.2) + 0.1));
      const start = probability(0.8) ? randomDate.toISOString().substring(0,10) : null;
      const end = (probability(0.8) && start) ? addRandomDays(randomDate).toISOString().substring(0,10) : null;
      const max_discount_points = probability(0.5) ? (Math.floor(Math.random() * 10)) : null;
      const min_down_payment = probability(0.3) ? Math.floor((((Math.random() * 0.18) + 0.06)) * target[1]) : null;
      const min_interest_rate = probability(0.4) ? ((Math.random() * 0.15) + 0.05).toFixed(3) : null;
      const low_income = probability(0.2);
      const veteran = probability(0.1);
      const combinable = probability(0.05);
      const home_id = target[0];
      const data = `${id},${name},${price},${start},${end},${max_discount_points},${min_down_payment},${min_interest_rate},${low_income},${veteran},${combinable},${home_id}\n`
      if (numDiscounts === 0) {
        //This is the last write, so call the callback afterwards
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while ((numDiscounts > 0) && ok);
    if (numDiscounts > 0) {
      // Stopped because something not ok
      // Write again once it drains
      writer.once('drain', write);
    }
  }
}

const writeAllData = () => {
  writeAgents(writeAgentsStream, 'utf-8', () => {writeAgentsStream.end(); console.log('finished writing agents');}, 500000);
  writeHomes(writeHomesStream, 'utf-8', () => {writeHomesStream.end(); console.log('finished writing homes')}, 10000000);
  writeDiscounts(writeDiscountsStream, 'utf-8', () => {writeDiscountsStream.end(); console.log('finished writing discounts')}, 1000000);
}
writeAllData();
