import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { 
    login as signIn, 
    register as signUp, 
    whoAmI, 
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

export const useValidateUser = () => {
    const navigate = useNavigate();
    const { 
        mutate: user,
        isLoading: isValidatingUser,
        isError: isInvalidUser,
        error: validationError,
        isSuccess: isValidUser,
        ...rest
    } = useMutation({
        mutationFn: whoAmI,
    });

    user();

    useEffect(() => {
        if (isValidUser) navigate('/home');
        else if (isInvalidUser) {
            navigate('/');
        }
    }, [isValidUser, isInvalidUser,])

    return {
        user,
        isValidatingUser,
        isInvalidUser,
        validationError,
        isValidUser,
        ...rest,
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

export function notifyAuth(authPromise) {
    toast.promise(authPromise, {
        loading: 'Please wait...',
        error: (error) => error.message,
        success: 'Logged In!'
    }, {
        style: {
            minWidth: '250px'
        },
        success: {
            duration: 1000,
        }
    })
}