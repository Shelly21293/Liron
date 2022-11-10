import axios from 'axios';
const URL="http://127.0.0.1:8000/addOrder/";

export function sendOrders(myorders,token) {
  console.log({myorders,token})
  return new Promise((resolve) =>
    axios.post(URL, myorders,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
    }).then((res)=>resolve({data: res.data}))
  );
}
