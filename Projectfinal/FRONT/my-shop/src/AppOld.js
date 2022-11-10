import React, { useEffect, useState } from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {selectUserName} from './app/loginSlice';
import { Outlet, useAsyncValue } from 'react-router-dom';
import MyNav from './app/MyNav';
import axios from 'axios';
import {API_URL, URL, IMAGES_URL} from './constants'

function AppOld() {
  const URL= "http://127.0.0.1:8000/token/"
  const userName = useSelector(selectUserName);
  const [title, setTitle]=useState("");
  const [content, setContent]=useState("");
  const [image, setImage]=useState(null);
  const [posts, setPosts]=useState([]);
  const [call, setCall]=useState(true);
  const [images, setImages]=useState([]);

  useEffect(()=> {
    axios (IMAGES_URL).then((result)=>setImages(result.data));
    axios.get(API_URL).then((result)=>setPosts(result.data));
    console.log("hi there");
    console.log(posts.length);
  }, [call]);
    

  const handleTitle=(e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleContent=(e) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  const handleImage=(e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handleSubmit=(e) => {
    e.preventDefault();
    console.log(title,content,image);


    let form_data= new FormData();
    form_data.append("image", image, image.name);
    form_data.append("title", title);
    form_data.append("content", content);

    let url= API_URL;
    axios
      .post(url, form_data, {
        headers: {
          "conent-type": "multipart/form-data",
        },
      })
      .then ((res)=> {
        console.log(res.data);
      })
      .catch((err)=> console.log(err));

      setTitle("");
      setImage(null);
      setContent("");
    };
    
  return (
    <div className="App"> 
      {images.length>0 && images.map((img,i)=><div key={i}>
      <img src={`http://127.0.0.1:8000/media/$(img.image}`} style= {{width:"100px"}} alt="a"></img>
      Title: {img.title}
      content: {img.content}
      </div>)}
        <img src="http//127.0.0.1:8000/media/Posted_images/jelly.jpg"></img>
          <form onSubmit={handleSubmit}>
            <p>
              <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  value={title}
                  onChange={handleTitle}
                  required  
              ></input>
            </p>
            <p>
              <input
                type="text"
                placeholder="Content"
                id="content"
                value={content}
                onChange={handleContent}
                required  
              ></input>
            </p>
            <p>
              <input
                type="file"
                id="image"
                accept="image/png.image/jpeg"
                onChange={handleImage}
                required
              ></input>
            </p>  
              <button type="submit"> Post</button>
        </form> 
            <nav style={{borderBottom:"solid 1px", paddingBottom: "1rem"}}>
              <MyNav></MyNav>
                {userName && <div>Hello:{userName}</div>} 
              <Outlet></Outlet>
            </nav>
    </div>
  )
}
export default AppOld;


 {/* {userFromToke.length > 0  && `  ${userFromToke}   is logged`} */}