import React, { Component } from 'react';
import { connect } from 'react-redux';

import SiteManagementConfirmMoveModal from '../presentational/SiteManagementConfirmMoveModal';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import moveBuilding from 'actions/superAdmin/siteManagement/async/moveBuilding';
import moveFloor from 'actions/superAdmin/siteManagement/async/moveFloor';
import moveDrawing from 'actions/superAdmin/siteManagement/async/moveDrawing';

class SiteManagementConfirmMoveModalContainer extends Component {
    render() {
        const { moveToName } = this.props;

        return (
            <SiteManagementConfirmMoveModal
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
                name = buildings[selectedOption].name;
                break;
            case HIERARCHY_IDS.FLOOR:
                name = floors[selectedOption].name;
                break;
            case HIERARCHY_IDS.DRAWING:
                name = drawings[selectedOption].name;
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
            moveDrawing
        } = this.props;

        // switch (selectedHierarchy + '') {
        //     case HIERARCHY_IDS.BUILDING:
        //         moveBuilding(selectedOption, moveToValue, null);
        //         break;
        //     case HIERARCHY_IDS.FLOOR:
        //         moveFloor(selectedOption, moveToValue, null);
        //         break;
        //     case HIERARCHY_IDS.DRAWING:
        //         moveDrawing(selectedOption, moveToValue, null);
        //         break;
        // }
    };
}

const mapStateToProps = ({
    superAdmin: {
        sitesReducer: { sites },
        buildingsReducer: { buildings },
        floorsReducer: { floors },
        drawingsReducer: { drawings },
        siteManagementReducer: { selectedHierarchy, selectedOption }
    }
}) => ({
    sites,
    buildings,
    floors,
    drawings,
    selectedHierarchy,
    selectedOption
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
)(SiteManagementConfirmMoveModalContainer);
