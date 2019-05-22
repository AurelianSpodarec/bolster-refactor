import { CLIENT_SELECT_PIN_HISTORY } from 'constants/client/actionTypes/clientPins';

export default id => dispatch =>
    dispatch({
        type: CLIENT_SELECT_PIN_HISTORY,
        id
    });
