import toast from "react-hot-toast"

export function notifyPromise(promise, loadingMessage, successMessage) {
    toast.promise(promise, 
    {
        loading: loadingMessage,
        error: (error) => error.message,
        success: successMessage,
    }, 
    {
        style: {
            minWidth: '250px'
        },
        success: {
            duration: 1000,
        }
    })
}