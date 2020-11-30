import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import axios from 'axios';

export default postBody => axios.post(`${API_URL}/users/company`, postBody, getHeaders());
