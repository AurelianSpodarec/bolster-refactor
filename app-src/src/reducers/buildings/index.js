import { combineReducers } from 'redux';

import buildings from './buildings';
import buildingsFilters from './buildingFilters';

export default combineReducers({
    buildings,
    buildingsFilters
});
