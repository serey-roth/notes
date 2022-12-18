import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { auth, signOut, onSignedOut } = useAuthContext();

    const handleSignOut = () => {
        signOut(_, {
            onSuccess: onSignedOut,
        })
    }

    return (
        <div style={{
            display: 'flex',
        }}>
            <button
            type='button'
            onClick={handleSignOut}
            style={{
                border: 0,
                backgroundColor: 'inherit',
                textDecoration: 'underline',
            }}>
                Sign Out
            </button>
        </div>
    )
}

export default Navbar