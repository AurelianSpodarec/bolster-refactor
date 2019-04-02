import { SET_TEMPLATE } from 'constants/actionTypes/templateBuilder';

export default template => dispatch =>
    dispatch({
        type: SET_TEMPLATE,
        template
    });
