import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';
import postSitesSort from 'actions/companyAdmin/sites/async/postSitesSort';
import setHierarchyIsSorting from 'actions/companyAdmin/hierarchy/sync/setHierarchyIsSorting';
import { companyAdminSitesSort } from 'constants/shared/sortAndFilterOptions';

import SitesFilters from '../presentational/SitesFilters';

class SitesFiltersContainer extends Component {
    render() {
        const { isSorting } = this.props;
        const { name, status } = this.props.filters;
        const { statusOptions } = companyAdminSitesSort;

        return (
            <SitesFilters
                name={name}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={status}
                handleChange={this.handleChange}
                onMobile={this.props.onMobile}
                isSorting={isSorting}
                toggleIsSortingSites={this.toggleIsSortingSites}
            />
        );
    }

    componentDidMount = () => {
        const { updateSitesFilters } = this.props;

        updateSitesFilters('name', '');
        updateSitesFilters('status', 'active');
    };

    handleChange = (name, value) => {
        const { updateSitesFilters } = this.props;
        updateSitesFilters(name, value);
    };

    toggleIsSortingSites = e => {
        e.preventDefault();
        const { updateSitesFilters, setHierarchyIsSorting, isSorting } = this.props;
        setHierarchyIsSorting(!isSorting);
        updateSitesFilters('name', '');
        updateSitesFilters('status', '');
    };
}

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { defaultSitesSort },
        },
        hierarchyReducer: { isSorting },
    },
    shared: {
        sitesFilterReducer: { filters },
        mobileReducer: { onMobile },
    },
}) => ({
    filters,
    onMobile,
    defaultSitesSort,
    isSorting,
});

const mapDispatchToProps = {
    updateSitesFilters,
    postSitesSort,
    setHierarchyIsSorting,
};

export default connect(mapStateToProps, mapDispatchToProps)(SitesFiltersContainer);
