import { useMutation } from "react-query"
import { signIn, signUp } from "../../api"

export const useSignIn = () => {
    return useMutation(signIn)
}

export const useSignUp = () => {
    return useMutation(signUp);
}