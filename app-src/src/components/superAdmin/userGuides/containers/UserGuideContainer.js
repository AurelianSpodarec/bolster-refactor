import React from 'react';
import { connect } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import UserGuidesPresentational from '../presentational/UserGuidePresentation';
import { UPLOAD_USER_GUIDE } from 'constants/shared/modalTypes';

const UserGuideContainer = ({ showUploadUserGuideModal }) => {
    return <UserGuidesPresentational showUploadUserGuideModal={showUploadUserGuideModal} />;
};

const mapDispatchToProps = dispatch => ({
    showUploadUserGuideModal: () => dispatch(showModal(UPLOAD_USER_GUIDE)),
});

export default connect(null, mapDispatchToProps)(UserGuideContainer);
