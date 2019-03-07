import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_ALL_BUILDINGS_REQUEST,
    FETCH_ALL_BUILDINGS_SUCCESS,
    FETCH_ALL_BUILDINGS_FAILURE,
    FETCH_SINGLE_BUILDING_REQUEST,
    FETCH_SINGLE_BUILDING_SUCCESS,
    FETCH_SINGLE_BUILDING_FAILURE
} from 'constants/actionTypes/buildings';

export const initialState = {
    buildings: {},
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_BUILDINGS_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_ALL_BUILDINGS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                buildings: convertArrToObj(action.payload)
            };
        case FETCH_ALL_BUILDINGS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        case FETCH_SINGLE_BUILDING_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_SINGLE_BUILDING_SUCCESS:
            return {
                ...state,
                isFetching: false,
                buildings: {
                    ...state.buildings,
                    [action.payload.id.toString()]: action.payload
                }
            };
        case FETCH_SINGLE_BUILDING_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
