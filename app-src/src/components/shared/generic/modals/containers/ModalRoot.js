import React from 'react';
import { connect } from 'react-redux';

import {
    PIN_IMAGE,
    ADD_TEMPLATE_QUESTION,
    ADD_TEMPLATE_SECTION,
    EDIT_SERVICE
} from 'constants/modalTypes';

import PinPhotoModal from '../presentational/PinPhotoModal';
import AddTemplateSectionModalContainer from './AddTemplateSectionModalContainer';
import AddTemplateQuestionModalContainer from './AddTemplateQuestionModalContainer';
import EditServiceModalContainer from './EditServiceModalContainer';

const MODAL_COMPONENTS = {
    [PIN_IMAGE]: PinPhotoModal,
    [ADD_TEMPLATE_QUESTION]: AddTemplateQuestionModalContainer,
    [ADD_TEMPLATE_SECTION]: AddTemplateSectionModalContainer,
    [EDIT_SERVICE]: EditServiceModalContainer
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) return null;

    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} />;
};

export default connect(state => state.modalReducer)(ModalRoot);
