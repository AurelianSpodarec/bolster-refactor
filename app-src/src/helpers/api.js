import jwtDecode from 'jwt-decode';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

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

// autenticate validates a JWT token and resolves the decoded token.
export function authenticate() {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');

        if (!(token && token.length)) reject();
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp < new Date().valueOf() / 1000;
        if (isExpired) reject('Expired token.');

        resolve(formatJWTData(decoded));
    });
}

// returns a decoded jwt object or an error.
export function getDecodedJWT() {
    const token = localStorage.getItem('token');
    return new Promise(resolve => {
        const decoded = jwtDecode(token);
        resolve(formatJWTData(decoded));
    });
}

export function formatJWTData({
    exp,
    iat,
    nbf,
    IsSuperAdmin,
    ID,
    CompanyID,
    CompanyUserID,
    CompanyUserType
}) {
    return {
        exp,
        iat,
        nbf,
        id: JSON.parse(ID),
        isSuperAdmin: JSON.parse(IsSuperAdmin),
        companyID: JSON.parse(CompanyID),
        companyUserID: JSON.parse(CompanyUserID),
        companyUserType: JSON.parse(CompanyUserType)
    };
}

export function handleErrors(func) {
    return function({ response, message }) {
        if (response && response.status === 400)
            return setAPIFieldErrors(response.data.errors);
        // if (response && response.status === 401)
        // redirect to login

        return func(message);
    };
}
