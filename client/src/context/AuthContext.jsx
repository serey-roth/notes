import { useNavigate } from 'react-router-dom'
import { useState, useContext, createContext, useEffect } from "react";
import decode from 'jwt-decode'

import { useLogin, useRegister, useWhoAmI, useGoogleLogin } from "../utils/hooks/auth";
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    const {
        mutate: googleLogin,
        isLoading: isGoogleLoggingIn,
        isError: isErrorGoogleLogin,
    } = useGoogleLogin();

    const onSuccessAuth = (auth) => {
        setAuth(auth);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(auth.token));
        navigate('/home');
    }

    const onSignedOut = () => {
        setAuth(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
        navigate('/');
    }

    const onErrorAuth = (error) => {
        (error) => {
            toast.error(error.message);
            onSignedOut();
        }
    }

    const onGoogleCallbackResponse = (response) => {
        googleLogin(response.credential, {
            onSuccess: onSuccessAuth,
        });
    }

    const { 
        mutate: whoAmI,
        isLoading: isAuthenticating,
        isError: isNotAuthenticated,
        error,
    } = useWhoAmI(onSuccessAuth, onErrorAuth);

    useEffect(() => {
        whoAmI();
    }, [])

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
            isAuthenticated,
            onGoogleCallbackResponse
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);