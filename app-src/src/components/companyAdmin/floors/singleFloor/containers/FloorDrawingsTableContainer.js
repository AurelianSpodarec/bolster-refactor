import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import { ADD_DRAWING, ERROR_MODAL } from 'constants/shared/modalTypes';

import DrawingTableContainer from 'components/companyAdmin/drawings/shared/containers/DrawingTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

class FloorDrawingsTableContainer extends Component {
    render() {
        const { floor } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Drawings" classes="w-table">
                    {floor.accessType === ACCESS_TYPES_VALUES.OWNER && (
                        <button
                            className="button green"
                            onClick={this.handleAddDrawingModal}
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
        const { showModal, floorID, isAdding } = this.props;

        if (isAdding) showModal(ADD_DRAWING, { floorID });
    };

    componentDidUpdate = prevProps => {
        const {
            postSuccess,
            error,
            showModal,
            hideModal,
            updatedID,
            history,
            updateHierarchyAddState
        } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            history.push(`/company/drawings/${updatedID}`);
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

    handleAddDrawingModal = () => {
        const { showModal, floorID } = this.props;
        showModal(ADD_DRAWING, { floorID });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer,
            drawingsReducer: { postSuccess, updatedID, error },
            hierarchyReducer: { isAdding }
        }
    },
    { match }
) => ({
    error,
    postSuccess,
    updatedID,
    floor: floorsReducer.floors[match.params.id] || {},
    isFetching: floorsReducer.isFetching,
    floorID: match.params.id,
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
    )(FloorDrawingsTableContainer)
);
