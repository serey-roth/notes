import { useMutation } from "react-query"
import { logOut, signIn, signUp } from "../../api"

export const useSignIn = () => {
    return useMutation(signIn)
}

export const useSignUp = () => {
    return useMutation(signUp);
}

export const useSignOut = () => {
    return useMutation(logOut);
}