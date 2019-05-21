import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDrawing from 'actions/companyAdmin/drawings/async/createDrawing';
import AddDrawingForm from '../presentational/AddDrawingForm';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { BUY_CREDITS } from 'constants/shared/modalTypes';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';

class AddDrawingFormContainer extends Component {
    state = {
        name: '',
        file: '',
        templateUsageRule: ''
    };

    render = () => {
        const { name, file, templateUsageRule } = this.state;
        const { floorID, filesUploading, credits } = this.props;
        const templateUsageRuleOptions = {
            '1': { text: 'Use Only Owner Company', value: 1 },
            '2': { text: 'Use Only Own', value: 2 },
            '3': { text: 'Use Any', value: 3 }
        };
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
            />
        );
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, fetchCredits } = this.props;
        if (postSuccess && !prevProps.postSuccess) fetchCredits();
    };

    handleInputChange = (name, value) => this.setState({ [name]: value });

    handleFileChange = (name, s3Key) => {
        const { [name]: file } = this.state;
        this.setState({ [name]: file === s3Key ? '' : s3Key });
    };

    handleSubmit = () => {
        const { createDrawing, floorID, filesUploading } = this.props;
        if (!filesUploading) createDrawing({ ...this.state, floorID });
    };

    handleBuyCreditsModal = () => {
        this.props.showModal(BUY_CREDITS, { creditsToBuy: 1 });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            drawingsReducer: { updatedID, postSuccess },
            creditsReducer: { credits }
        },

        shared: {
            filesUploadingReducer: { filesUploading }
        }
    },
    { match }
) => ({
    filesUploading,
    floorID: match.params.id,
    updatedID,
    credits: Object.values(credits).reduce(
        (acc, curr) => acc + curr.quantity,
        0
    ),
    postSuccess
});
const mapDispatchToProps = dispatch => ({
    createDrawing: drawing => dispatch(createDrawing(drawing)),
    fetchCredits: () => dispatch(fetchAllCredits()),
    showModal: (type, props) => dispatch(showModal(type, props))
});

const WithRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDrawingFormContainer);

export default withRouter(WithRedux);
