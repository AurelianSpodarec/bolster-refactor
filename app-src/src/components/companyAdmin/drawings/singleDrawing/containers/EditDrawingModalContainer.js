import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import editDrawing from 'actions/companyAdmin/drawings/async/editDrawing';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';

import EditDrawingModal from '../presentational/EditDrawingModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class EditDrawingModalContainer extends Component {
    state = {
        name: '',
        file: '',
        isCreditsAvailable: true,
        startDate: null,
    };

    render() {
        const { drawing, filesUploading, hideModal, error, drawingNotStarted } = this.props;
        return (
            <BlockContainer error={error} contentClass="no-padding">
                <EditDrawingModal
                    {...this.state}
                    drawing={drawing}
                    handleChange={this.handleChange}
                    handleDateChange={this.handleDateChange}
                    handleStartDateChange={this.handleStartDateChange}
                    hideModal={hideModal}
                    handleSubmit={this.handleSubmit}
                    filesUploading={filesUploading}
                    drawingNotStarted={drawingNotStarted}
                />
            </BlockContainer>
        );
    }

    componentDidMount = async () => {
        const { drawing } = this.props;

        this.setState({
            name: drawing.name,
            startDate: new Date(drawing.startDate),
        });
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, error, showModal, filesUploaded, fetchAllCredits } = this.props;

        if (!prevProps.postSuccess && postSuccess && filesUploaded) {
            showModal(SUCCESS_MODAL, {
                message:
                    'New floor plan successfully changed. It may take a few minutes before the updated floor plan is available to view, please check back later',
            });
            fetchAllCredits();
        } else if (!prevProps.error && error) {
            showModal(ERROR_MODAL);
        } else if (!prevProps.postSuccess && postSuccess && !filesUploaded) {
            showModal(SUCCESS_MODAL, {
                message: 'Drawing name successfully changed',
            });
            fetchAllCredits();
        }
    };

    handleChange = (name, val) => {
        const { [name]: curVal } = this.state;
        this.setState({ [name]: val === curVal ? '' : val });
    };

    handleDateChange = date => {
        this.setState({
            dateToSend: date,
        });
    };
    handleStartDateChange = date => {
        this.setState({
            startDate: date,
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, file, startDate } = this.state;

        const {
            editDrawing,
            drawing,
            filesUploading,
            filesUploaded,
            totalCredits,
            addFieldError,
            showFieldErrors,
            drawingNotStarted,
        } = this.props;

        let postBody = {
            name,
            file,
        };

        if (drawingNotStarted) {
            postBody = {
                ...postBody,
                startDate: startDate ? moment(startDate).format() : null,
            };
        }

        const hasFileUploaded = !filesUploading && filesUploaded;
        const hasNoCredits = totalCredits < 1;
        if (
            drawing.doesRequireCreditToReplaceFloorplan &&
            !!file &&
            hasFileUploaded &&
            hasNoCredits
        ) {
            addFieldError('file', 'Not enough drawing credits');
            showFieldErrors();
        } else if (!filesUploading) editDrawing(drawing.id, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: { error: floorError, buildings },
            drawingsReducer: { drawingError, postSuccess },
            creditsReducer: { credits },
            companySettingsReducer: {
                companySettings: { isUsingBolsterLabels, useManufacturingByDefault },
            },
            subscriptionsReducer: {
                subscriptions: { serviceIDs: subscriptionServiceIDs },
            },
        },
        shared: {
            filesUploadingReducer: { filesUploading, filesUploaded },
        },
    },
    { drawing },
) => {
    const totalCredits = Object.values(credits).reduce((a, b) => a + b.quantity, 0);

    return {
        postSuccess,
        filesUploading,
        filesUploaded,
        totalCredits,
        isUsingBolsterLabels,
        error: drawingError || floorError,
        useManufacturingByDefault,
        subscriptionServiceIDs,
        building: Object.values(buildings),
        drawingNotStarted: moment(Date.now()).isBefore(drawing.startDate),
    };
};

const mapDispatchToProps = {
    hideModal,
    showModal,
    editDrawing,
    addFieldError,
    showFieldErrors,
    fetchAllCredits,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDrawingModalContainer);
