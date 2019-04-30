import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADD_DRAWING } from 'constants/shared/modalTypes';

import DrawingTableContainer from 'components/companyAdmin/drawings/shared/containers/DrawingTableContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class FloorDrawingsTableContainer extends Component {
    render() {
        const { floor } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Drawings" classes="w-table">
                    <button
                        className="button green"
                        onClick={this.handleAddDrawingModal}
                    >
                        <i className="fa fa-plus" /> Add Drawing
                    </button>
                </BlockHeading>
                <DrawingTableContainer ids={floor.drawingIDs || []} />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, updatedID, history } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            return history.push(`/company/drawings/${updatedID}`);
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
            drawingsReducer: { postSuccess, updatedID }
        }
    },
    { match }
) => ({
    postSuccess,
    updatedID,
    floor: floorsReducer.floors[match.params.id] || {},
    isFetching: floorsReducer.isFetching,
    floorID: match.params.id
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
    )(FloorDrawingsTableContainer)
);
