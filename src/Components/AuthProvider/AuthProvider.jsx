import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../../Firebase/Firebase.config';
export const AuthContext= createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const[user, setUser] =useState(null)

    const [loading,setLoading]=useState(true)
const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
    
}
const signIn=(email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth , email, password)
    
}
const createUser= (email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
}
const logout= ()=>{
    setLoading(true)
    return signOut(auth)
}
useEffect(()=>{
    
  const unsubscribe =  onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)
    })
    return ()=>{
        unsubscribe()
    }
},[])
const authInfo ={googleSignIn,user,createUser,signIn,logout,loading}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;