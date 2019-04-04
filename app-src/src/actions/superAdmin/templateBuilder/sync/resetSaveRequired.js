import { RESET_SAVE_REQUIRED } from 'constants/actionTypes/templateBuilder';

export default () => dispatch =>
    dispatch({
        type: RESET_SAVE_REQUIRED
    });
