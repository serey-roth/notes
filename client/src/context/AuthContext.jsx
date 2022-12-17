import { useNavigate } from 'react-router-dom'

import { useState, useContext, createContext, useEffect } from "react";
import { useSignIn, useSignUp } from "../utils/hooks/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);

    const { 
        mutate: signIn, 
        isLoading: isSigningIn, 
        isError: isErrorSigningIn, 
        isSuccess: isSignedIn } = useSignIn();

    const { 
        mutate: signUp, 
        isLoading: isSigningUp, 
        isError: isErrorSigningUp, 
        isSuccess: isSignedUp } = useSignUp();

    const onSuccessAuth = (auth) => {
        if (auth) {
            setAuth(auth);
            localStorage.setItem('currentUser', JSON.stringify(auth));
            navigate('/notes');
        }
    }

    const onSignedOut = () => {
        setAuth(null);
        localStorage.removeItem('currentUser');
        navigate('/');
    }

    useEffect(() => {
        const storage = localStorage.getItem('currentUser');
        if (storage && JSON.parse(storage)) {
            setAuth(JSON.parse(storage));
        }
    },[])

    useEffect(() => {
        if (auth) {
            navigate('/notes');
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            signIn,
            signUp,
            onSuccessAuth,
            onSignedOut,
            isSigningIn,
            isSigningUp,
            isSignedIn,
            isSignedUp,
            isErrorSigningIn,
            isErrorSigningUp
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);