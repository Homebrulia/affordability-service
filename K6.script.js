import http from 'k6/http';
import { sleep } from 'k6';

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
  const home_id = Math.floor(Math.random() * 10000000)
  http.get(`http://localhost:8020/mortgage/${home_id}/db`, {
    tags: {name: 'getHomeData'},
  });
  sleep(0.2);
}