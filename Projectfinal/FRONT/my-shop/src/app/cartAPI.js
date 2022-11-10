import axios from 'axios';
const URL = "http://127.0.0.1:8000/addOrder/";

export function getCart() {
  return new Promise((resolve) =>
    axios(URL).then((res) => resolve({ data: res.data }))
  );
};
export function buyProduct(newProd) {
  return new Promise((resolve) =>
    axios.post(URL, newProd, { headers: { 'Authorization': `Bearer ${newProd.token}` } }).then((res) => resolve({ data: res.data }))
  );
};
export function removeProduct(id) {
  console.log(id)
  return new Promise((resolve) =>
    axios.delete(URL + id).then((res) => resolve({ data: res.data }))
  );
};
