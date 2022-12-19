import { useNavigate } from 'react-router-dom'
import { useState, useContext, createContext, useEffect } from "react";
import decode from 'jwt-decode'

import { useLogin, useRegister } from "../utils/hooks/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);

    const { 
        mutate: login, 
        isLoading: isLoggingIn, 
        isError: isErrorLoggingIn, 
    } = useLogin();

    const { 
        mutate: register, 
        isLoading: isRegistering, 
        isError: isErrorRegistering, 
    } = useRegister();

    const onSuccessAuth = (auth) => {
        if (auth) {
            setAuth(auth);
            localStorage.setItem('currentUser', JSON.stringify(auth.token));
            navigate('/home');
        }
    }

    const onSignedOut = () => {
        setAuth(null);
        localStorage.removeItem('currentUser');
        navigate('/');
    }

    useEffect(() => {
        const token = auth?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < (new Date()).getTime()) {
                onSignedOut();
            }
        }
    })

    return (
        <AuthContext.Provider value={{
            auth,
            login, 
            register,
            onSuccessAuth,
            onSignedOut,
            isLoggingIn,
            isRegistering,
            isErrorLoggingIn,
            isErrorRegistering,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);