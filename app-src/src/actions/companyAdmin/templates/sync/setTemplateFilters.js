import { SET_TEMPLATE_FILTERS } from 'constants/actionTypes/templates';

export default templateFilterType => dispatch =>
    dispatch({
        type: SET_TEMPLATE_FILTERS,
        templateFilterType,
    });
