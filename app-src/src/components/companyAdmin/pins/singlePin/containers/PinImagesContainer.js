import React from 'react';
import { connect } from 'react-redux';

import { PIN_IMAGE } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';

import PinImages from '../presentational/PinImages';

const PinImagesContainer = ({ images, dispatch }) => (
    <div className="pin-single-images">
        <PinImages
            images={images}
            showModal={modalProps => dispatch(showModal(PIN_IMAGE, modalProps))}
        />
    </div>
);

export default connect()(PinImagesContainer);
