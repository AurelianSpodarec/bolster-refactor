import React, { Component } from 'react';
import { connect } from 'react-redux';
import PinFiltersForm from '../presentational/PinFiltersForm';

export class PinFiltersFormContainer extends Component {
    render() {
        return <PinFiltersForm />;
    }

    _getFilteredSites = () => {
        const { sites, filters } = this.props;
        const { status } = filters;
        const name = filters.name.toLowerCase();

        return sites
            .filter(site => site.name.toLowerCase().includes(name))
            .filter(
                ({ accessType }) =>
                    !status.length || status + '' === accessType + ''
            );
    };
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
