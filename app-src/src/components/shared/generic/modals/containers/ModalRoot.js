import React from 'react';
import { connect } from 'react-redux';

import {
    ADD_CARD,
    ADD_TEMPLATE,
    ADD_TEMPLATE_SECTION,
    ADD_TEMPLATE_QUESTION,
    ADMIN_EDIT_SERVICE,
    BUY_CREDITS,
    DELETE_ENQUIRY,
    DELETE_COMPANY_USER,
    DELETE_DOCUMENT,
    DELETE_CLIENT_FROM_DRAWING,
    DELETE_COMPANY_PERMISSIONS,
    DELETE_OPERATIVE,
    EDIT_TEMPLATE,
    EDIT_TEMPLATE_QUESTION,
    EDIT_USER,
    EDIT_USER_PASSWORD,
    ERROR_MODAL,
    PAYMENT_ERROR,
    PAYMENT_SUCCESS,
    PIN_IMAGE,
    RENAME_TEMPLATE_SECTION,
    SUCCESS_MODAL,
    ADD_SERVICE_TO_SUBSCRIPTION,
    PAY_INVOICE,
    COMPANY_EDIT_TEMPLATE_QUESTION,
    CONFIRM_DELETE,
    CONFIRM_ARCHIVE,
    CONFIRM_SUBMIT
} from 'constants/shared/modalTypes';

import AddCardModalContainer from 'components/companyAdmin/subscription/cardManagement/addCardModal/containers/AddCardModalContainer';
import AddServiceToSubscriptionModalContainer from 'components/companyAdmin/subscription/AddServiceToSubscriptionModal/containers/AddServiceToSubscriptionModalContainer';
import AddTemplateModalContainer from 'components/superAdmin/templateBuilder/setTemplate/containers/AddTemplateModalContainer';
import AddTemplateSectionModalContainer from 'components/superAdmin/templateBuilder/setSection/containers/AddTemplateSectionModalContainer';
import AddTemplateQuestionModalContainer from 'components/superAdmin/templateBuilder/setQuestion/containers/AddTemplateQuestionModalContainer';
import BuyCreditsModalContainer from 'components/companyAdmin/subscription/buyCreditsModal/containers/BuyCreditsModalContainer';
import CompanyEditTemplateQuestionModalContainer from 'components/companyAdmin/templates/singleTemplate/editTemplateQuestionModal/containers/EditTemplateQuestionModalContainer.js';
import DeleteEnquiryModalContainer from './DeleteEnquiryModalContainer';
import DeleteDocumentModalContainer from './DeleteDocumentModalContainer';
import DeleteOperativeModalContainer from './DeleteOperativeModalContainer';
import DeleteClientModalContainer from './DeleteClientModalContainer';
import DeleteCompanyPermissionsModalContainer from './DeleteCompanyPermissionsModalContainer';
import DeleteCompanyUserModalContainer from './DeleteCompanyUserModalContainer';
import EditServiceModalContainer from './EditServiceModalContainer';
import EditTemplateModalContainer from 'components/superAdmin/templateBuilder/setTemplate/containers/EditTemplateModalContainer';
import EditTemplateQuestionModalContainer from 'components/superAdmin/templateBuilder/setQuestion/containers/EditTemplateQuestionModalContainer';
import EditUserPasswordModalContainer from './EditUserPasswordModalContainer';
import EditUserModalContainer from './EditUserModalContainer';
import ErrorModal from '../presentational/ErrorModal';
import PayInvoiceModalContainer from 'components/companyAdmin/invoices/shared/payInvoiceModal/containers/PayInvoiceModalContainer';
import PaymentErrorModalContainer from './PaymentErrorModalContainer';
import PaymentSuccessModal from '../presentational/PaymentSuccessModal';
import PinPhotoModal from '../presentational/PinPhotoModal';
import RenameTemplateSectionModalContainer from 'components/superAdmin/templateBuilder/setSection/containers/EditTemplateSectionModalContainer';
import SuccessModalContainer from './SuccessModalContainer';
import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import ConfirmArchiveModal from '../presentational/ConfirmArchiveModal';
import ConfirmSubmitModal from '../presentational/ConfirmSubmitModal';

const MODAL_COMPONENTS = {
    [ADD_CARD]: AddCardModalContainer,
    [ADD_SERVICE_TO_SUBSCRIPTION]: AddServiceToSubscriptionModalContainer,
    [ADD_TEMPLATE]: AddTemplateModalContainer,
    [ADD_TEMPLATE_QUESTION]: AddTemplateQuestionModalContainer,
    [ADD_TEMPLATE_SECTION]: AddTemplateSectionModalContainer,
    [ADMIN_EDIT_SERVICE]: EditServiceModalContainer,
    [BUY_CREDITS]: BuyCreditsModalContainer,
    [COMPANY_EDIT_TEMPLATE_QUESTION]: CompanyEditTemplateQuestionModalContainer,
    [CONFIRM_ARCHIVE]: ConfirmArchiveModal,
    [CONFIRM_DELETE]: ConfirmDeleteModal,
    [CONFIRM_SUBMIT]: ConfirmSubmitModal,
    [DELETE_CLIENT_FROM_DRAWING]: DeleteClientModalContainer,
    [DELETE_COMPANY_PERMISSIONS]: DeleteCompanyPermissionsModalContainer,
    [DELETE_COMPANY_USER]: DeleteCompanyUserModalContainer,
    [DELETE_DOCUMENT]: DeleteDocumentModalContainer,
    [DELETE_ENQUIRY]: DeleteEnquiryModalContainer,
    [DELETE_OPERATIVE]: DeleteOperativeModalContainer,
    [ERROR_MODAL]: ErrorModal,
    [EDIT_TEMPLATE]: EditTemplateModalContainer,
    [EDIT_TEMPLATE_QUESTION]: EditTemplateQuestionModalContainer,
    [EDIT_USER]: EditUserModalContainer,
    [EDIT_USER_PASSWORD]: EditUserPasswordModalContainer,
    [PAY_INVOICE]: PayInvoiceModalContainer,
    [PAYMENT_ERROR]: PaymentErrorModalContainer,
    [PAYMENT_SUCCESS]: PaymentSuccessModal,
    [PIN_IMAGE]: PinPhotoModal,
    [RENAME_TEMPLATE_SECTION]: RenameTemplateSectionModalContainer,
    [SUCCESS_MODAL]: SuccessModalContainer
};

const ModalRoot = ({ modalType, modalProps }) => {
    if (!modalType) return null;

    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} />;
};

export default connect(({ shared }) => shared.modalReducer)(ModalRoot);
