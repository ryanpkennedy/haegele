import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';

const Landing = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        room: '',
    });

    const { name, room } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        register({ name, room });
    };

    if (isAuthenticated) {
        return <Redirect to='/lobby' />;
    }

    return (
        <div className='join-container'>
            <main className='join-main'>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='form-control'>
                        <label htmlFor='name'>Username</label>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            id='userid'
                            placeholder='Enter username...'
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='room'>Room</label>
                        <input
                            type='text'
                            name='room'
                            value={room}
                            id='roomid'
                            placeholder='Enter roomcode...'
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <input type='submit' className='btn' value='Join Game' />
                    <Link to='/lobby'>
                        <button type='submit' className='btn'>
                            Create Room
                        </button>
                    </Link>
                </form>
            </main>
        </div>
    );
};

Landing.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Landing);
