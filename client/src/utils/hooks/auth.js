import { useEffect } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { 
    login as signIn, 
    register as signUp, 
    googleLogin as googleSignIn
} from "../../api"

export const useLogin = () => {
    const navigate = useNavigate();
    const { 
        mutate: login, 
        mutateAsync: loginAsync,
        isLoading: isLoggingIn, 
        isError: isErrorLoggingIn, 
        isSuccess: isLoggedIn,
        error: loginError,
        ...rest
    } = useMutation({
        mutationFn: signIn
    })

    useEffect(() => {
        if (isLoggedIn) { 
            navigate('/home');
        }
    }, [isLoggedIn]);

    return {
        login, 
        loginAsync,
        isLoggingIn,
        isErrorLoggingIn,
        isLoggedIn,
        loginError,
        ...rest
    }
}

export const useRegister = () => {
    const navigate = useNavigate();
    const { 
        mutate: register, 
        mutateAsync: registerAsync,
        isLoading: isRegistering, 
        isError: isErrorRegistering, 
        isSuccess: isRegistered,
        error: registrationError,
        ...rest
    } = useMutation({
        mutationFn: signUp,
    });

    useEffect(() => {
        if (isRegistered) { 
            navigate('/home');
        }
    }, [isRegistered]);

    return  { 
        register, 
        registerAsync,
        isRegistering, 
        isErrorRegistering, 
        isRegistered,
        registrationError,
        ...rest
    }
}

export const useGoogleLogin = () => {
    const navigate = useNavigate();
    const {
        mutate: googleLogin,
        mutateAsync: googleLoginAsync,
        isLoading: isGoogleLoggingIn,
        isError: isErrorGoogleLogin,
        isSuccess: isGoogleLoggedIn,
        error: googleLogInError,
    } = useMutation({
        mutationFn: googleSignIn
    });

    useEffect(() => {
        if (isGoogleLoggedIn) { 
            navigate('/home');
        }
    }, [isGoogleLoggedIn]);
    
    return {
        googleLogin,
        googleLoginAsync,
        isGoogleLoggingIn,
        isErrorGoogleLogin,
        isGoogleLoggedIn,
        googleLogInError,
    }
}