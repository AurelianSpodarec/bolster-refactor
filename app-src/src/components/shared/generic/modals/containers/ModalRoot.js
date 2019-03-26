import React from 'react';
import { connect } from 'react-redux';

import {
    PIN_IMAGE,
    ADD_TEMPLATE_QUESTION,
    ADD_TEMPLATE_SECTION,
    EDIT_SERVICE,
    EDIT_USER_PASSWORD,
    EDIT_USER
} from 'constants/modalTypes';

import PinPhotoModal from '../presentational/PinPhotoModal';
import AddTemplateSectionModalContainer from './AddTemplateSectionModalContainer';
import AddTemplateQuestionModalContainer from './AddTemplateQuestionModalContainer';
import EditServiceModalContainer from './EditServiceModalContainer';
import EditUserPasswordModalContainer from './EditUserPasswordModalContainer';
import EditUserModalContainer from './EditUserModalContainer';

const MODAL_COMPONENTS = {
    [PIN_IMAGE]: PinPhotoModal,
    [ADD_TEMPLATE_QUESTION]: AddTemplateQuestionModalContainer,
    [ADD_TEMPLATE_SECTION]: AddTemplateSectionModalContainer,
    [EDIT_SERVICE]: EditServiceModalContainer,
    [EDIT_USER_PASSWORD]: EditUserPasswordModalContainer,
    [EDIT_USER]: EditUserModalContainer
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) return null;

    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} />;
};

export default connect(state => state.modalReducer)(ModalRoot);
