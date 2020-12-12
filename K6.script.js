import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  const home_id = Math.floor(Math.random() * 10000000)
  http.get(`http://localhost:8020/mortgage/${home_id}`, {
    tags: {name: 'getHomeData'},
  });
  sleep(0.6);
}