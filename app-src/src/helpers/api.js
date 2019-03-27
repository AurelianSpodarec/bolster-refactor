import jwtDecode from 'jwt-decode';

// getAuthHeader  returns an authorization header with jwt token.
export function getAuthHeader() {
    let token = localStorage.getItem('token');

    if (token && token.length) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

// getHeaders returns a header object to pass to api requests.
export function getHeaders() {
    return {
        headers: getAuthHeader()
    };
}

// returns a decoded jwt object or an error
export function getDecodedJWT() {
    const token = localStorage.getItem('token');
    return new Promise(resolve => {
        const decoded = jwtDecode(token);

        resolve(decoded);
    });
}
