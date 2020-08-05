import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import uploadUserGuide from 'actions/superAdmin/userGuides/async/uploadUserGuide';
import UploadUserGuideModal from '../presentational/UploadUserGuideModal';
import fetchUserGuide from 'actions/companyAdmin/userGuide/async/fetchUserGuide';

class UploadUserGuideModalContainer extends Component {
    state = {
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
        const { fileS3Key } = this.state;
        const { uploadUserGuide } = this.props;
        uploadUserGuide(fileS3Key);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    uploadUserGuide: fileS3Key => {
        dispatch(uploadUserGuide(fileS3Key));
        dispatch(hideModal());
    },
    fetchUserGuide: () => {
        dispatch(fetchUserGuide());
    },
});

export default connect(null, mapDispatchToProps)(UploadUserGuideModalContainer);
