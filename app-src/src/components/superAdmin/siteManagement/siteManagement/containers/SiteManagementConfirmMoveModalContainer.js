import React, { Component } from 'react';
import { connect } from 'react-redux';

import SiteManagementConfirmMoveModal from '../presentational/SiteManagementConfirmMoveModal';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import moveBuilding from 'actions/superAdmin/siteManagement/async/moveBuilding';
import moveFloor from 'actions/superAdmin/siteManagement/async/moveFloor';
import moveDrawing from 'actions/superAdmin/siteManagement/async/moveDrawing';
import fetchSitesForCompany from 'actions/superAdmin/siteManagement/async/fetchSitesForCompany';
import fetchBuildingsForCompany from 'actions/superAdmin/siteManagement/async/fetchBuildingsForCompany';
import fetchFloorsForCompany from 'actions/superAdmin/siteManagement/async/fetchFloorsForCompany';
import fetchDrawingsForCompany from 'actions/superAdmin/siteManagement/async/fetchDrawingsForCompany';

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

    componentDidUpdate = prevProps => {
        const {
            fetchHierarchiesForCompany,
            isPosting,
            postSuccess,
            postError,
            showModal,
            hideModal,
            moveFromCompany,
            moveToCompany
        } = this.props;

        if (prevProps.isPosting && !isPosting && postSuccess) {
            hideModal();
            showModal(SUCCESS_MODAL, {
                message: 'The move was successful!'
            });
            fetchHierarchiesForCompany(moveFromCompany);
            fetchHierarchiesForCompany(moveToCompany);
        }

        if (prevProps.isPosting && !isPosting && postError) {
            hideModal();
            showModal(ERROR_MODAL, {
                title: 'Error',
                message: postError
            });
        }
    };

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
            moveDrawing
        } = this.props;

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
        siteManagementReducer: {
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
    showModal: (type, props) => dispatch(showModal(type, props)),
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
    },
    fetchHierarchiesForCompany: companyID => {
        dispatch(fetchSitesForCompany(companyID));
        dispatch(fetchBuildingsForCompany(companyID));
        dispatch(fetchFloorsForCompany(companyID));
        dispatch(fetchDrawingsForCompany(companyID));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteManagementConfirmMoveModalContainer);
