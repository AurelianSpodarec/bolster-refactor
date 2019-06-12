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
        file: '',
        templateUsageRuleOptions: {
            '1': { text: 'Use Only Owner Company', value: 1 },
            '2': { text: 'Use Only Own', value: 2 },
            '3': { text: 'Use Any', value: 3 }
        },
        templateUsageRule: ''
    };

    render() {
        const {
            name,
            file,
            templateUsageRuleOptions,
            templateUsageRule
        } = this.state;
        const { floorID, filesUploading, credits } = this.props;
        return (
            <AddDrawingForm
                name={name}
                file={file}
                templateUsageRules={Object.values(templateUsageRuleOptions)}
                selectedRule={templateUsageRuleOptions[templateUsageRule]}
                floorID={floorID}
                handleInputChange={this.handleInputChange}
                handleFileChange={this.handleFileChange}
                handleSubmit={this.handleSubmit}
                filesUploading={filesUploading}
                credits={credits}
                handleBuyCreditsModal={this.handleBuyCreditsModal}
                handleClose={this.handleClose}
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

    handleFileChange = (name, s3Key) => {
        const { [name]: file } = this.state;
        this.setState({ [name]: file === s3Key ? '' : s3Key });
    };

    handleSubmit = () => {
        const {
            createDrawing,
            floorID,
            filesUploading,
            hideModal
        } = this.props;
        // eslint-disable-next-line no-unused-vars
        const { templateUsageRuleOptions, ...restState } = this.state;
        if (!filesUploading) {
            createDrawing({ ...restState, floorID });
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
        creditsReducer: { credits }
    },

    shared: {
        filesUploadingReducer: { filesUploading }
    }
}) => ({
    filesUploading,
    credits: Object.values(credits).reduce(
        (acc, curr) => acc + curr.quantity,
        0
    )
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
