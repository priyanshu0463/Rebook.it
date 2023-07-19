import React,{useEffect,useState} from 'react';
import Navbar from './Navbar';
import io from 'socket.io-client';
import './shared.css';
const socket= io.connect("http://10.113.19.100:3009");
const Shared = () => {
  const [message,setMessage]=useState("");
  const[mReceived,setMReceived]=useState("");
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  // const [data,setData]=useState([]);
  // const socketRef=useRef(null);
  // useEffect(()=>{
  //   socketRef.current =io('localhost:3000/shared');

  //   socketRef.current.on('message',(data)=>{
  //     console.log('recived message:',data);
  //   });
  //   return()=>{
  //     socketRef.current.disconnect();

  //   };
  // },[]);

const sendMessage=()=>{
  
  // const message='hello server';
  // socketRef.current.emit('message',message);ket.emit()
  socket.emit("send_message",{message});

};
useEffect(()=>{
  socket.on("receive_message",async (data)=>{
    await setMReceived(data.message);
    handleTrade(data.message);

  })
})

const handleTrade = (title) => {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${title}&projection=full&maxResults=5`;

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




  // return (
  //   <div>
  //     <div>
  //     <h1>Socket.io</h1>
  //     <input placeholder="message" onChange={(e)=>{
  //       setMessage(e.target.value);
  //     }} />
  //     <button onClick={sendMessage}>send message</button>
  //     <h1>message</h1>
  //     {mReceived}
  //     <br />
  //     </div>

  //     <div class="card">
  //       <div class="card-body">
        
  //       <nav className="navbar">
  //         <span className="navbar-brand" >Search Your Book <p>  </p></span>
  //       </nav>
  //       <div className="container">
  //         <div className="search-box">
  //           {/* <input type="text" value={userInput} onChange={handleInputChange} onKeyDown={handleKeyDown}  */}
  //           {/* placeholder="Enter book name" /> */}
            
  //           {/* <button onClick={handleButtonClick} type='submit'>Search</button> */}
  //         </div>
          
  //         <div >
            
  //           <p></p>
  //           {result && <p className="result">{result}</p>}
  //           {imageUrl && <img className="book-image" src={imageUrl} alt="Book Cover" width="150" height="200" class="d-inline-block 2align-center" />}
  //           {userInput && <p className="book-name">: {userInput}</p>}
  //           {author && <p className="book-info">Author: {author}</p>}
  //           {genre && <p className="book-info">Genre: {genre}</p>}
  //           {pages && <p className="book-info">Pages: {pages}</p>}
  //         </div>
  //           {/* <button   type="Submit" onClick={handleCombinedClick} style={{display: 'block', margin: '0 auto',fontFamily: ' serif'}}  >Add Book</button> */}
           
  //         </div>
  //       </div>
  //     </div>
  //   </div>
    
  // )
  // return (
  //   <div>
  //     <div class="container">
      
  
      
        
        
  //       <div className="bookcard">
  //         <p>{result && <p key="result">{result}</p>}</p>
  //         {imageUrl && <img className="book-image" src={imageUrl} alt="Book Cover" width="150" height="200" class="d-inline-block 2align-center" />}
  //         <p>
  //           <div className="details">
  //             {userInput && <p className="book-name">: {userInput}</p>}
  //             {author && <p className="book-info"><b>Author :</b> <b>{author}</b></p>}
  //             {genre && <p className="book-info"><b>Genre:</b> <b>{genre}</b></p>}
  //             {pages && <p className="book-info"><b>Pages:</b> <b>{pages}</b></p>}
  //           </div>
  //         </p>
  //         <div className="chatbox">
  //           <h1>Chat</h1>
  //           <input placeholder="message" onChange={(e) => {
  //             setMessage(e.target.value);
  //           }} />
  //           <button >Send Message</button>
  //           {/* <h1>Message</h1> */}
  //           <br />
  //           <br />
  //           <br />
  //           <p>message : {mReceived} </p>
            
  //           <br />
  //         </div>
  //       </div>
  //     </div>
         
  //   </div>
  // );
  return (
    <div>
      <Navbar/>
    <div class="test">
      <div class="container">
        <div className="bookcard">
          <p>{result && <p key="result">{result}</p>}</p>
          {imageUrl && <img className="book-image" src={imageUrl} alt="Book Cover" width="150" height="200" class="d-inline-block 2align-center" />}
          <p>
            <div className="details">
              {userInput && <p className="book-name">: {userInput}</p>}
              {author && <p className="book-info"><b>Author :</b> <b>{author}</b></p>}
              {genre && <p className="book-info"><b>Genre:</b> <b>{genre}</b></p>}
              {pages && <p className="book-info"><b>Pages:</b> <b>{pages}</b></p>}
            </div>
          </p>
        </div>
        <div className="chatbox">
            <h1>Chat</h1>
            
            <form action="#" id="send-container">
            <input Name="messageInp" placeholder="message" id="messageInp"  onChange={(e) => {
              setMessage(e.target.value);}}></input>
                  <button class="btn">Send</button>
         </form>
            {/* <h1>Message</h1> */}
            <br />
            <br />
            <br />
            <p>message : {mReceived} </p>
            
            <br />
          </div>
      </div>
         
    </div>
    </div>
  );
};

export default Shared;