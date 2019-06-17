import { CLIENT_UPDATE_FURTHER_FILTRATION_OPTION } from 'constants/client/actionTypes/clientReports';

export default value => async dispatch =>
    await dispatch({
        type: CLIENT_UPDATE_FURTHER_FILTRATION_OPTION,
        value
    });
