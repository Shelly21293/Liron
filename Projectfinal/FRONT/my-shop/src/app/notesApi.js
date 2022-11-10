import axios from "axios"
const URL_NOTES="http://127.0.0.1:8000/notes/"
 
export function getNotes(token){
  return new Promise((resolve) =>
    axios(URL_NOTES, { 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) =>resolve({data:res.data}))
  );
}
