import { combineReducers } from 'redux';
import { SET_IS_BANNER_SCROLLING } from 'constants/actionTypes/generic';

export default combineReducers({ isBannerScrolling: isBannerScrollingReducer });

function isBannerScrollingReducer(state = false, action) {
    switch (action.type) {
        case SET_IS_BANNER_SCROLLING:
            return action.value;
        default:
            return state;
    }
}
