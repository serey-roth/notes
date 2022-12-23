import React from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
        toast('Logged out!')
    }

    return (
        <div style={{
            display: 'flex',
        }}>
            <button
            type='button'
            onClick={logout}
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