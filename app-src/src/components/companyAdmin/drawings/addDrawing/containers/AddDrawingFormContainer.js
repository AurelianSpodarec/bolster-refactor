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
        file: ''
    };

    render = () => {
        const { name, file } = this.state;
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
            />
        );
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, fetchCredits } = this.props;
        if (postSuccess && !prevProps.postSuccess) fetchCredits();
    };

    handleInputChange = (name, value) => this.setState({ [name]: value });

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
    credits: Object.values(credits).reduce((acc, curr) => acc + curr.quantity, 0),
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
