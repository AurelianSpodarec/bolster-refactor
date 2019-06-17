import { CLIENT_UPDATE_IS_PIN_EXCLUDED } from 'constants/client/actionTypes/clientReports';

export default (id, isExcluded) => async dispatch =>
    await dispatch({
        type: CLIENT_UPDATE_IS_PIN_EXCLUDED,
        id,
        isExcluded
    });
