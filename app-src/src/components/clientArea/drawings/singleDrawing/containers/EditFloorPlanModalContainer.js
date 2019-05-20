import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import updateFloorPlan from 'actions/companyAdmin/drawings/async/updateFloorPlan';
import EditFloorPlanModal from '../presentational/EditFloorPlanModal';

class EditFloorPlanModalContainer extends Component {
    state = {
        file: ''
    };

    render() {
        const { drawing, filesUploading, hideModal } = this.props;
        return (
            <EditFloorPlanModal
                {...this.state}
                drawing={drawing}
                handleChange={this.handleChange}
                hideModal={hideModal}
                handleSubmit={this.handleSubmit}
                filesUploading={filesUploading}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, error, showModal } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            showModal(SUCCESS_MODAL, {
                message:
                    'New floor plan successfully uploaded. It may take a few minutes before the updated floor plan is available to view, please check back later'
            });
        } else if (!prevProps.error && error) showModal(ERROR_MODAL);
    };

    handleChange = (name, val) => {
        const { [name]: curVal } = this.state;
        this.setState({ [name]: val === curVal ? '' : val });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { file } = this.state;
        const { updateFloorPlan, drawing, filesUploading } = this.props;
        if (!filesUploading) updateFloorPlan(drawing.id, { file });
    };

    showErrorModal = () => this.props.showModal(ERROR_MODAL);
}

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { error, postSuccess }
    },
    shared: {
        filesUploadingReducer: { filesUploading }
    }
}) => ({ error, postSuccess, filesUploading });

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    updateFloorPlan: (id, body) => dispatch(updateFloorPlan(id, body))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFloorPlanModalContainer);
