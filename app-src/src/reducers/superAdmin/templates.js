import { combineReducers } from 'redux';

// import { updateObj, removeObjItem } from 'helpers/generic';
import {} from 'constants/actionTypes/templateBuilder';

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
    templates: templatesReducer
});

function templatesReducer(state = defaultTemplates, action) {
    switch (action.type) {
        default:
            return state;
    }
}
