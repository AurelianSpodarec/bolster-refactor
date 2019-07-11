import axios from 'axios';
import { API_URL } from 'config';

export const checkActive = async companyID => {
    try {
        const active = await axios.post(
            `${API_URL}/subscriptions/hasactive/${companyID}`
        );
        return active;
    } catch {
        return false;
    }
};
