import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <header className='chat-header'>
                <h1>
                    <i className='fas fa-smile'></i> Haegele Game
                </h1>
                <Link to='./' className='btn'>
                    Home
                </Link>
            </header>
        </div>
    );
};

export default Navbar;
