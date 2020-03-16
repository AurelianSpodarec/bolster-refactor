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

class FloorDrawingsTableContainer extends Component {
    state = { shouldRestrictPayments: false };
    render() {
        const { floor } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Drawings" classes="w-table">
                    {floor.accessType === ACCESS_TYPES_VALUES.OWNER &&
                        !this.state.shouldRestrictPayments && (
                            <button
                                className="button green"
                                onClick={this.handleAddDrawingsModal}
                            >
                                <i className="fa fa-plus" /> Add Drawing
                            </button>
                        )}
                </BlockHeading>
                <DrawingTableContainer ids={floor.drawingIDs || []} />
            </BlockContainer>
        );
    }

    componentDidMount = () => {
        const {
            showModal,
            floorID,
            isAdding,
            users,
            companyUserID
        } = this.props;

        if (isAdding) showModal(ADD_DRAWINGS, { floorID });
        if (users && users[companyUserID]) {
            this.setState({
                shouldRestrictPayments:
                    users[companyUserID].shouldRestrictPayments
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
            companyUserID
        } = this.props;
        if (users && users[companyUserID] && !prevProps.users[companyUserID]) {
            this.setState({
                shouldRestrictPayments:
                    users[companyUserID].shouldRestrictPayments
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
                    '##There was an error processing your request, please try again later.##'
            });
            updateHierarchyAddState(false);
        }
    };
    handleAddDrawingsModal = () => {
        const { showModal, floorID } = this.props;
        showModal(ADD_DRAWINGS, { floorID });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer: { isFetching, floors },
            drawingsReducer: { postSuccess, updatedID, error },
            hierarchyReducer: { isAdding },
            companyUsersReducer: { users }
        },
        shared: {
            decodeJWTReducer: {
                jwtData: { companyUserID }
            }
        }
    },
    { match: { params } }
) => ({
    error,
    postSuccess,
    updatedID,
    isFetching,
    isAdding,
    floor: floors[params.id] || {},
    floorID: params.id,
    users,
    companyUserID
});

const mapDispatchToProps = {
    showModal,
    hideModal,
    updateHierarchyAddState,
    fetchSingleFloor,
    fetchAllDrawings
};
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FloorDrawingsTableContainer)
);
