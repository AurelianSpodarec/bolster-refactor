import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import { ADD_BUILDING, ERROR_MODAL } from 'constants/shared/modalTypes';

import BuildingsTableContainer from 'components/companyAdmin/buildings/shared/containers/BuildingsTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

class SiteBuildingsTableContainer extends Component {
    render() {
        const { site } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Buildings" classes="w-table">
                    {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                        <button
                            className="button green"
                            onClick={this.handleAddBuildingModal}
                        >
                            <i className="fa fa-plus" /> Add building
                        </button>
                    )}
                </BlockHeading>
                <BuildingsTableContainer ids={site.buildingIDs || []} />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { showModal, siteID, isAdding } = this.props;

        if (isAdding) showModal(ADD_BUILDING, { siteID });
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            showModal,
            error,
            hideModal,
            updatedBuildingID,
            history,
            updateHierarchyAddState
        } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push(`/company/buildings/${updatedBuildingID}`);
            updateHierarchyAddState(true);
        }

        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    '##There was an error processing your request, please try again later.##'
            });
            updateHierarchyAddState(false);
        }
    };

    handleAddBuildingModal = () => {
        const { showModal, siteID } = this.props;
        showModal(ADD_BUILDING, { siteID });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer,
            buildingsReducer: { postSuccess, updatedBuildingID, error },
            hierarchyReducer: { isAdding }
        }
    },
    { match }
) => ({
    error,
    postSuccess,
    updatedBuildingID,
    site: sitesReducer.sites[match.params.id] || {},
    isFetching: sitesReducer.isFetching,
    siteID: match.params.id,
    isAdding
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => {
        dispatch(showModal(type, props));
    },
    hideModal: () => {
        dispatch(hideModal());
    },
    updateHierarchyAddState: value => {
        dispatch(updateHierarchyAddState(value));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SiteBuildingsTableContainer)
);
