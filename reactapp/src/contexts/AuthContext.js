import React,{useContext,useState,useEffect} from 'react'
import {auth} from "../firebase"


const AuthContext =React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser,setCurrentUser]=useState();
    const[loading,setloading]=useState(true)

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }


    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    useEffect(()=>{
        const unsuscribe=auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setloading(false)
        })
        return unsuscribe

    },[])
    const value ={
        currentUser,
        login,
        signup
    }

  return (
    <AuthContext.Provider value ={value}>
       {!loading && children} 
    </AuthContext.Provider>
  )
}
