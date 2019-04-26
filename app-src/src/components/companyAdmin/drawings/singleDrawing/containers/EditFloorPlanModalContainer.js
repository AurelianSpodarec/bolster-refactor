import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import EditFloorPlanModal from '../presentational/EditFloorPlanModal';

class EditFloorPlanModalContainer extends Component {
    state = {
        floorPlan: ''
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

    handleChange = (name, val) => {
        const { [name]: curVal } = this.state;
        this.setState({ [name]: val === curVal ? '' : val });
    };

    hideModal = e => {
        e.preventDefault();

        const { hideModal } = this.props;
        hideModal();
    };

    handleSubmit = e => {
        e.preventDefault();

        console.log('submitting...');
    };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditFloorPlanModalContainer);
