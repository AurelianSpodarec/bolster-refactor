import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ERROR_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import updateFloorPlan from 'actions/companyAdmin/drawings/async/updateFloorPlan';
import EditFloorPlanModal from '../presentational/EditFloorPlanModal';

class EditFloorPlanModalContainer extends Component {
    state = {
        file: ''
    };

    render() {
        const { drawing } = this.props;
        return (
            <EditFloorPlanModal
                {...this.state}
                drawing={drawing}
                handleChange={this.handleChange}
                hideModal={this.hideModal}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, error, hideModal } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            return hideModal();
        }

        if (!prevProps.error && error) {
            return this.showErrorModal();
        }
    };

    handleChange = (name, val) => {
        const { [name]: curVal } = this.state;
        this.setState({ [name]: val === curVal ? '' : val });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { file } = this.state;
        const { updateFloorPlan, drawing } = this.props;

        updateFloorPlan(drawing.id, { file });
    };

    hideModal = e => {
        e.preventDefault();

        const { hideModal } = this.props;
        hideModal();
    };

    showErrorModal = () => {
        const { showModal } = this.props;
        showModal(ERROR_MODAL);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { error, postSuccess }
    }
}) => ({ error, postSuccess });

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    },
    updateFloorPlan: (drawingID, postBody) => {
        dispatch(updateFloorPlan(drawingID, postBody));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFloorPlanModalContainer);
