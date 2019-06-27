import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import editDrawing from 'actions/companyAdmin/drawings/async/editDrawing';
import EditDrawingModal from '../presentational/EditDrawingModal';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';

class EditDrawingModalContainer extends Component {
    state = {
        name: '',
        file: '',
        isCreditsAvailable: true,
        isAlertShowing: false,
        alertMessage: '',
        alertDate: null
    };

    render() {
        const { drawing, filesUploading, hideModal } = this.props;
        return (
            <EditDrawingModal
                {...this.state}
                drawing={drawing}
                handleChange={this.handleChange}
                handleDateChange={this.handleDateChange}
                hideModal={hideModal}
                handleSubmit={this.handleSubmit}
                filesUploading={filesUploading}
            />
        );
    }

    componentDidMount = () => {
        const { drawing } = this.props;

        this.setState({
            name: drawing.name
        });
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, error, showModal, filesUploaded } = this.props;

        if (!prevProps.postSuccess && postSuccess && filesUploaded) {
            showModal(SUCCESS_MODAL, {
                message:
                    'New floor plan successfully changed. It may take a few minutes before the updated floor plan is available to view, please check back later'
            });
        } else if (!prevProps.error && error) {
            showModal(ERROR_MODAL);
        } else if (!prevProps.postSuccess && postSuccess && !filesUploaded) {
            showModal(SUCCESS_MODAL, {
                message: 'Drawing name successfully changed'
            });
        }
    };

    handleChange = (name, val) => {
        const { [name]: curVal } = this.state;
        this.setState({ [name]: val === curVal ? '' : val });
    };

    handleDateChange = date => {
        this.setState({
            alertDate: date
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, file } = this.state;
        const {
            editDrawing,
            drawing,
            filesUploading,
            filesUploaded,
            totalCredits,
            addFieldError,
            showFieldErrors
        } = this.props;

        const postBody = {
            name,
            file
        };

        if (!filesUploading && filesUploaded && totalCredits < 1) {
            addFieldError('file', 'Not enough drawing credits');
            showFieldErrors();
        } else if (!filesUploading) editDrawing(drawing.id, postBody);
    };

    showErrorModal = () => this.props.showModal(ERROR_MODAL);
}

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { error, postSuccess },
        creditsReducer: { credits }
    },
    shared: {
        filesUploadingReducer: { filesUploading, filesUploaded }
    }
}) => {
    const totalCredits = Object.values(credits).reduce(
        (a, b) => a + b.quantity,
        0
    );

    return {
        error,
        postSuccess,
        filesUploading,
        filesUploaded,
        totalCredits
    };
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    editDrawing: (id, body) => dispatch(editDrawing(id, body)),
    addFieldError: (field, err) => dispatch(addFieldError(field, err)),
    showFieldErrors: () => dispatch(showFieldErrors())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDrawingModalContainer);
