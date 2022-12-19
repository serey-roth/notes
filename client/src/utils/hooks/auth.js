import { useMutation } from "react-query"
import { login, register, whoAmI, googleLogin } from "../../api"

export const useLogin = () => {
    return useMutation({
        mutationFn: login
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: register,
    });
}

export const useWhoAmI = (onSuccess, onError) => {
    return useMutation({
        mutationFn: whoAmI,
        onSuccess,
        onError
    });
}

export const useGoogleLogin = () => {
    return useMutation({
        mutationFn: googleLogin
    });
}