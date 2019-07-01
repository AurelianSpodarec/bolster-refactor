import React, { Component } from 'react';
import { connect } from 'react-redux';

import SiteManagementConfirmMoveModal from '../presentational/SiteManagementConfirmMoveModal';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

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
        console.log('Submitted...');
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SiteManagementConfirmMoveModalContainer);
