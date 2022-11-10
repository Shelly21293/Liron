import axios from 'axios';
const URL = "http://127.0.0.1:8000/products/"
const getProdUrl = "http://127.0.0.1:8000/getProducts/"



export function getProducts() {
  return new Promise((resolve) =>
    axios(getProdUrl).then((res) => resolve({ data: res.data }))
  );
};
export function addProducts(newProd) {
  console.log(newProd)
  return new Promise((resolve) =>
    axios.post(URL, newProd, 
      { headers: 
      { 'Authorization': `Bearer ${newProd.token}` } })
      .then((res) => resolve({ data: res.data }))
  );
};
export function updProducts(newProd,id) {
  return new Promise((resolve) =>
    axios.put(URL+id, newProd, 
      { headers: 
    { 'Authorization': `Bearer ${newProd.token}` } })
    .then((res) => resolve({ data: res.data }))
  );
};

export function removeProduct(payload) {
  console.log()
  return new Promise((resolve) =>
    axios.delete(URL+ payload.id, { headers: { 'Authorization': `Bearer ${payload.token}` } }).then((res) => resolve({ data: res.data }))
  );
};