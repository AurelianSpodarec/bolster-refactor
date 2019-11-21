import React, { Component } from 'react';
import { connect } from 'react-redux';

import createDrawing from 'actions/companyAdmin/drawings/async/createDrawing';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddDrawingForm from '../presentational/AddDrawingForm';
import { BUY_CREDITS } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';

class AddDrawingFormContainer extends Component {
    state = {
        name: '',
        file: ''
    };

    render() {
        const {
            name,
            file
            // ! uncomment below and change props when api is done
            // isUsingBolsterLabels
        } = this.state;
        const { floorID, filesUploading, credits } = this.props;
        return (
            <AddDrawingForm
                name={name}
                file={file}
                floorID={floorID}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                filesUploading={filesUploading}
                credits={credits}
                handleBuyCreditsModal={this.handleBuyCreditsModal}
                handleClose={this.handleClose}
                isUsingBolsterLabels={true}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { updatedID, history } = this.props;
        if (!prevProps.updatedID && updatedID) {
            history.push(`/company/drawings/${updatedID}`);
        }
    };

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { createDrawing, floorID, filesUploading, hideModal } = this.props;
        // eslint-disable-next-line no-unused-vars

        if (!filesUploading) {
            createDrawing({ ...this.State, floorID });
            hideModal();
        }
    };

    handleClose = () => {
        const { hideModal, updateHierarchyAddState } = this.props;

        hideModal();
        updateHierarchyAddState(false);
    };

    handleBuyCreditsModal = () => {
        const { showModal } = this.props;
        showModal(BUY_CREDITS, { creditsToBuy: 1 });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { credits },
        companySettingsReducer
    },

    shared: {
        filesUploadingReducer: { filesUploading }
    }
}) => ({
    filesUploading,
    credits: Object.values(credits).reduce((acc, curr) => acc + curr.quantity, 0)
    // !alter when it's been determined that company is using bolster labels
    // isUsingBolsterLabels: companySettingsReducer.isUsingBolsterLabels
});

const mapDispatchToProps = dispatch => ({
    createDrawing: drawing => dispatch(createDrawing(drawing)),
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    updateHierarchyAddState: value => {
        dispatch(updateHierarchyAddState(value));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDrawingFormContainer);
