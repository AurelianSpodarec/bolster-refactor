import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import { ADD_DRAWINGS, ERROR_MODAL } from 'constants/shared/modalTypes';

import DrawingTableContainer from 'components/companyAdmin/drawings/shared/containers/DrawingTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import fetchSingleFloor from 'actions/companyAdmin/floors/async/fetchSingleFloor';
import fetchAllDrawings from 'actions/companyAdmin/drawings/async/fetchAllDrawings';
import setHierarchyIsSorting from 'actions/companyAdmin/hierarchy/sync/setHierarchyIsSorting';
import DrawingFiltersContainer from '../../../../companyAdmin/drawings/singleDrawing/containers/DrawingFiltersContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

class FloorDrawingsTableContainer extends Component {
    state = { shouldRestrictPayments: false };
    render() {
        const { floor, isSorting } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Drawings" classes="w-table">
                    {floor.accessType === ACCESS_TYPES_VALUES.OWNER &&
                        !this.state.shouldRestrictPayments && (
                            <ActionButton
                                ambient="positive"
                                onClick={this.handleAddDrawingsModal}
                                icon="plus"
                                text="Add Drawing"
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
                    <DrawingFiltersContainer />
                </BlockHeading>
                <DrawingTableContainer ids={floor.drawingIDs || []} />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const { showModal, floorID, isAdding, users, companyUserID, setHierarchyIsSorting } =
            this.props;

        setHierarchyIsSorting(false);

        if (isAdding) showModal(ADD_DRAWINGS, { floorID });
        if (users && users[companyUserID]) {
            this.setState({
                shouldRestrictPayments: users[companyUserID].shouldRestrictPayments,
            });
        }
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            error,
            showModal,
            hideModal,
            updatedID,
            history,
            updateHierarchyAddState,
            fetchAllDrawings,
            fetchSingleFloor,
            floorID,
            users,
            companyUserID,
        } = this.props;
        if (users && users[companyUserID] && !prevProps.users[companyUserID]) {
            this.setState({
                shouldRestrictPayments: users[companyUserID].shouldRestrictPayments,
            });
        }
        if (!prevProps.postSuccess && postSuccess) {
            if (updatedID) {
                history.push(`/company/drawings/${updatedID}`);
            } else {
                fetchAllDrawings();
                fetchSingleFloor(floorID);
            }
        }

        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    '##There was an error processing your request, please try again later.##',
            });
            updateHierarchyAddState(false);
        }
    };

    handleAddDrawingsModal = () => {
        const { showModal, floorID } = this.props;
        showModal(ADD_DRAWINGS, { floorID });
    };

    _toggleIsSorting = () => {
        const { setHierarchyIsSorting, isSorting } = this.props;
        setHierarchyIsSorting(!isSorting);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer: { isFetching, floors },
            drawingsReducer: { postSuccess, updatedID, error },
            hierarchyReducer: { isAdding, isSorting },
            companyUsersReducer: { users },
        },
        shared: {
            decodeJWTReducer: {
                jwtData: { companyUserID },
            },
        },
    },
    { match: { params } },
) => ({
    error,
    postSuccess,
    updatedID,
    isFetching,
    isAdding,
    floor: floors[params.id] || {},
    floorID: params.id,
    users,
    companyUserID,
    isSorting,
});

const mapDispatchToProps = {
    showModal,
    hideModal,
    updateHierarchyAddState,
    fetchSingleFloor,
    fetchAllDrawings,
    setHierarchyIsSorting,
};
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FloorDrawingsTableContainer),
);
