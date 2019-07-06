import React from 'react';
import { connect } from 'react-redux';

import {
    ADD_BUILDING,
    ADD_BUILDINGS,
    ADD_CARD,
    ADD_DRAWING,
    ADD_DROPDOWN_OPTION,
    ADD_FLOOR,
    ADD_FLOORS,
    ADD_SERVICE_TO_SUBSCRIPTION,
    ADD_SITE,
    ADD_TEMPLATE,
    ADD_TEMPLATE_SECTION,
    ADD_TEMPLATE_QUESTION,
    ADMIN_EDIT_SERVICE,
    BUY_CREDITS,
    CONFIRM_ARCHIVE,
    CONFIRM_DELETE,
    CONFIRM_EDIT_PIN,
    COMPANY_EDIT_TEMPLATE_QUESTION,
    CONFIRM_SUBMIT,
    CREATE_COMPANY_ADMIN,
    CREATE_OPERATIVE,
    DELETE_DROPDOWN_OPTION,
    DELETE_ENQUIRY,
    DELETE_COMPANY_USER,
    DELETE_DOCUMENT,
    DELETE_CLIENT_FROM_DRAWING,
    DELETE_COMPANY_PERMISSIONS,
    DELETE_OPERATIVE,
    DOCUMENT_RESPONSE_AGREEANCE,
    EDIT_BUILDING,
    EDIT_DROPDOWN_OPTION,
    EDIT_FLOOR,
    EDIT_DRAWING,
    EDIT_SITE,
    EDIT_TEMPLATE,
    EDIT_TEMPLATE_QUESTION,
    EDIT_USER,
    EDIT_USER_PASSWORD,
    ERROR_MODAL,
    LOADING_DATA,
    PAY_INVOICE,
    PAYMENT_ERROR,
    PAYMENT_SUCCESS,
    PIN_IMAGE,
    RENAME_TEMPLATE_SECTION,
    SET_LABEL_FIELDS,
    SUCCESS_MODAL,
    FILTER_FIELDS,
    CLIENT_FILTER_FIELDS,
    UNLINK_DEVICE,
    COPY_TEMPLATE,
    SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    SELECT_PIN_SCALE,
    ADD_DRAWINGS,
    SET_TEMPLATE_IMAGE,
    ADMIN_RECORD_PAYMENT,
    ADMIN_CONFIRM_FREE_INVOICE,
    ADMIN_EDIT_PAYMENT,
    ADMIN_DELETE_PAYMENT
} from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AddCardModalContainer from 'components/companyAdmin/subscription/cardManagement/addCardModal/containers/AddCardModalContainer';
import AddServiceToSubscriptionModalContainer from 'components/companyAdmin/subscription/AddServiceToSubscriptionModal/containers/AddServiceToSubscriptionModalContainer';
import AddTemplateModalContainer from 'components/superAdmin/templateBuilder/setTemplate/containers/AddTemplateModalContainer';
import SetLabelFieldsModalContainer from 'components/superAdmin/templateBuilder/setLabelFields/containers/SetLabelFieldsModalContainer';
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
import FilterFieldsModalContainer from 'components/companyAdmin/reports/createReport/components/containers/FilterFieldsModalContainer';
import ClientFilterFieldsModalContainer from 'components/client/reports/createReport/components/containers/FilterFieldsModalContainer';
import PayInvoiceModalContainer from 'components/companyAdmin/invoices/shared/payInvoiceModal/containers/PayInvoiceModalContainer';
import PaymentErrorModalContainer from './PaymentErrorModalContainer';
import PinPhotoModal from '../presentational/PinPhotoModal';
import RenameTemplateSectionModalContainer from 'components/superAdmin/templateBuilder/setSection/containers/EditTemplateSectionModalContainer';
import SuccessModalContainer from './SuccessModalContainer';
import ConfirmDeleteModal from '../presentational/ConfirmDeleteModal';
import ConfirmArchiveModal from '../presentational/ConfirmArchiveModal';
import ConfirmSubmitModal from '../presentational/ConfirmSubmitModal';
import PaymentSuccessModalContainer from './PaymentSuccessModalContainer';
import EditDrawingModalContainer from 'components/companyAdmin/drawings/singleDrawing/containers/EditDrawingModalContainer';
import ConfirmEditPinModalContainer from 'components/companyAdmin/pins/confirmEditPinModal/containers/ConfirmEditPinModalContainer';
import AddSiteModal from 'components/companyAdmin/sites/addSiteModal/presentational/AddSiteModal';
import CreateBuildingModal from 'components/companyAdmin/buildings/addBuildingModal/presentational/CreateBuildingModal';
import AddFloorModal from 'components/companyAdmin/floors/addFloorModal/presentational/AddFloorModal';
import AddDrawingModal from 'components/companyAdmin/drawings/addDrawingModal/presentational/AddDrawingModal';
import EditSiteModal from 'components/companyAdmin/sites/editSiteModal/presentational/EditSiteModal';
import EditBuildingModal from 'components/companyAdmin/buildings/editBuildingModal/presentational/EditBuildingModal';
import EditFloorModal from 'components/companyAdmin/floors/editFloorModal/presentational/EditFloorModal';
import AddDropdownOptionModal from 'components/companyAdmin/dropdownOptions/addDropdownOptionModal/presentational/AddDropdownOptionModal';
import EditDropdownOptionModal from 'components/companyAdmin/dropdownOptions/editDropdownOptionModal/presentational/EditDropdownOptionModal';
import DeleteDropdownOptionModalContainer from 'components/companyAdmin/dropdownOptions/deleteDropdownOptionModal/containers/DeleteDropdownOptionModalContainer';
import CreateCompanyAdminModal from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdminModal';
import LoadingDataModal from '../presentational/LoadingDataModal';
import UnlinkDeviceModalContainer from './UnlinkDeviceModalContainer';
import CreateOperativeModal from 'components/companyAdmin/userManagement/operatives/createOperative/presentational/CreateOperativeModal';
import CopyTemplateModalContainer from 'components/superAdmin/templateBuilder/copyTemplate/containers/CopyTemplateModalContainer';
import DocumentResponseAgreeanceModalContainer from 'components/shared/documents/containers/DocumentResponseAgreeanceModalContainer';
import SinglePinGenerateReportSuccessModalContainer from 'components/companyAdmin/pins/singlePin/containers/SinglePinGenerateReportSuccessModalContainer';
import ClientSinglePinGenerateReportSuccessModalContainer from 'components/client/pins/singlePin/containers/SinglePinGenerateReportSuccessModalContainer';
import SelectPinScaleModalContainer from 'components/shared/generic/modals/containers/SelectPinScaleModalContainer';
import CreateBuildingsModal from 'components/companyAdmin/buildings/addBuildingsModal/presentational/CreateBuildingsModal';
import CreateFloorsModal from 'components/companyAdmin/floors/addFloorsModal/presentational/CreateFloorsModal';
import AddDrawingsModal from 'components/companyAdmin/drawings/addDrawingsModal/presentational/AddDrawingsModal';
import SetImageModalContainer from 'components/superAdmin/templateBuilder/setImage/containers/SetImageModalContainer';
import RecordPaymentModalContainer from 'components/superAdmin/invoices/recordPaymentModal/containers/RecordPaymentModalContainer';
import ConfirmFreeInvoiceModalContainer from 'components/superAdmin/invoices/confirmFreeInvoiceModal/containers/ConfirmFreeInvoiceModalContainer.js';
import EditPaymentModalContainer from 'components/superAdmin/invoices/editPaymentModal/containers/EditPaymentModalContainer';
import DeletePaymentModalContainer from 'components/superAdmin/invoices/confirmDeletePaymentModal/containers/DeletePaymentModalContainer';

