import { useNavigate } from 'react-router-dom'
import { useState, useContext, createContext, useEffect } from "react";
import decode from 'jwt-decode'
import Cookies from 'js-cookie'

import { useSignIn, useSignUp } from "../utils/hooks/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { 
        mutate: signIn, 
        isLoading: isSigningIn, 
        isError: isErrorSigningIn, 
        isSuccess: isSignedIn 
    } = useSignIn();

    const { 
        mutate: signUp, 
        isLoading: isSigningUp, 
        isError: isErrorSigningUp, 
        isSuccess: isSignedUp 
    } = useSignUp();

    const onSuccessAuth = (auth) => {
        if (auth) {
            setIsAuthenticated(true);
            setAuth(auth);
            navigate('/notes');
        }
    }

    const onSignedOut = () => {
        setIsAuthenticated(false);
        setAuth(null);
        navigate('/');
    }

    useEffect(() => {
        if (auth) {
            navigate('/notes');
        } else {
            navigate('/');
        }
    }, [auth])

    useEffect(() => {
        const token = auth?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < (new Date()).getTime()) {
                onSignedOut();
                setIsAuthenticated(false);
            }
        }
    })

    useEffect(() => {
        const token = Cookies.get('x-auth-token');
        const result = Cookies.get('x-auth-info');
        if (result && token) {
            Cookies.remove('x-auth-token');
            Cookies.remove('x-auth-info');
            const info = {
                result,
                token
            };
            setIsAuthenticated(true);
            setAuth(info);
        }
    }, [auth])

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
            isErrorSigningUp,
            isAuthenticated,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);