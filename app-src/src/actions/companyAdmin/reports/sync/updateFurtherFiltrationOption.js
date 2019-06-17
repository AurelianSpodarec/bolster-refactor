import { UPDATE_FURTHER_FILTRATION_OPTION } from 'constants/actionTypes/reports';

export default value => async dispatch =>
    await dispatch({
        type: UPDATE_FURTHER_FILTRATION_OPTION,
        value
    });
