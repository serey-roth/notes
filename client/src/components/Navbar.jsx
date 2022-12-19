import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { onSignedOut } = useAuthContext();

    return (
        <div style={{
            display: 'flex',
        }}>
            <button
            type='button'
            onClick={onSignedOut}
            style={{
                border: 0,
                backgroundColor: 'inherit',
                textDecoration: 'underline',
            }}>
                Log Out
            </button>
        </div>
    )
}

export default Navbar