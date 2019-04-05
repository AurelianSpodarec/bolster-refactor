import React from 'react';
import { connect } from 'react-redux';

import {
    PIN_IMAGE,
    ADD_TEMPLATE,
    EDIT_TEMPLATE,
    ADD_TEMPLATE_SECTION,
    ADD_TEMPLATE_QUESTION,
    EDIT_TEMPLATE_QUESTION,
    RENAME_TEMPLATE_SECTION,
    ADMIN_EDIT_SERVICE,
    EDIT_USER_PASSWORD,
    EDIT_USER,
    DELETE_ENQUIRY,
    DELETION_ERROR,
    DELETE_DOCUMENT,
    DELETE_OPERATIVE,
    DELETE_COMPANY_USER,
    DELETE_CLIENT_FROM_DRAWING,
    DELETE_COMPANY_PERMISSIONS
} from 'constants/shared/modalTypes';

import PinPhotoModal from '../presentational/PinPhotoModal';
import AddTemplateModalContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/AddTemplateModalContainer';
import EditTemplateModalContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/EditTemplateModalContainer';
import AddTemplateSectionModalContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/AddTemplateSectionModalContainer';
import AddTemplateQuestionModalContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/AddTemplateQuestionModalContainer';
import EditTemplateQuestionModalContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/EditTemplateQuestionModalContainer';
import RenameTemplateSectionModalContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/EditTemplateSectionModalContainer';
import EditServiceModalContainer from './EditServiceModalContainer';
import EditUserPasswordModalContainer from './EditUserPasswordModalContainer';
import EditUserModalContainer from './EditUserModalContainer';
import DeleteEnquiryModalContainer from './DeleteEnquiryModalContainer';
import DeletionErrorModalContainer from './DeletionErrorModalContainer';
import DeleteDocumentModalContainer from './DeleteDocumentModalContainer';
import DeleteOperativeModalContainer from './DeleteOperativeModalContainer';
import DeleteClientModalContainer from './DeleteClientModalContainer';
import DeleteCompanyUserModalContainer from './DeleteCompanyUserModalContainer';
import DeleteCompanyPermissionsModalContainer from './DeleteCompanyPermissionsModalContainer';

const MODAL_COMPONENTS = {
    [PIN_IMAGE]: PinPhotoModal,
    [ADD_TEMPLATE]: AddTemplateModalContainer,
    [EDIT_TEMPLATE]: EditTemplateModalContainer,
    [ADD_TEMPLATE_QUESTION]: AddTemplateQuestionModalContainer,
    [ADD_TEMPLATE_SECTION]: AddTemplateSectionModalContainer,
    [EDIT_TEMPLATE_QUESTION]: EditTemplateQuestionModalContainer,
    [RENAME_TEMPLATE_SECTION]: RenameTemplateSectionModalContainer,
    [ADMIN_EDIT_SERVICE]: EditServiceModalContainer,
    [EDIT_USER_PASSWORD]: EditUserPasswordModalContainer,
    [EDIT_USER]: EditUserModalContainer,
    [DELETE_ENQUIRY]: DeleteEnquiryModalContainer,
    [DELETE_DOCUMENT]: DeleteDocumentModalContainer,
    [DELETE_OPERATIVE]: DeleteOperativeModalContainer,
    [DELETION_ERROR]: DeletionErrorModalContainer,
    [DELETE_COMPANY_USER]: DeleteCompanyUserModalContainer,
    [DELETE_CLIENT_FROM_DRAWING]: DeleteClientModalContainer,
    [DELETE_COMPANY_PERMISSIONS]: DeleteCompanyPermissionsModalContainer
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) return null;

    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} />;
};

export default connect(({ shared }) => shared.modalReducer)(ModalRoot);
