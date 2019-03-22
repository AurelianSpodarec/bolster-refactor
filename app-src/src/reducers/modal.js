import { combineReducers } from 'redux';

import { HIDE_MODAL, SHOW_MODAL } from 'constants/actionTypes/generic';

export default combineReducers({
    modalType: modalTypeReducer,
    modalProps: modalPropsReducer
});

function modalTypeReducer(state = '', action) {
    switch (action.type) {
        case SHOW_MODAL:
            return action.modalType;
        case HIDE_MODAL:
            return false;
        default:
            return state;
    }
}

function modalPropsReducer(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return action.modalProps;
        case HIDE_MODAL:
            return false;
        default:
            return state;
    }
}
