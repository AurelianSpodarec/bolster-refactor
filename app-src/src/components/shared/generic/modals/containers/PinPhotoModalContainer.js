import React from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/generic/modals/sync/hideModal';

import PinPhotoModal from '../presentational/PinPhotoModal';

const PinPhotoModalContainer = ({ dispatch }) => (
    <PinPhotoModal
        hideModal={e => {
            e.preventDefualt();
            dispatch(hideModal());
        }}
    />
);

export default connect()(PinPhotoModalContainer);
