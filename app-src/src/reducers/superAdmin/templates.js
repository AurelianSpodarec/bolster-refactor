import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import { SET_TEMPLATE } from 'constants/actionTypes/templateBuilder';

const defaultTemplates = {
    '9d707ec0-52e3-11e9-8633-45ed325a6f22': {
        name: 'Template 1',
        uuid: '9d707ec0-52e3-11e9-8633-45ed325a6f22'
    },
    '33707ec0-52e3-11e9-8633-45ed325a6f2f': {
        name: 'Template 2',
        uuid: '33707ec0-52e3-11e9-8633-45ed325a6f2f'
    }
};

export default combineReducers({
    templates: templatesReducer,
    requiresSave: requiresSaveReducer
});

function templatesReducer(state = defaultTemplates, action) {
    switch (action.type) {
        case SET_TEMPLATE:
            return updateObj(state, action.template.uuid, action.template);
        default:
            return state;
    }
}

function requiresSaveReducer(state = false, action) {
    switch (action.type) {
        case SET_TEMPLATE:
            return true;
        default:
            return state;
    }
}
