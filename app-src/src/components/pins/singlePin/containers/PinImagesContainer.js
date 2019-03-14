import React from 'react';
import { connect } from 'react-redux';

import { PIN_IMAGE } from 'constants/modalTypes';
import showModal from 'actions/generic/modals/sync/showModal';

import PinImages from '../presentational/PinImages';

const PinImagesContainer = ({ images, dispatch }) => (
    <PinImages
        images={images}
        showModal={modalProps => dispatch(showModal(PIN_IMAGE, modalProps))}
    />
);

export default connect()(PinImagesContainer);
