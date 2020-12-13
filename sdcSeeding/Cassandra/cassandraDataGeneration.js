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
const generateSharedFields = (numRecords) => {
  let records = [];
  let id = 0;
  while (numRecords > 0) {
    id++;
    numRecords--;
    const name = lorem.generateSentences(1);
    const price = 10000 * (Math.floor(Math.random() * 250) + 50);
    records.push({home_id: id, home_name: name, home_price: price})
  }
  return records;
}
const sharedHomeFields = generateSharedFields(10000000);

const writeHomePricesStream = fs.createWriteStream('base_home_prices.csv');
const writeHomePrices = (writer, encoding, callback, numHomes) => {
  let id = 0;
  writeHomePricesStream.write('id,name,price\n', 'utf8');
  write();
  function write() {
    let ok = true;
    do {
      numHomes -= 1;
      const current = sharedHomeFields[id];
      id += 1;
      const home_id = current.home_id;
      const name = current.home_name;
      const price = current.home_price;
      const data = `${home_id},${name},${price}\n`
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

const writeHomeDetailsStream = fs.createWriteStream('home_details.csv');
const writeHomeDetails = (writer, encoding, callback, numHomes) => {
  let id = 0;
  writeHomeDetailsStream.write('home_id,name,price,home_owners_association,home_insurance,property_tax_rate,agent_id\n', 'utf8');
  write();
  function write() {
    let ok = true;
    do {
      numHomes -= 1;
      const current = sharedHomeFields[id];
      id += 1;
      const home_id = current.home_id;
      const home_name = current.home_name;
      const price = current.home_price;
      const home_owners_association = probability(0.4) ? Math.floor(Math.random() * 15000) : '';
      const home_insurance = probability(0.4) ? 75 : '';
      const property_tax_rate = (Math.random() * 0.08).toFixed(3);
      //Hardcoding this for assumed agent ids 1 - 500k
      const agent_id = Math.ceil(Math.random() * 500000);
      //Roughly 10% of the time, push the current id, price to an array to use for generating Discounts
      const data = `${home_id},${home_name},${price},${home_owners_association},${home_insurance},${property_tax_rate},${agent_id}\n`
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

const writeDiscountsStream = fs.createWriteStream('home_discounts.csv');
const writeDiscounts = (writer, encoding, callback, numDiscounts) => {
  let id = 0;
  writeDiscountsStream.write('discount_id,home_id,home_name,home_price,discount_name,discount_price,start,end,max_discount_points,min_down_payment,min_interest_rate,low_income,veteran,combinable\n', 'utf8');
  write();
  function write() {
    let ok = true;
    do {
      numDiscounts -= 1;
      const current = sharedHomeFields[Math.floor(Math.random() * sharedHomeFields.length)];
      id += 1;
      const home_id = current.home_id;
      const home_name = current.home_name;
      const home_price = current.home_price;
      const randomDate = randomDateWithin3Months();
      const discount_name = probability(0.5) ? lorem.generateWords(1) : '';
      const discount_price = Math.floor(current.home_price * ((Math.random() * 0.2) + 0.1));
      const start = probability(0.8) ? randomDate.toISOString().substring(0,10) : '';
      const end = (probability(0.8) && start) ? addRandomDays(randomDate).toISOString().substring(0,10) : '';
      const max_discount_points = probability(0.5) ? (Math.floor(Math.random() * 10)) : '';
      const min_down_payment = probability(0.3) ? Math.floor((((Math.random() * 0.18) + 0.06)) * current.home_price) : '';
      const min_interest_rate = probability(0.4) ? ((Math.random() * 0.15) + 0.05).toFixed(3) : '';
      const low_income = probability(0.2);
      const veteran = probability(0.1);
      const combinable = probability(0.05);
      const data = `${id},${home_id},${home_name},${home_price},${discount_name},${discount_price},${start},${end},${max_discount_points},${min_down_payment},${min_interest_rate},${low_income},${veteran},${combinable}\n`
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

const writeAgentsStream = fs.createWriteStream('agent_listings.csv');
const writeAgents = (writer, encoding, callback, numAgents) => {
  let id = 0;
  writeAgentsStream.write('agent_id,home_id,home_name,agent_name,agent_phone,agent_email,agent_rating\n', 'utf8');
  write();
  function write() {
    let ok = true;
    do {
      numAgents -= 1;
      id += 1;
      const target = Math.floor(Math.random() * sharedHomeFields.length)
      const home_id = sharedHomeFields[target].home_id;
      const home_name = sharedHomeFields[target].home_name;
      const agent_name = lorem.generateWords(1);
      const agent_phone = generatePhoneNumber();
      const agent_email = generateEmail();
      const agent_rating = (Math.random() * 5).toFixed(1);
      const data = `${id},${home_id},${home_name},${agent_name},${agent_phone},${agent_email},${agent_rating}\n`;
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

const writeAllData = () => {
  writeHomePrices(writeHomePricesStream, 'utf-8', () => {writeHomePricesStream.end(); console.log('finished writing home prices');}, 10000000);
  writeHomeDetails(writeHomeDetailsStream, 'utf-8', () => {writeHomeDetailsStream.end(); console.log('finished writing home details')}, 10000000);
  writeDiscounts(writeDiscountsStream, 'utf-8', () => {writeDiscountsStream.end(); console.log('finished writing discounts')}, 1000000);
  writeAgents(writeAgentsStream, 'utf-8', () => {writeAgentsStream.end(); console.log('finished writing agents');}, 500000);
}
writeAllData();
