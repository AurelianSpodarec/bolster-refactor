import { CLIENT_SELECT_COMPANY } from 'constants/client/actionTypes/clientSelectCompany';

export default id => dispatch =>
    dispatch({
        type: CLIENT_SELECT_COMPANY,
        id
    });
