import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ADD_BUILDINGS, ERROR_MODAL } from 'constants/shared/modalTypes';

import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import fetchAllBuildings from 'actions/companyAdmin/buildings/async/fetchAllBuildings';
import fetchSingleSite from 'actions/companyAdmin/sites/async/fetchSingleSite';

class SiteBuildingsTableContainer extends Component {
    render() {
        const { site } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Buildings" classes="w-table">
                    {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                        <button
                            className="button green"
                            onClick={this.handleAddBuildingsModal}
                        >
                            <i className="fa fa-plus" /> Add buildings
                        </button>
                    )}
                </BlockHeading>
                <BuildingsTableContainer ids={site.buildingIDs || []} />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { showModal, siteID, isAdding } = this.props;
        if (isAdding) showModal(ADD_BUILDINGS, { siteID });
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            showModal,
            error,
            hideModal,
            updatedBuildingID,
            history,
            updateHierarchyAddState,
            fetchAllBuildings,
            fetchSingleSite,
            siteID
        } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            if (updatedBuildingID) {
                history.push(`/company/buildings/${updatedBuildingID}`);
            } else {
                // get new buildings
                fetchAllBuildings();
                // update site's buildingIDs array
                fetchSingleSite(siteID);
            }
        }

        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    'There was an error processing your request, please try again later.'
            });
            updateHierarchyAddState(false);
        }
    };
    handleAddBuildingsModal = () => {
        const { showModal, siteID } = this.props;
        showModal(ADD_BUILDINGS, { siteID });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: { isFetching, sites },
            buildingsReducer: { postSuccess, updatedBuildingID, error },
            hierarchyReducer: { isAdding }
        }
    },
    { match }
) => ({
    error,
    postSuccess,
    updatedBuildingID,
    site: sites[match.params.id] || {},
    isFetching,
    siteID: match.params.id,
    isAdding
});

const mapDispatchToProps = {
    showModal,
    hideModal,
    updateHierarchyAddState,
    fetchAllBuildings,
    fetchSingleSite
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SiteBuildingsTableContainer)
);
