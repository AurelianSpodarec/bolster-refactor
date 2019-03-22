import { combineReducers } from 'redux';

import {} from 'constants/actionTypes/generic';

export default combineReducers({
    sections: sectionsReducer
});

function sectionsReducer(state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}
