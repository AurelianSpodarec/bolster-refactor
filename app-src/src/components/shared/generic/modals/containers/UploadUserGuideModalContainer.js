import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import uploadUserGuide from 'actions/superAdmin/userGuides/async/uploadUserGuide';
import UploadUserGuideModal from '../presentational/UploadUserGuideModal';

class UploadUserGuideModalContainer extends Component {
    state = {
        fileName: '',
        fileS3Key: '',
    };
    render() {
        return (
            <UploadUserGuideModal
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                hideModal={e => {
                    e.preventDefault();
                    this.props.hideModal();
                }}
            />
        );
    }
    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        const { fileName, fileS3Key } = this.state;
        const { uploadUserGuide } = this.props;

        uploadUserGuide(fileName, fileS3Key);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    uploadUserGuide: (fileName, fileS3Key) => {
        dispatch(uploadUserGuide(fileName, fileS3Key));
        dispatch(hideModal());
    },
});

export default connect(null, mapDispatchToProps)(UploadUserGuideModalContainer);
