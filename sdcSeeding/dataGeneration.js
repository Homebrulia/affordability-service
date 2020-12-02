

const generateDataRecords = (numRecords) => {
  const prices = [];
  while (index < numRecords) {
    let index = 0;
    let randomPrice = 10000 * (Math.floor(Math.random() * 250) + 50)
    prices.push({mortgageId: index, price: randomPrice})
    index++;
  }
  return prices;
}

console.log(generateDataRecords(10000000));