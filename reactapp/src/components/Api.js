import React, { useEffect,useState } from 'react';
import Navbar from './Navbar';
import {Form,Button,Card,Alert} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
// import Api from './Api';
import Trade from './Trade';
import About from './About';
import {Link,useNavigate as useHistory} from "react-router-dom"
import Shared from './Shared';
import axios from 'axios';
import './Api.css';
import io from 'socket.io-client';
import { Route, Routes,BrowserRouter as Router } from "react-router-dom";
const socket= io.connect("http://10.113.19.100:3009");


// to run: http://10.113.19.100:3000
// database: python manage.py runserver 0.0.0.0:9595
// server: yarn start
// envnt bin: source /home/priyanshu/myDjangoproject/my_env/bin/activate 




function Api(){
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  const [data,setData]=useState([]);
  const [message,setMessage]=useState("");
  const history=useHistory()
  // const [redirectUrl,setRedirectUrl]=useState("");

  // const handleRedirect=(url)=>{
  //   setRedirectUrl(url);
  // };
  // if
  
  // const combinedClickTrade = async(e)=>{
  //   setMessage(e);
  //   sendMessage();


  // };


  const sendMessage = (message) =>{
    setMessage(message);
    console.log(message);
    socket.emit("send_message",{message});  
    history("/shared")
  };
  // <button onClick={()=>{
    //   sendMessage(item.title);
    // }}><b>Trade</b></button>
// <button onClick={()=>{
    //   sendMessage(item.title);
    // }}><b>Trade</b></button>


  // useEffect(()=>{
  //   socket.emit("send_message",{message});
  // })
  // <button onClick={()=>{
    //   sendMessage(item.title);
    // }}><b>Trade</b></button>

  // useEffect(()=>{
  //   socket.on("receive_message",(data)=>{
  //     setMReceived(data.message)
  //   })
  // })

  useEffect(()=>{
    const fetchData = async() => {
      try{
        const response = await axios.get('http://0.0.0.0:9595//data/');
        setData(response.data);
      }catch(error){
        console.error(error)
      }
    };
    fetchData();
  },[]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCombinedClick = async (e) =>{
    await handleSubmit(e);
    handleRefresh();
  };

  // const RecordItem=({record,onDelete})=>{
  //   const handleDelete=()=>{
  //     onDelete(record.title)
  //   }
  // };

  const handleDelete= async(title)=>{
    try{
      // await axios.post(`http://127.0.0.1:8000/delete/${title}/`);
      await fetch(`http://0.0.0.0:9595//delete/${title}`,{
        method:"post",
      })
      console.log("Record deleted successfully");
      handleRefresh();
      
    }catch(error){
      console.error('Error deleting record', error);
    }
  };
  //<button onClick={()=>handleDelete(item.title)}>Delete</button>
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response =await axios.post('http://0.0.0.0:9595/',{book_id: userInput});
      console.log(response.data);

    }catch (error){
      console.error(error);
    }
  };

    const handleButtonClick = () => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&projection=full&maxResults=5`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const found = checkCharacterExists(data, userInput);
        if (found) {
         
          const bookInfo = getBookInfo(data, userInput);
          setImageUrl(bookInfo.imageLink);
          setAuthor(bookInfo.author);
          setGenre(bookInfo.genre);
          setPages(bookInfo.pages);
          setResult('');
        } else {
          setResult('Book Not found :(');
          
          setImageUrl('');
          setAuthor('');
          setGenre('');
          setPages('');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const checkCharacterExists = (data, char) => {
    const items = data.items || [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const volumeInfo = item.volumeInfo || {};
      const title = volumeInfo.title || '';
      if (title.toLowerCase().includes(char.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  const getBookInfo = (data, searchQuery) => {
    const items = data.items || [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const volumeInfo = item.volumeInfo || {};
      const title = volumeInfo.title || '';
      const imageLinks = volumeInfo.imageLinks || {};
      const thumbnail = imageLinks.thumbnail || '';
      const authors = volumeInfo.authors || [];
      const author = authors.join(', ');
      const genre = volumeInfo.categories ? volumeInfo.categories[0] : 'Unknown Genre';
      const pages = volumeInfo.pageCount || 'Unknown';

      if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return { imageLink: thumbnail, author, genre, pages };
      }
    }
  };
  
  const handleKeyDown = (event)=> {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };
  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <Navbar/>
      {/* <>
      <Navbar/>
              <Routes>
              <Route exact path="/" element={ <Api/> }/>
              <Route exact path="/trade" element={<Trade/> } />
              <Route exact path="/shared" element={<Shared />} />
              <Route exact path="/about" element={<About/>} />
            </Routes>
      </> */}




      <br />
    
    
    <div 
    class="card1" style={{
      width: '25rem',
      minHeight: '17rem',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid rgb(78, 58, 58)',
      marginLeft: 'auto',
      marginRight: 'auto',
    
    }}>
        <div class="card-body">
        
        <nav className="navbar">
          <span className="navbar-brand" >Search Your Book <p>  </p></span>
        </nav>
        <div className="container">
          <div className="search-box">
            <input type="text" value={userInput} onChange={handleInputChange} onKeyDown={handleKeyDown} 
            placeholder="Enter book name" />
            
            <button type="button" class="btn btn-outline-success" onClick={handleButtonClick}  className="mt-3" >Search</button>
          </div>
          
          <div className="result-box">
            
            <p></p>
            {result && <p className="result">{result}</p>}
            {imageUrl && <img className="book-image" src={imageUrl} alt="Book Cover" width="150" height="200" class="d-inline-block 2align-center" />}
            {userInput && <p className="book-name">: {userInput}</p>}
            {author && <p className="book-info">Author: {author}</p>}
            {genre && <p className="book-info">Genre: {genre}</p>}
            {pages && <p className="book-info">Pages: {pages}</p>}
          </div>
            <button type="button" class="btn btn-outline-info" onClick={handleCombinedClick}   >Add Book</button>
           
          </div>
        </div>
      </div>
      <hr  />
      {/* <h1 style={{textAlign: 'center', fontWeight:'bold'}} > <u>Library</u> </h1> */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        {/* Image container */}
        <img src="lib.png" alt="Your Image" style={{width:"200px"}} />
      </div>
      <br />
      
      
      {/* <div>
        {data.map((item)=>(
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Author:{item.author}</p>
            
            <img src={item.image} alt={item.title} />
            </div>
        ))}
      </div> */}
      <div >
        <div class='bookcard' style={{display:'flex',flexWrap:'wrap',margin: '10px',}}>
         
        {data.map((item)=>(
          <div key={item.id} style={{margin:'10px'}}>
            <img src={item.image} alt={item.title} />
            <p><b>{item.title}</b></p>
            <p><b>Author :</b>  {item.author}</p>
            <div>
            <button type="button" class="btn btn-outline-dark" onClick={()=>handleDelete(item.title)}  ><b>Delete </b></button>
            <button type="button" class="btn btn-outline-dark" onClick={()=>{
        sendMessage(item.title);        
      }} style={{marginLeft:'10px'}}><b>Trade</b></button>
            
            </div>  
            </div>
        ))}
        </div>
        

      </div>
      </div>

  );
};

export default Api;





