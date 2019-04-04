import { combineReducers } from 'redux';

import { updateObj, removeObjItem } from 'helpers/generic';
import {
    SET_SECTION,
    DELETE_SECTION
} from 'constants/actionTypes/templateBuilder';

const defaultSections = {
    '9d707ec0-52e3-11e9-8633-45ed325a6f1e': {
        name: 'Section 1',
        sort: 1,
        uuid: '9d707ec0-52e3-11e9-8633-45ed325a6f1e',
        templateUuid: '9d707ec0-52e3-11e9-8633-45ed325a6f22'
    },
    '9d707ec0-52e3-11e9-8633-45ed325a6f2f': {
        name: 'Section 2',
        sort: 2,
        uuid: '9d707ec0-52e3-11e9-8633-45ed325a6f2f',
        templateUuid: '9d707ec0-52e3-11e9-8633-45ed325a6f22'
    }
};

export default combineReducers({
    sections: sectionsReducer
});

function sectionsReducer(state = defaultSections, action) {
    switch (action.type) {
        case SET_SECTION:
            return updateObj(state, action.section.uuid, action.section);
        case DELETE_SECTION:
            return removeObjItem(state, action.uuid);
        default:
            return state;
    }
}
