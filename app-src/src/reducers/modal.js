import { combineReducers } from 'redux';

import { HIDE_MODAL, SHOW_MODAL } from 'constants/actionTypes/generic';
import { PIN_IMAGE } from 'constants/modalTypes';
export default combineReducers({
    modalType: modalTypeReducer,
    modalProps: modalPropsReducer
});

function modalTypeReducer(state = PIN_IMAGE, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return action.modalType;
        case HIDE_MODAL:
            return null;
        default:
            return state;
    }
}

function modalPropsReducer(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return action.modalProps;
        case HIDE_MODAL:
            return {};
        default:
            return state;
    }
}
