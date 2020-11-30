import { combineReducers } from 'redux';

import {
    HIDE_MODAL,
    SHOW_MODAL,
    SHOW_O_AND_M_TS_AND_CS_MODAL,
    HIDE_O_AND_M_TS_AND_CS_MODAL,
} from 'constants/actionTypes/generic';

export default combineReducers({
    modalType: modalTypeReducer,
    modalProps: modalPropsReducer,
    showOAndMTsAndCs: showOAndMTsAndCsReducer,
    oAndMTsAndCsMessage: oAndMTsAndCsModalMessageReducer,
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

function showOAndMTsAndCsReducer(state = false, action) {
    switch (action.type) {
        case SHOW_O_AND_M_TS_AND_CS_MODAL:
            return true;
        case HIDE_O_AND_M_TS_AND_CS_MODAL:
            return false;
        default:
            return state;
    }
}

function oAndMTsAndCsModalMessageReducer(state = null, action) {
    switch (action.type) {
        case SHOW_O_AND_M_TS_AND_CS_MODAL:
            return action.message;
        default:
            return state;
    }
}
