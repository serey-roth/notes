import { useMutation } from "react-query"
import { login, logout, register } from "../../api"

export const useLogin = () => {
    return useMutation(login)
}

export const useRegister = () => {
    return useMutation(register);
}