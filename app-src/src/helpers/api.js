import jwtDecode from 'jwt-decode';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

// getAuthHeader  returns an authorization header with jwt token.
export function getAuthHeader() {
    const token = localStorage.getItem('token');

    if (token && token.length) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

// getHeaders returns a header object to pass to api requests.
export function getHeaders() {
    return {
        headers: { ...getAuthHeader(), platform: 'Web' },
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
    const token = localStorage.getItem('token') || '';
    return new Promise(resolve => {
        try {
            const decoded = jwtDecode(token);
            resolve(formatJWTData(decoded));
        } catch {
            resolve({});
        }
    });
}

export function formatJWTData({
    IsSuperAdmin,
    IsCompanyAdmin,
    IsClientAccess,
    ID,
    CompanyID,
    CompanyUserID,
    CompanyUserType,
    HeadquartersCompanyUserID,
    HeadquartersCompanyUserType,
    HeadquartersCompanyID,
    ...rest
}) {
    return {
        id: JSON.parse(ID),
        isSuperAdmin: JSON.parse(IsSuperAdmin),
        isCompanyAdmin: JSON.parse(IsCompanyAdmin),
        isClientAccess: JSON.parse(IsClientAccess),
        companyID: JSON.parse(CompanyID),
        companyUserID: JSON.parse(CompanyUserID),
        companyUserType: JSON.parse(CompanyUserType),
        headquartersCompanyID: JSON.parse(HeadquartersCompanyID),
        headQuartersCompanyUserID: JSON.parse(HeadquartersCompanyUserID),
        headQuartersCompanyUserType: JSON.parse(HeadquartersCompanyUserType),
        ...rest,
    };
}

export function handleErrors(func) {
    return function ({ response, message }) {
        console.log({ response, message });
        if (response?.status === 400) return setAPIFieldErrors(response.data.errors);
        // if (response && response.status === 401)
        // redirect to login
        if (typeof response?.data === 'string' && response?.data) {
            return func(response.data);
        }
        return func(message);
    };
}
