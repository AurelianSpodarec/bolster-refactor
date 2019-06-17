import { UPDATE_IS_PIN_EXCLUDED } from 'constants/actionTypes/reports';

export default (id, isExcluded) => async dispatch =>
    await dispatch({
        type: UPDATE_IS_PIN_EXCLUDED,
        id,
        isExcluded
    });
