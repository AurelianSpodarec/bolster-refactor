import React, { Component } from 'react';
import { connect } from 'react-redux';

import MoveToolConfirmMoveModal from '../presentational/MoveToolConfirmMoveModal';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import moveBuilding from 'actions/superAdmin/moveTool/async/moveBuilding';
import moveFloor from 'actions/superAdmin/moveTool/async/moveFloor';
import moveDrawing from 'actions/superAdmin/moveTool/async/moveDrawing';

class MoveToolConfirmMoveModalContainer extends Component {
    render() {
        const { moveToName } = this.props;

        return (
            <MoveToolConfirmMoveModal
                moveFromName={this._getMoveFromName()}
                moveToName={moveToName}
                hideModal={this.hideModal}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    _getMoveFromName = () => {
        const {
            selectedHierarchy,
            selectedOption,
            buildings,
            floors,
            drawings
        } = this.props;

        let name = '';

        switch (selectedHierarchy + '') {
            case HIERARCHY_IDS.BUILDING:
                var selectedBuilding = buildings[selectedOption];

                name = `${selectedBuilding.siteName} / ${
                    selectedBuilding.name
                }`;
                break;
            case HIERARCHY_IDS.FLOOR:
                var selectedFloor = floors[selectedOption];

                name = `${selectedFloor.siteName} / ${
                    selectedFloor.buildingName
                } / ${selectedFloor.name}`;
                break;
            case HIERARCHY_IDS.DRAWING:
                var selectedDrawing = drawings[selectedOption];

                name = `${selectedDrawing.siteName} / ${
                    selectedDrawing.buildingName
                } / ${selectedDrawing.floorName} / ${selectedDrawing.name}`;
                break;
            default:
                name = '';
        }

        return name;
    };

    hideModal = () => {
        this.props.hideModal();
    };

    handleSubmit = () => {
        const {
            selectedHierarchy,
            selectedOption,
            moveToValue,
            moveBuilding,
            moveFloor,
            moveDrawing,
            hideModal
        } = this.props;

        hideModal();

        switch (selectedHierarchy + '') {
            case HIERARCHY_IDS.BUILDING:
                moveBuilding(selectedOption, moveToValue, null);
                break;
            case HIERARCHY_IDS.FLOOR:
                moveFloor(selectedOption, moveToValue, null);
                break;
            case HIERARCHY_IDS.DRAWING:
                moveDrawing(selectedOption, moveToValue, null);
                break;
        }
    };
}

const mapStateToProps = ({
    superAdmin: {
        sitesReducer: { sites },
        buildingsReducer: { buildings },
        floorsReducer: { floors },
        drawingsReducer: { drawings },
        moveToolReducer: {
            selectedHierarchy,
            selectedOption,
            isPosting,
            postSuccess,
            error: postError
        }
    }
}) => ({
    sites,
    buildings,
    floors,
    drawings,
    selectedHierarchy,
    selectedOption,
    isPosting,
    postSuccess,
    postError
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    moveBuilding: (buildingID, siteID, postBody) => {
        dispatch(moveBuilding(buildingID, siteID, postBody));
    },
    moveFloor: (floorID, buildingID, postBody) => {
        dispatch(moveFloor(floorID, buildingID, postBody));
    },
    moveDrawing: (drawingID, floorID, postBody) => {
        dispatch(moveDrawing(drawingID, floorID, postBody));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoveToolConfirmMoveModalContainer);
