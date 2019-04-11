import { combineReducers } from 'redux';

import { updateObj, convertArrToObj, removeObjItem } from 'helpers/generic';

export default combineReducers({
    companySettings: companySettingsReducer
});
