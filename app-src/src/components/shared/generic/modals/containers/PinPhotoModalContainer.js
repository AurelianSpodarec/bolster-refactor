import React from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import PinPhotoModal from '../presentational/PinPhotoModal';

const PinPhotoModalContainer = ({ dispatch, image }) => (
    <PinPhotoModal
        image={image}
        hideModal={e => {
            e.preventDefualt();
            dispatch(hideModal());
        }}
    />
);

export default connect()(PinPhotoModalContainer);
