import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ADD_FLOORS, ERROR_MODAL } from 'constants/shared/modalTypes';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorTableContainer from 'components/companyAdmin/floors/shared/containers/FloorTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import fetchSingleBuilding from 'actions/companyAdmin/buildings/async/fetchSingleBuilding';
import fetchAllFloors from 'actions/companyAdmin/floors/async/fetchAllFloors';

class BuildingsFloorsTableContainer extends Component {
    render() {
        const { building } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Floors" classes="w-table">
                    {building.accessType === ACCESS_TYPES_VALUES.OWNER && (
                        <button
                            className="button green"
                            onClick={this.handleAddFloorsModal}
                        >
                            <i className="fa fa-plus" /> Add floors
                        </button>
                    )}
                </BlockHeading>
                <FloorTableContainer ids={building.floorIDs || []} />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { showModal, buildingID, isAdding } = this.props;
        if (isAdding) showModal(ADD_FLOORS, { buildingID });
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            error,
            showModal,
            hideModal,
            updatedFloorID,
            history,
            updateHierarchyAddState,
            buildingID,
            fetchAllFloors,
            fetchSingleBuilding
        } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            if (updatedFloorID) {
                history.push(`/company/floors/${updatedFloorID}`);
            } else {
                fetchAllFloors();
                fetchSingleBuilding(buildingID);
            }
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
    handleAddFloorsModal = () => {
        const { showModal, buildingID } = this.props;
        showModal(ADD_FLOORS, { buildingID });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: { buildings, isFetching },
            floorsReducer: { postSuccess, updatedFloorID, error, floors },
            hierarchyReducer: { isAdding }
        }
    },
    { match: { params } }
) => ({
    error,
    postSuccess,
    updatedFloorID,
    building: buildings[params.id] || {},
    isFetching: isFetching,
    buildingID: params.id,
    floors,
    isAdding
});

const mapDispatchToProps = {
    showModal,
    hideModal,
    updateHierarchyAddState,
    fetchAllFloors,
    fetchSingleBuilding
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BuildingsFloorsTableContainer)
);
