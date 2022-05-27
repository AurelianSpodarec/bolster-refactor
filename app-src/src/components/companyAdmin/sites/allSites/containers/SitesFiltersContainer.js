import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSitesFilters from 'actions/companyAdmin/sites/sync/updateSitesFilters';
import postSitesSort from 'actions/companyAdmin/sites/async/postSitesSort';
import setHierarchyIsSorting from 'actions/companyAdmin/hierarchy/sync/setHierarchyIsSorting';
import { companyAdminSitesSort } from 'constants/shared/sortAndFilterOptions';

import SitesFilters from '../presentational/SitesFilters';
import { DEFAULT_SITES_SORT_NAMES, DEFAULT_SITES_SORT } from 'constants/companyAdmin/enums';
import { enumFormat } from 'helpers/generic';

class SitesFiltersContainer extends Component {
    render() {
        const { isSorting } = this.props;
        const { name, status, sortBy } = this.props.filters;
        const { statusOptions } = companyAdminSitesSort;

        return (
            <SitesFilters
                name={name}
                statusOptions={Object.values(statusOptions)}
                selectedStatus={status}
                sortOptions={enumFormat(DEFAULT_SITES_SORT_NAMES)}
                selectedSort={sortBy}
                handleChange={this.handleChange}
                onMobile={this.props.onMobile}
                isSorting={isSorting}
                toggleIsSortingSites={this.toggleIsSortingSites}
            />
        );
    }

    componentDidMount = () => {
        const { updateSitesFilters, defaultSitesSort } = this.props;

        updateSitesFilters('name', '');
        updateSitesFilters('status', 'active');
        updateSitesFilters('sortBy', defaultSitesSort || 1);
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
        updateSitesFilters('sortBy', DEFAULT_SITES_SORT.CUSTOM);
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
