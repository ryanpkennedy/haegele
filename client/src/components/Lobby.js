import React, { useState, useEffect } from 'react';

const Lobby = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/users');
            const users = await response.json();
            console.log(users);
            setUsers(users);
        }
        fetchData();
    }, []);

    return (
        <div className='chat-container'>
            <div className='chat-sidebar'>
                <h3>
                    <i className='fas fa-comments'></i> Room Name:
                </h3>
                <h2 id='room-name'>Whatever</h2>
                <h3>
                    <i className='fas fa-users'></i> Users
                </h3>
                <ul id='users'>
                    {users.map((player) => (
                        <li key={player._id}>{player.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Lobby;
