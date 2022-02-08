import { SET_USER_FILTERS } from 'constants/actionTypes/usersManagement';

export default userFilterType => dispatch =>
    dispatch({
        type: SET_USER_FILTERS,
        userFilterType,
    });
