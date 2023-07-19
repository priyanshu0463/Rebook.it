import React,{useRef,useState} from 'react'
import {Form,Button,Card,Alert} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import {useAuth} from "../contexts/AuthContext"
import {Link,useNavigate as useHistory} from "react-router-dom"

export default function Login() {
    const emailRef= useRef()
    const passwordRef= useRef()
   
    const {login}=useAuth();
    const [error,setError]=useState('');
    const [loading,setloading]=useState(false)
    const history=useHistory()

    async function handleSubmit(e){
        e.preventDefault()

         
         try {
            setError("")
            setloading(true)
           await login(emailRef.current.value,passwordRef.current.value)
           history("/api")
         }catch(e){
            console.error(e);
            setError("failed to login")
         }
        //  catch{
        //     setError("failed to login")
        //     console.log(error)
        //  }
         setloading(false) 
        
    } 

    return (
    <>
    <div className="d-flex align-items-center justify-content-center"
      style={{minHeight:"100vh"}}>

    <Card >
       <Card.Body>

        <h2 className="d-flex justify-content-center">Login</h2>
        
        {error && <Alert varient='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>  
            <Form.Group id="password">
                <Form.Label className='mt-3'>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>  
            <Button disabled={loading} className="w-100 mt-3" type="submit">Log In</Button> 
        </Form>
        <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
    </div>
       </Card.Body>
    </Card>
    
          </div>
    </>
  );
}
