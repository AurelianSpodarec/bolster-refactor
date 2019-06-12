import { combineReducers } from 'redux';
import {
    FETCH_LIVE_HISTORIES_REQUEST,
    FETCH_LIVE_HISTORIES_SUCCESS,
    FETCH_LIVE_HISTORIES_FAILURE,
    FETCH_HISTORY_FEED_REQUEST,
    FETCH_HISTORY_FEED_SUCCESS,
    FETCH_HISTORY_FEED_FAILURE,
    UPDATE_DASHBOARD_SETTING,
    FETCH_DASH_PINS_STATS_REQUEST,
    FETCH_DASH_PINS_STATS_SUCCESS,
    FETCH_DASH_PINS_STATS_FAILURE
} from 'constants/actionTypes/dashboard';
import { updateObj, convertArrToObj } from 'helpers/generic';

export default combineReducers({
    error: errorReducer,
    isFetchingDashPinsStats: isFetchingDashPinsStatsReducer,
    isInitialFetching: isInitialFetchingReducer,
    isLiveFetching: isLiveFetchingReducer,
    liveHistories: liveHistoriesReducer,
    dashPinsStats: dashPinsStatsReducer,
    settings: settingsReducer
});

function isFetchingDashPinsStatsReducer(state = false, action) {
    switch (action.type) {
        case FETCH_DASH_PINS_STATS_REQUEST:
            return true;
        case FETCH_DASH_PINS_STATS_FAILURE:
        case FETCH_DASH_PINS_STATS_SUCCESS:
            return false;
        default:
            return state;
    }
}

function isInitialFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_HISTORY_FEED_REQUEST:
            return true;
        case FETCH_HISTORY_FEED_SUCCESS:
        case FETCH_HISTORY_FEED_FAILURE:
        case FETCH_LIVE_HISTORIES_REQUEST:
            return false;
        default:
            return state;
    }
}
function isLiveFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_LIVE_HISTORIES_REQUEST:
            return true;
        case FETCH_LIVE_HISTORIES_SUCCESS:
        case FETCH_HISTORY_FEED_REQUEST:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_HISTORY_FEED_REQUEST:
        case FETCH_LIVE_HISTORIES_REQUEST:
        case FETCH_DASH_PINS_STATS_REQUEST:
            return null;
        case FETCH_HISTORY_FEED_FAILURE:
        case FETCH_LIVE_HISTORIES_FAILURE:
        case FETCH_DASH_PINS_STATS_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function dashPinsStatsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_DASH_PINS_STATS_SUCCESS:
            return convertArrToObj(action.payload);
        default:
            return state;
    }
}

function liveHistoriesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_HISTORY_FEED_SUCCESS:
            return {
                updatedOn: action.payload.updatedOn,
                items: { ...state.items }
            };
        case FETCH_LIVE_HISTORIES_SUCCESS:
            //update state with new pins
            return {
                updatedOn: action.payload.updatedOn,
                items: { ...state.items }
            };
        default:
            return state;
    }
}

function settingsReducer(
    state = {
        serviceType: [],
        liveTimePeriod: 0,
        startDate: new Date(),
        endDate: new Date()
    },
    action
) {
    switch (action.type) {
        case UPDATE_DASHBOARD_SETTING:
            return updateObj(state, action.key, action.value);
        default:
            return state;
    }
}
