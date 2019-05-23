import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import {
    ADD_FLOOR,
    SUCCESS_MODAL,
    ERROR_MODAL
} from 'constants/shared/modalTypes';

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
        const {
            postSuccess,
            error,
            showModal,
            hideModal,
            updatedFloorID,
            floors
        } = this.props;

        if (
            !prevProps.postSuccess &&
            postSuccess &&
            floors.length > prevProps.floors.length
        ) {
            showModal(SUCCESS_MODAL, {
                hideModal,
                message: 'Floor added successfully.',
                link: `/company/floors/${updatedFloorID}`,
                linkMessage: 'View'
            });
        }

        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, {
                hideModal,
                title: 'Error',
                message:
                    error.message ||
                    '##There was an error processing your request, please try again later.##'
            });
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
            floorsReducer: { postSuccess, updatedFloorID, error, floors }
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
    floors
});

const mapDispatchToProps = { showModal, hideModal };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BuildingsFloorsTableContainer)
);
