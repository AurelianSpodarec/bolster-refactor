import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import AddCreditsToDrawingForm from '../presentational/AddCreditsToDrawingForm';
import addCreditsToDrawing from 'actions/companyAdmin/drawings/async/addCreditsToDrawing';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

class AddCreditsToDrawingFormContainer extends Component {
    state = {
        credits: 1,
        expiryDate: null
    };

    render() {
        return (
            <AddCreditsToDrawingForm
                {...this.state}
                handleCreditsChange={this.handleCreditsChange}
                handleSubmit={this.handleSubmit}
                handleClose={this.handleClose}
            />
        );
    }

    componentDidMount = () => {
        const { drawing } = this.props;

        this.setState({
            expiryDate: moment(drawing.expiresOn).add(1, 'years')
        });
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, hideModal, showModal, fetchCredits } = this.props;

        if (!prevProps.postSuccess && postSuccess) {
            hideModal();
            showModal(SUCCESS_MODAL, {
                message: `Credits successfully added! Your drawings new expiry date is ${moment(
                    this.state.expiryDate
                ).format('DD/MM/YYYY HH:mm')}.`
            });
            fetchCredits();
        }
    };

    handleSubmit = () => {
        const { credits } = this.state;
        const {
            drawing: { id },
            addCreditsToDrawing
        } = this.props;

        const postBody = {
            id,
            credits
        };

        addCreditsToDrawing(id, postBody);
    };

    handleCreditsChange = (name, value) => {
        const {
            drawing: { expiresOn }
        } = this.props;

        let num = value;
        if (Number(value) <= 0) num = 0;
        this.setState({
            [name]: num,
            expiryDate: moment(expiresOn).add(num, 'years')
        });
    };

    handleClose = () => {
        this.props.hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { postSuccess, error }
    }
}) => ({
    postSuccess,
    error
});

const mapDispatchToProps = dispatch => ({
    addCreditsToDrawing: (drawingID, postBody) => {
        dispatch(addCreditsToDrawing(drawingID, postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    },
    showModal: (type, props) => dispatch(showModal(type, props)),
    fetchCredits: () => dispatch(fetchAllCredits())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCreditsToDrawingFormContainer);
