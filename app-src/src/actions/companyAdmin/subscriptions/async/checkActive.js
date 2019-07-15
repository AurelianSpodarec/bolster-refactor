import axios from 'axios';
import { AUTH_API_URL } from 'config';

export const checkActive = async companyID => {
    try {
        const active = await axios.get(
            `${AUTH_API_URL}/auth/hasactive/${companyID}`
        );
        return active;
    } catch {
        return false;
    }
};
