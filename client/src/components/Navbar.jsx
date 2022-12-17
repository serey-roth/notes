import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { onSignedOut } = useAuthContext();
    return (
        <div style={{
            display: 'flex',
            width: '100%',
        }}>
            <button
            type='button'
            onClick={onSignedOut}
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