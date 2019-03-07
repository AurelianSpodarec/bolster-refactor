import {
    UPDATE_BUILDINGS_SEARCH_TERM,
    SET_BUILDINGS_FILTER_STATUS
} from 'constants/actionTypes/buildings';

export const initialState = {
    searchTerm: '',
    status: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BUILDINGS_SEARCH_TERM:
            return { ...state, searchTerm: action.searchTerm };
        case SET_BUILDINGS_FILTER_STATUS:
            return { ...state, status: action.status };
        default:
            return state;
    }
};
