// getAuthHeader  returns an authorization header with jwt token.
export function getAuthHeader() {
    let token = localStorage.getItem('token');

    if (token && token.length) {
        return { token };
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
