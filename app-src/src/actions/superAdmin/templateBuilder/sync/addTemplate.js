import { ADD_TEMPLATE } from 'constants/actionTypes/templateBuilder';

export default template => dispatch =>
    dispatch({
        type: ADD_TEMPLATE,
        template
    });
