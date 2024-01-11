import { GoogleAuthProvider,  createUserWithEmailAndPassword,  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase.config";
import axios from "axios";



export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvide = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () =>{
        setLoading(true);
        return signOut(auth)
    }

    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = (value) =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail};
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
            if(currentUser){
                // const loggedUser = {email: userEmail};
                // const loggedUser = {email: currentUser.email};
                axios.post('https://car-doctor-server-pi-eight.vercel.app/jwt',loggedUser, {withCredentials: true})
                .then(res =>{
                    console.log('token response', res.data);
                })
            }
            else{
                axios.post('https://car-doctor-server-pi-eight.vercel.app/logout', loggedUser, {withCredentials: true})
                .then(res =>{
                    console.log(res.data);
                })
            }
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        createUser,
        logout,
        login,
        loading,
        googleSignIn
        
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvide;