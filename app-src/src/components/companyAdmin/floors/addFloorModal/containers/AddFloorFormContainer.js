import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createFloor from 'actions/companyAdmin/floors/async/createFloor';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddFloorForm from '../presentational/AddFloorForm';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';

class AddFloorFormContainer extends Component {
    state = {
        name: ''
    };
    render() {
        // ! uncomment below and change props when api is done
        // const { isUsingBolsterLabels } = this.props;
        return (
            <AddFloorForm
                {...this.state}
                buildingID={this.props.buildingID}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                handleClose={this.handleClose}
                isUsingBolsterLabels={true}
            />
        );
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { createFloor, buildingID, hideModal } = this.props;

        createFloor({
            ...this.state,
            buildingID
        });
        hideModal();
    };

    handleClose = () => {
        const { hideModal, updateHierarchyAddState } = this.props;

        hideModal();
        updateHierarchyAddState(false);
    };
}

const mapStateToProps = ({ companyAdmin: { companySettingsReducer } }) => ({
    // !alter when it's been determined that company is using bolster labels
    // isUsingBolsterLabels: companySettingsReducer.isUsingBolsterLabels
});

const mapDispatchToProps = dispatch => ({
    createFloor: postBody => {
        dispatch(createFloor(postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    },
    updateHierarchyAddState: value => {
        dispatch(updateHierarchyAddState(value));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddFloorFormContainer)
);
