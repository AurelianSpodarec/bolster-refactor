import React from 'react';
import { connect } from 'react-redux';

import MapPinSelector from '../presentational/MapPinSelector';
import { isObjEmpty, componentWillUnmount } from 'helpers/generic';
import removeAllExcludedPins from 'actions/companyAdmin/reports/sync/removeAllExcludedPins';
import removeAllRectangles from 'actions/companyAdmin/reports/sync/removeAllRectangles';
import clientRemoveAllExcludedPins from 'actions/client/reports/create/sync/clientRemoveAllExcludedPins';
import clientRemoveAllRectangles from 'actions/client/reports/create/sync/clientRemoveAllRectangles';

const MapPinSelectorContainer = ({
    pins,
    rectangles,
    excludedPinIDs,
    handleClick,
    removeAllExcludedPins,
    removeAllRectangles,
    isClient
}) => {
    componentWillUnmount(() => {
        removeAllRectangles();
        removeAllExcludedPins();
    });

    const filteredPins = !isObjEmpty(rectangles)
        ? pins.filter(({ id }) => !excludedPinIDs.includes(id))
        : [];
    return (
        <MapPinSelector
            handleClick={handleClick}
            pins={filteredPins}
            isClient={isClient}
        />
    );
};

const mapStateToProps = (state, { isClient }) => {
    const reducer = state[isClient ? 'client' : 'companyAdmin'];
    const { reportsReducer } = reducer;
    return {
        pins: reportsReducer.customFilters.pins,
        rectangles: reportsReducer.rectangles,
        excludedPinIDs: Object.values(reportsReducer.excludedPinIDs)
    };
};

const mapDispatchToProps = (dispatch, { isClient }) => ({
    removeAllExcludedPins: () =>
        dispatch(
            isClient ? clientRemoveAllExcludedPins() : removeAllExcludedPins()
        ),
    removeAllRectangles: () =>
        dispatch(isClient ? clientRemoveAllRectangles() : removeAllRectangles())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPinSelectorContainer);
