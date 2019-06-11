import { CLIENT_UPDATE_SELECTED_PINS } from 'constants/client/actionTypes/clientReports';

export default pins => dispatch =>
    dispatch({
        type: CLIENT_UPDATE_SELECTED_PINS,
        pins
    });
