import React from 'react';
import { connect } from 'react-redux';

import { PIN_IMAGE } from 'constants/modalTypes';

import PinPhotoModal from '../presentational/PinPhotoModal';

const MODAL_COMPONENTS = {
    [PIN_IMAGE]: PinPhotoModal
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) return null;

    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} />;
};

export default connect(state => state.modalReducer)(ModalRoot);
