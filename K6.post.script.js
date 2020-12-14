import http from 'k6/http';
import { sleep } from 'k6';

const probability = (probability) => {
  return Math.random() > (1-probability);
}

export let options = {
  stages: [
    {duration: "2m", target: 1},
    {duration: "2m", target: 10},
    {duration: "2m", target: 100},
    {duration: "2m", target: 1000},
    {duration: "2m", target: 2000},
    {duration: "30s", target: 2000}
  ],
};

export default function () {
  const url = 'http://localhost:8020/mortgage/db';
  const name = 'name for stress testing'
  const price = 10000 * (Math.floor(Math.random() * 250) + 50);
  const home_owners_association = probability(0.4) ? Math.floor(Math.random() * 15000) : null;
  const home_insurance = probability(0.4) ? 75 : null;
  const property_tax_rate = (Math.random() * 0.08).toFixed(3);
  const agent_id = Math.ceil(Math.random() * 500000);
  const payload = JSON.stringify({
    name: name,
    price: price,
    home_owners_association: home_owners_association,
    home_insurance: home_insurance,
    property_tax_rate: property_tax_rate,
    agent_id: agent_id
  });
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
  sleep(0.2);
}