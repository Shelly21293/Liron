import axios from "axios"
const URL="http://127.0.0.1:8000/token/"
const URL_REGISTER="http://127.0.0.1:8000/register/"
 
export function signin(action){
  return new Promise((resolve) =>
    axios.post(URL,action).then((res) =>resolve({data:res.data}))
  );
}
export function signup(action){
  return new Promise((resolve) =>
    axios.post(URL_REGISTER,action).then((res) =>resolve({data:res.data}))
  );
}