const MODAL_COMPONENTS = {
    [ADD_CARD]: AddCardModalContainer,
    [ADD_SERVICE_TO_SUBSCRIPTION]: AddServiceToSubscriptionModalContainer,
    [ADD_TEMPLATE]: AddTemplateModalContainer,
    [ADD_TEMPLATE_QUESTION]: AddTemplateQuestionModalContainer,
    [ADD_TEMPLATE_SECTION]: AddTemplateSectionModalContainer,
    [SET_LABEL_FIELDS]: SetLabelFieldsModalContainer,
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
    [FILTER_FIELDS]: FilterFieldsModalContainer,
    [CLIENT_FILTER_FIELDS]: ClientFilterFieldsModalContainer,
    [PAY_INVOICE]: PayInvoiceModalContainer,
    [PAYMENT_ERROR]: PaymentErrorModalContainer,
    [PAYMENT_SUCCESS]: PaymentSuccessModalContainer,
    [PIN_IMAGE]: PinPhotoModal,
    [RENAME_TEMPLATE_SECTION]: RenameTemplateSectionModalContainer,
    [COPY_TEMPLATE]: CopyTemplateModalContainer,
    [SUCCESS_MODAL]: SuccessModalContainer.WrappedComponent,
    [EDIT_DRAWING]: EditDrawingModalContainer,
    [CONFIRM_EDIT_PIN]: ConfirmEditPinModalContainer,
    [ADD_SITE]: AddSiteModal,
    [ADD_BUILDING]: CreateBuildingModal,
    [ADD_BUILDINGS]: CreateBuildingsModal,
    [ADD_FLOOR]: AddFloorModal,
    [ADD_FLOORS]: CreateFloorsModal,
    [ADD_DRAWING]: AddDrawingModal,
    [ADD_DRAWINGS]: AddDrawingsModal,
    [EDIT_SITE]: EditSiteModal,
    [EDIT_BUILDING]: EditBuildingModal,
    [EDIT_FLOOR]: EditFloorModal,
    [ADD_DROPDOWN_OPTION]: AddDropdownOptionModal,
    [EDIT_DROPDOWN_OPTION]: EditDropdownOptionModal,
    [DELETE_DROPDOWN_OPTION]: DeleteDropdownOptionModalContainer,
    [CREATE_COMPANY_ADMIN]: CreateCompanyAdminModal,
    [CREATE_OPERATIVE]: CreateOperativeModal,
    [LOADING_DATA]: LoadingDataModal,
    [UNLINK_DEVICE]: UnlinkDeviceModalContainer,
    [DOCUMENT_RESPONSE_AGREEANCE]: DocumentResponseAgreeanceModalContainer,
    [SINGLE_PIN_GENERATE_REPORT_SUCCESS]: SinglePinGenerateReportSuccessModalContainer,
    [CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS]: ClientSinglePinGenerateReportSuccessModalContainer,
    [SELECT_PIN_SCALE]: SelectPinScaleModalContainer,
    [SET_TEMPLATE_IMAGE]: SetImageModalContainer,
    [ADMIN_RECORD_PAYMENT]: RecordPaymentModalContainer,
    [ADMIN_CONFIRM_FREE_INVOICE]: ConfirmFreeInvoiceModalContainer,
    [ADMIN_EDIT_PAYMENT]: EditPaymentModalContainer,
    [ADMIN_DELETE_PAYMENT]: DeletePaymentModalContainer
};

const ModalRoot = ({ modalType, modalProps, ...otherProps }) => {
    if (!modalType) return null;

    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} {...otherProps} />;
};

export default connect(
    ({ shared }) => shared.modalReducer,
    dispatch => ({
        hideModal: () => dispatch(hideModal()),
        showModal: (modalType, modalProps) =>
            dispatch(showModal(modalType, modalProps))
    })
)(ModalRoot);
