import { LOGOUT } from 'constants/actionTypes/auth';

export const logout = () => {
    localStorage.setItem('token', '');
    return {
        type: LOGOUT,
        payload: {}
    };
};
