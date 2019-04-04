import React from 'react';
import { connect } from 'react-redux';

import {
    PIN_IMAGE,
    ADD_TEMPLATE,
    ADD_TEMPLATE_SECTION,
    ADD_TEMPLATE_QUESTION,
    EDIT_TEMPLATE_QUESTION,
    RENAME_TEMPLATE_SECTION,
    EDIT_SERVICE,
    EDIT_USER_PASSWORD,
    EDIT_USER,
    DELETE_ENQUIRY,
    DELETION_ERROR,
    DELETE_DOCUMENT,
    DELETE_OPERATIVE
} from 'constants/shared/modalTypes';

import PinPhotoModal from '../presentational/PinPhotoModal';
import AddTemplateModalContainer from './AddTemplateModalContainer';
import AddTemplateSectionModalContainer from './AddTemplateSectionModalContainer';
import AddTemplateQuestionModalContainer from './AddTemplateQuestionModalContainer';
import EditTemplateQuestionModalContainer from './EditTemplateQuestionModalContainer';
import RenameTemplateSectionModalContainer from './RenameTemplateSectionModalContainer';
import EditServiceModalContainer from './EditServiceModalContainer';
import EditUserPasswordModalContainer from './EditUserPasswordModalContainer';
import EditUserModalContainer from './EditUserModalContainer';
import DeleteEnquiryModalContainer from './DeleteEnquiryModalContainer';
import DeletionErrorModalContainer from './DeletionErrorModalContainer';
import DeleteDocumentModalContainer from './DeleteDocumentModalContainer';
import DeleteOperativeModalContainer from './DeleteOperativeModalContainer';

const MODAL_COMPONENTS = {
    [PIN_IMAGE]: PinPhotoModal,
    [ADD_TEMPLATE]: AddTemplateModalContainer,
    [ADD_TEMPLATE_QUESTION]: AddTemplateQuestionModalContainer,
    [ADD_TEMPLATE_SECTION]: AddTemplateSectionModalContainer,
    [EDIT_TEMPLATE_QUESTION]: EditTemplateQuestionModalContainer,
    [RENAME_TEMPLATE_SECTION]: RenameTemplateSectionModalContainer,
    [EDIT_SERVICE]: EditServiceModalContainer,
    [EDIT_USER_PASSWORD]: EditUserPasswordModalContainer,
    [EDIT_USER]: EditUserModalContainer,
    [DELETE_ENQUIRY]: DeleteEnquiryModalContainer,
    [DELETE_DOCUMENT]: DeleteDocumentModalContainer,
    [DELETE_OPERATIVE]: DeleteOperativeModalContainer,
    [DELETION_ERROR]: DeletionErrorModalContainer
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) return null;

    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} />;
};

export default connect(({ shared }) => shared.modalReducer)(ModalRoot);
