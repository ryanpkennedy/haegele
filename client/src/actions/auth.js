import axios from 'axios';

import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

//register user
export const register = ({ name, room }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    const body = JSON.stringify({ name, room });

    try {
        const res = await axios.post('/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors);

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};
