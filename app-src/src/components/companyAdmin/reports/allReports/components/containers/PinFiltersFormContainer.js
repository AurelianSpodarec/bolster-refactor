import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';

import PinFiltersForm from '../presentational/PinFiltersForm';

export class PinFiltersFormContainer extends Component {
    render() {
        return <PinFiltersForm />;
    }
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer,
        buildingsReducer,
        floorsReducer,
        drawingsReducer
    }
}) => ({
    sites: Object.values(sitesReducer.sites),
    sitesFilter: sitesReducer.filters,
    buildings: Object.values(buildingsReducer.buildings),
    floors: Object.values(floorsReducer.floors),
    drawings: Object.values(drawingsReducer)
});

export default connect(
    mapStateToProps,
    null
)(PinFiltersFormContainer);
