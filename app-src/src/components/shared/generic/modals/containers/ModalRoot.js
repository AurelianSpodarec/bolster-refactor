import React from 'react';
import { connect } from 'react-redux';

import { PIN_IMAGE, ADD_TEMPLATE_QUESTION } from 'constants/modalTypes';

import PinPhotoModal from '../presentational/PinPhotoModal';
import AddTemplateQuestionModalContainer from './AddTemplateQuestionModalContainer';

const MODAL_COMPONENTS = {
    [PIN_IMAGE]: PinPhotoModal,
    [ADD_TEMPLATE_QUESTION]: AddTemplateQuestionModalContainer
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) return null;

    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} />;
};

export default connect(state => state.modalReducer)(ModalRoot);
