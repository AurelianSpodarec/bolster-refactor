import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import editDrawing from 'actions/companyAdmin/drawings/async/editDrawing';
import EditDrawingModal from '../presentational/EditDrawingModal';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';

class EditDrawingModalContainer extends Component {
    state = {
        name: '',
        file: '',
        isCreditsAvailable: true
    };

    render() {
        const { drawing, filesUploading, hideModal } = this.props;
        return (
            <EditDrawingModal
                {...this.state}
                drawing={drawing}
                handleChange={this.handleChange}
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

        const { name, file } = this.state;
        const {
            editDrawing,
            drawing,
            filesUploading,
            totalCredits
        } = this.props;

        const postBody = {
            name,
            file
        };

        if (!filesUploading) editDrawing(drawing.id, postBody);
    };

    showErrorModal = () => this.props.showModal(ERROR_MODAL);
}

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { error, postSuccess },
        creditsReducer: { credits }
    },
    shared: {
        filesUploadingReducer: { filesUploading }
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
        totalCredits
    };
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    editDrawing: (id, body) => dispatch(editDrawing(id, body))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditDrawingModalContainer);
