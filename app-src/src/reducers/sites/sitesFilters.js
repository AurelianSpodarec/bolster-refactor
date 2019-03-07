import {
    UPDATE_SITES_SEARCH_TERM,
    SET_SITES_FILTER_STATUS
} from 'constants/actionTypes/sites';

export const initialState = {
    name: '',
    status: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SITES_SEARCH_TERM:
            return { ...state, name: action.searchTerm };
        case SET_SITES_FILTER_STATUS:
            return { ...state, status: action.status };
        default:
            return state;
    }
};
