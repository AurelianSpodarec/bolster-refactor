import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import { ADD_FLOOR, ERROR_MODAL } from 'constants/shared/modalTypes';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorTableContainer from 'components/companyAdmin/floors/shared/containers/FloorTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

class BuildingsFloorsTableContainer extends Component {
    render() {
        const { building } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Floors" classes="w-table">
                    {building.accessType === ACCESS_TYPES_VALUES.OWNER && (
                        <button
                            className="button green"
                            onClick={this.handleAddFloorModal}
                        >
                            <i className="fa fa-plus" /> Add floor
                        </button>
                    )}
                </BlockHeading>
                <FloorTableContainer ids={building.floorIDs || []} />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { showModal, buildingID, isAdding } = this.props;

        if (isAdding) showModal(ADD_FLOOR, { buildingID });
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            error,
            showModal,
            hideModal,
            updatedFloorID,
            history,
            updateHierarchyAddState
        } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            history.push(`/company/floors/${updatedFloorID}`);
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

    handleAddFloorModal = () => {
        const { showModal, buildingID } = this.props;
        showModal(ADD_FLOOR, { buildingID });
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

const mapDispatchToProps = { showModal, hideModal, updateHierarchyAddState };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BuildingsFloorsTableContainer)
);
