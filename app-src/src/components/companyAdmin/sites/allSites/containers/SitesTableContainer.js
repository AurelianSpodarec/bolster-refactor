import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADD_SITE } from 'constants/shared/modalTypes';

import SitesTable from '../presentational/SitesTable';

class SitesTableContainer extends Component {
    render() {
        const { isFetching, error } = this.props;
        return (
            <SitesTable
                headers={['Site name', 'Owned by', 'Permissions', 'Action']}
                sites={this._getFilteredSites()}
                isFetching={isFetching}
                error={error}
                handleAddSite={this.handleAddSite}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { history, postSuccess, updatedSiteID } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/sites/${updatedSiteID}`);
        }
    };

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

    handleAddSite = () => {
        this.props.showModal(ADD_SITE);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        sitesReducer: {
            sites,
            isFetching,
            error,
            filters,
            postSuccess,
            updatedSiteID
        }
    }
}) => ({
    sites: Object.values(sites),
    isFetching,
    error,
    filters,
    postSuccess,
    updatedSiteID
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SitesTableContainer)
);
