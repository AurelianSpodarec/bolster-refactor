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
import setHierarchyIsSorting from 'actions/companyAdmin/hierarchy/sync/setHierarchyIsSorting';
import BuildingFiltersContainer from './BuildingsFiltersContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
class SiteBuildingsTableContainer extends Component {
    render() {
        const { site, isSorting } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Buildings" classes="w-table">
                    {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                        <ActionButton
                            ambient="positive"
                            onClick={this.handleAddBuildingsModal}
                            icon="plus"
                            text="Add buildings"
                            size="medium"
                        />
                    )}
                    {isSorting ? (
                        <ActionButton
                            onClick={this._toggleIsSorting}
                            icon="check"
                            text="Finish Sort"
                            source="secondary"
                            ambient="positive"
                            size="medium"
                        />
                    ) : (
                        <ActionButton
                            onClick={this._toggleIsSorting}
                            icon="far fa-sort"
                            text="Sort Mode"
                            source="secondary"
                            ambient="positive"
                            size="medium"
                        />
                    )}
                    <BuildingFiltersContainer />
                </BlockHeading>
                <BuildingsTableContainer ids={site.buildingIDs || []} />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { showModal, siteID, isAdding, setHierarchyIsSorting } = this.props;
        if (isAdding) showModal(ADD_BUILDINGS, { siteID });
        setHierarchyIsSorting(false);
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
            siteID,
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
                    'There was an error processing your request, please try again later.',
            });
            updateHierarchyAddState(false);
        }
    };
    handleAddBuildingsModal = () => {
        const { showModal, siteID } = this.props;
        showModal(ADD_BUILDINGS, { siteID });
    };

    _toggleIsSorting = () => {
        const { setHierarchyIsSorting, isSorting } = this.props;
        setHierarchyIsSorting(!isSorting);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: { isFetching, sites },
            buildingsReducer: { postSuccess, updatedBuildingID, error },
            hierarchyReducer: { isAdding, isSorting },
        },
    },
    { match },
) => ({
    error,
    postSuccess,
    updatedBuildingID,
    site: sites[match.params.id] || {},
    isFetching,
    siteID: match.params.id,
    isAdding,
    isSorting,
});

const mapDispatchToProps = {
    showModal,
    hideModal,
    updateHierarchyAddState,
    fetchAllBuildings,
    fetchSingleSite,
    setHierarchyIsSorting,
};
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SiteBuildingsTableContainer),
);
