import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADD_FLOOR } from 'constants/shared/modalTypes';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FloorTableContainer from 'components/companyAdmin/floors/shared/containers/FloorTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

class BuildingsFloorsTableContainer extends Component {
    render() {
        const { building } = this.props;
        return (
            <BlockContainer>
                <BlockHeading title="Floors" classes="w-table">
                    <button
                        className="button green"
                        onClick={this.handleAddFloorModal}
                    >
                        <i className="fa fa-plus" /> Add floor
                    </button>
                </BlockHeading>
                <FloorTableContainer ids={building.floorIDs || []} />
            </BlockContainer>
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, updatedFloorID, history } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            return history.push(`/company/floors/${updatedFloorID}`);
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
            buildingsReducer,
            floorsReducer: { postSuccess, updatedFloorID }
        }
    },
    { match }
) => ({
    postSuccess,
    updatedFloorID,
    building: buildingsReducer.buildings[match.params.id] || {},
    isFetching: buildingsReducer.isFetching,
    buildingID: match.params.id
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
    )(BuildingsFloorsTableContainer)
);
