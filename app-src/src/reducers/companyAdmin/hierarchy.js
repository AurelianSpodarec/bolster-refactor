import { combineReducers } from 'redux';
import { UPDATE_HIERARCHY_ADD_STATE } from 'constants/actionTypes/hierarchy';

export default combineReducers({
    isAdding: isAddingReducer
});

function isAddingReducer(state = false, action) {
    switch (action.type) {
        case UPDATE_HIERARCHY_ADD_STATE:
            return action.value;
        default:
            return state;
    }
}
