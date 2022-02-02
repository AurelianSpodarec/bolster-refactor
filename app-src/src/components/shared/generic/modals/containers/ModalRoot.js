import React from 'react';
import { connect } from 'react-redux';

import {
    ADD_BUILDINGS,
    ADD_CARD,
    ADD_DROPDOWN_OPTION,
    ADD_FLOORS,
    ADD_SERVICE_TO_SUBSCRIPTION,
    ADD_SITE,
    ADD_TEMPLATE,
    ADD_TEMPLATE_SECTION,
    ADD_TEMPLATE_QUESTION,
    ADMIN_CREATE_COMPANY_ADMIN,
    ADMIN_EDIT_SERVICE,
    ADD_CREDITS_TO_DRAWING,
    BUY_CREDITS,
    CONFIRM_ARCHIVE,
    CONFIRM_DELETE,
    CONFIRM_EDIT_PIN,
    COMPANY_EDIT_TEMPLATE_QUESTION,
    CONFIRM_SUBMIT,
    CREATE_COMPANY_ADMIN,
    CREATE_OPERATIVE,
    TOGGLE_DROPDOWN_OPTION,
    DELETE_CONTACT_SUBMISSION,
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
    UPLOAD_USER_GUIDE,
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
    REVOKE_ADMIN_ACCESS,
    RESTRICT_ADMIN_PAYMENTS,
    COPY_TEMPLATE,
    SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS,
    SELECT_PIN_SCALE,
    ADD_DRAWINGS,
    SET_TEMPLATE_IMAGE,
    ADMIN_RECORD_PAYMENT,
    ADMIN_CONFIRM_FREE_INVOICE,
    ADMIN_EDIT_PAYMENT,
    ADMIN_DELETE_PAYMENT,
    REMOVE_DRAWINGS_ACCESS,
    FORGOT_PASSWORD,
    GENERATE_SOS_CODE,
    ADD_INVOICE_COMMENT,
    ADD_CONTACT_SUBMISSION_COMMENT,
    CONFIRM_MOVE_HIERARCHY_TO_COMPANY,
    ADMIN_CONFIRM_SET_IS_INVOICE_PAID,
    ADMIN_DELETE_INVOICE,
    ADMIN_RESTORE_INVOICE,
    DELETE_INVOICE,
    ADD_MULTIPLE_SERVICES_TO_SUBSCRIPTION,
    GENERATE_QR_CODES,
    ADMIN_ADD_MANUFACTURER,
    ADMIN_EDIT_MANUFACTURER,
    ADMIN_ADD_OPTION_VALUE,
    ADMIN_EDIT_OPTION_VALUE,
    ADMIN_ADD_DOCUMENT_TO_OPTION_VALUE,
    ADMIN_EDIT_OPTION_VALUE_DOCUMENT,
    ADMIN_ADD_OPTION_VALUE_DOCUMENT_VERSION,
    DOCUMENT_VIEW,
    ADMIN_DELETE_OPTION_VALUE_DOCUMENT_VERSION,
    COMPANY_ADD_MANUFACTURER,
    COMPANY_EDIT_MANUFACTURER,
    COMPANY_TOGGLE_MANUFACTURER,
    COMPANY_TOGGLE_MANUFACTURER_OPTION_VALUE,
    COMPANY_ADD_OPTION_VALUE,
    COMPANY_EDIT_OPTION_VALUE,
    COMPANY_ADD_DOCUMENT_TO_OPTION_VALUE,
    COMPANY_EDIT_OPTION_VALUE_DOCUMENT,
    COMPANY_ADD_OPTION_VALUE_DOCUMENT_VERSION,
    COMPANY_DELETE_OPTION_VALUE_DOCUMENT_VERSION,
    ADMIN_EDIT_COMPANY_ADDRESS,
    ADD_NEW_FEATURE,
    EDIT_NEW_FEATURE,
    RECENT_UPDATE_MODAL,
    VIEW_ZONES,
    ADD_DRAWING_ZONE,
    ZONE_DETAILS,
    EDIT_ZONE_MODAL,
    WHY_USE_OUR_SYSTEM,
    ADMIN_LATEST_SYNCS,
    EDIT_BANNER_NOTIFICATION,
    ADD_NEW_BANNER_NOTIFICATION,
    UPDATE_REPORT_LAYOUT,
    CONFIRM_TWO_FACTOR,
    RECOVER_USER,
    REACTIVATE_USER,
    DISABLE_USER,
    ENABLE_USER,
    RESEND_INVITE,
    ADD_DEMO_ACCESS_CODES,
    EDIT_DEMO_ACCESS_CODES,
    DELETE_DEMO_ACCESS_CODES,
    ENTER_DEMO_ACCESS_CODES,
    REQUEST_DELETE_INVOICE,
    ADMIN_EDIT_COMPANY_OWNER,
    CONFIRM_EMAIL,
    USER_NEW_DOCUMENT,
    GENERATE_TIMESHEET_REPORT,
    EXPANDED_MEDIA,
    CREATE_PIN_TASK,
    EDIT_PIN_TASK,
    FETCH_PIN_TASK,
    EDIT_PIN_TASK_SERIES,
} from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AddCardModalContainer from 'components/companyAdmin/subscription/cardManagement/addCardModal/containers/AddCardModalContainer';
import AddServiceToSubscriptionModalContainer from 'components/companyAdmin/subscription/AddServiceToSubscriptionModal/containers/AddServiceToSubscriptionModalContainer';
import AddMulitpleServicesToSubscriptionModalContainer from 'components/companyAdmin/subscription/AddMultipleServicesToSubscriptionModal/containers/AddMulitpleServicesToSubscriptionModalContainer';
import AddTemplateModalContainer from 'components/superAdmin/templateBuilder/setTemplate/containers/AddTemplateModalContainer';
import SetLabelFieldsModalContainer from 'components/superAdmin/templateBuilder/setLabelFields/containers/SetLabelFieldsModalContainer';
import AddTemplateSectionModalContainer from 'components/superAdmin/templateBuilder/setSection/containers/AddTemplateSectionModalContainer';
import AddTemplateQuestionModalContainer from 'components/superAdmin/templateBuilder/setQuestion/containers/AddTemplateQuestionModalContainer';
import BuyCreditsModalContainer from 'components/companyAdmin/subscription/buyCreditsModal/containers/BuyCreditsModalContainer';
import CompanyEditTemplateQuestionModalContainer from 'components/companyAdmin/templates/singleTemplate/editTemplateQuestionModal/containers/EditTemplateQuestionModalContainer.js';
import DeleteContactSubmissionModalContainer from './DeleteContactSubmissionModalContainer';
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
import EditSiteModal from 'components/companyAdmin/sites/editSiteModal/presentational/EditSiteModal';
import EditBuildingModal from 'components/companyAdmin/buildings/editBuildingModal/presentational/EditBuildingModal';
import EditFloorModal from 'components/companyAdmin/floors/editFloorModal/presentational/EditFloorModal';
import AddDropdownOptionModal from 'components/companyAdmin/dropdownOptions/addDropdownOptionModal/presentational/AddDropdownOptionModal';
import EditDropdownOptionModal from 'components/companyAdmin/dropdownOptions/editDropdownOptionModal/presentational/EditDropdownOptionModal';
import ToggleDropdownOptionModalContainer from 'components/companyAdmin/dropdownOptions/toggleDropdownOptionModal/containers/ToggleDropdownOptionModalContainer';
import CreateCompanyAdminModal from 'components/companyAdmin/userManagement/companyAdmins/createCompanyAdmin/presentational/CreateCompanyAdminModal';
import LoadingDataModal from '../presentational/LoadingDataModal';
import UnlinkDeviceModalContainer from './UnlinkDeviceModalContainer';
import RevokeAdminAccessModalContainer from './RevokeAdminAccessModalContainer';
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
import RemoveUserDrawingsAccessModalContainer from 'components/companyAdmin/userManagement/userDrawings/containers/RemoveUserDrawingsAccessModalContainer';
import ForgotPasswordModalContainer from 'components/frontEnd/auth/forgotPasswordModal/containers/ForgotPasswordModalContainer';
import AddCreditsToDrawingModal from 'components/companyAdmin/drawings/addCreditsToDrawing/presentational/AddCreditsToDrawingModal';
import SOSGenerationModal from 'components/superAdmin/sosManagement/sosGenerationModal/presentational/SOSGenerationModal';
import SiteManagementConfirmMoveModalContainer from 'components/superAdmin/siteManagement/moveTool/containers/MoveToolConfirmMoveModalContainer';
import ConfirmSetIsInvoicePaidModalContainer from 'components/superAdmin/invoices/confirmSetIsInvoicePaidModal/containers/ConfirmSetIsInvoicePaidModalContainer';
import SuperAdminConfirmDeleteInvoiceModalContainer from 'components/superAdmin/invoices/superAdminConfirmDeleteInvoiceModal/containers/SuperAdminConfirmDeleteInvoiceModalContainer';
import SuperAdminConfirmRestoreInvoiceModalContainer from 'components/superAdmin/invoices/superAdminConfirmRestoreInvoiceModal/containers/SuperAdminConfirmRestoreInvoiceModalContainer';
import ConfirmDeleteInvoiceModalContainer from 'components/companyAdmin/invoices/confirmDeleteInvoiceModal/containers/ConfirmDeleteInvoiceModalContainer';
import AddCompanyAdminModalContainer from 'components/superAdmin/companies/singleCompany/containers/AddCompanyAdminModalContainer';
import GenerateQRCodesModalContainer from './GenerateQRCodesModalContainer';
import RestrictPaymentsModalContainer from './RestrictPaymentsModalContainer';
import AdminAddManufacturerModal from 'components/superAdmin/pinOptions/addManufacturer/presentational/AddManufacturerModal';
import AdminEditManufacturerModal from 'components/superAdmin/pinOptions/editManufacturer/presentational/EditManufacturerModal';
import AdminAddOptionValueModal from 'components/superAdmin/pinOptions/addOptionValue/presentational/AddOptionValueModal';
import AdminEditOptionValueModal from 'components/superAdmin/pinOptions/editOptionValue/presentational/EditOptionValueModal';
import AdminAddDocumentToOptionValueModal from 'components/superAdmin/pinOptions/addDocumentToOptionValue/presentational/AddDocumentToOptionValueModal';
import AdminEditOptionValueDocumentModal from 'components/superAdmin/pinOptions/editOptionValueDocument/presentational/EditOptionValueDocumentModal';
import AdminAddNewDocumentVersionModal from 'components/superAdmin/pinOptions/addNewDocumentVersion/presentational/AddNewDocumentVersionModal';
import DocumentViewModal from '../presentational/DocumentViewModal';
import AdminConfirmDeleteDocumentVersionModalContainer from 'components/superAdmin/pinOptions/confirmDeleteDocumentVersion/containers/ConfirmDeleteDocumentVersionModalContainer';
import AddManufacturerModal from 'components/companyAdmin/dropdownOptions/addManufacturer/presentational/AddManufacturerModal';
import EditManufacturerModal from 'components/companyAdmin/dropdownOptions/editManufacturer/presentational/EditManufacturerModal';
import ToggleManufacturerModalContainer from 'components/companyAdmin/dropdownOptions/toggleManufacturerModal/containers/ToggleManufacturerModalContainer';
import ToggleManufacturerOptionValueModalContainer from 'components/companyAdmin/dropdownOptions/toggleManufacturerOptionValueModal/containers/ToggleManufacturerOptionValueModalContainer';
import AddOptionValueModal from 'components/companyAdmin/dropdownOptions/addOptionValue/presentational/AddOptionValueModal';
import EditOptionValueModal from 'components/companyAdmin/dropdownOptions/editOptionValue/presentational/EditOptionValueModal';
import AddDocumentToOptionValueModal from 'components/companyAdmin/dropdownOptions/addDocumentToOptionValue/presentational/AddDocumentToOptionValueModal';
import EditOptionValueDocumentModal from 'components/companyAdmin/dropdownOptions/editOptionValueDocument/presentational/EditOptionValueDocumentModal';
import AddNewDocumentVersionModal from 'components/companyAdmin/dropdownOptions/addNewDocumentVersion/presentational/AddNewDocumentVersionModal';
import ConfirmDeleteDocumentVersionModalContainer from 'components/companyAdmin/dropdownOptions/confirmDeleteDocumentVersion/containers/ConfirmDeleteDocumentVersionModalContainer';
import EditCompanyAddressModalContainer from './EditCompanyAddressModalContainer';
import UploadUserGuideModalContainer from './UploadUserGuideModalContainer';
import AddNewFeatureModal from 'components/superAdmin/newFeatures/addNewFeatureModal/presentational/AddNewFeatureModal';
import EditNewFeatureModal from 'components/superAdmin/newFeatures/editNewFeatureModal/presentational/EditNewFeatureModal';
import RecentUpdateModal from 'components/companyAdmin/layout/header/presentational/RecentUpdateModal';
import ViewZonesModalContainer from 'components/companyAdmin/drawings/singleDrawing/containers/ViewZonesModalContainer';
import AddDrawingZoneModalContainer from 'components/companyAdmin/drawings/addDrawingZoneModal/containers/AddDrawingZoneModalContainer';
import ZoneDetailsModalContainer from 'components/companyAdmin/drawings/singleDrawing/containers/ZoneDetailsModalContainer';
import EditZoneModalContainer from 'components/companyAdmin/drawings/singleDrawing/containers/EditZoneModalContainer';
import AddCommentToInvoiceModalContainer from 'components/superAdmin/invoices/singleInvoice/containers/AddCommentToInvoiceModalContainer';
import AddCommentToContactSubmissionModalContainer from 'components/superAdmin/contactSubmissions/singleContactSubmission/containers/AddCommentToContactSubmissionModalContainer';
import OurSystemModalContainer from 'components/frontEnd/whyUseOurSystem/containers/OurSystemModalContainer';
import UserLatestSyncsModalContainer from 'components/superAdmin/companies/singleCompany/containers/UserLatestSyncsModalContainer';
import EditBannerNotificationModal from 'components/superAdmin/bannerNotifications/editBannerNotificationModal/presentational/EditBannerNotificationModal';
import AddBannerNotificationModal from 'components/superAdmin/bannerNotifications/addBannerNotifcationModel/presentational/AddBannerNotificationModal';
import UpdateReportLayoutModal from '../presentational/UpdateReportLayoutModal';
import ConfirmTwoFactorModal from '../presentational/ConfirmTwoFactorModal';
import ConfirmEmailModal from '../presentational/ConfirmEmailModal';
import RecoverUserModal from 'components/companyAdmin/userManagement/shared/modals/RecoverUserModal';
import ReactivateUserModal from 'components/companyAdmin/userManagement/operatives/inactiveOperatives/modals/ReactivateUserModal';
import DisableUserModal from 'components/companyAdmin/userManagement/shared/modals/DisableUserModal';
import EnableUserModal from 'components/companyAdmin/userManagement/shared/modals/EnableUserModal';
import ResendInviteModal from 'components/companyAdmin/userManagement/shared/modals/ResendInviteModal';
import AddDemoAccessCodesModal from 'components/superAdmin/demoAccessCodes/presentational/AddDemoAccessCodesModal';
import EditDemoAccessCodesModal from 'components/superAdmin/demoAccessCodes/presentational/EditDemoAccessCodesModal';
import DeleteDemoAccessCodesModal from 'components/superAdmin/demoAccessCodes/presentational/DeleteDemoAccessCodesModal';
import EnterDemoFullSiteModal from 'components/shared/demo-full-site/presentational/DemoFullSiteModal';
import EditCompanyOwnerModalContainer from 'components/superAdmin/companies/singleCompany/containers/EditCompanyOwnerModalContainer';
import RequestDeleteInvoiceModal from 'components/companyAdmin/invoices/requestDeleteInvoiceModal/RequestDeleteInvoiceModal';
import NewUserDocumentModal from 'components/companyAdmin/userManagement/documentsUploader/presentational/NewUserDocumentModal';
import GenerateTimesheetReportModal from 'components/companyAdmin/userManagement/operatives/timesheets/modals/GenerateTimesheetReport';
import ExpandedMediaModal from './ExpandedMediaModal';
import CreatePinTaskModal from 'components/companyAdmin/userManagement/pinTasks/createPinTaskModal/CreatePinTaskModal';
import EditPinTaskModal from 'components/companyAdmin/userManagement/pinTasks/editPinTaskModal/EditPinTaskModal';
import EditPinTaskSeriesModal from 'components/companyAdmin/userManagement/pinTasks/editPinTaskSeriesModal/EditPinTaskSeriesModal';
import ViewPinTaskModal from 'components/companyAdmin/userManagement/pinTasks/viewTaskNoteModal/ViewTaskNoteModal';

const MODAL_COMPONENTS = {
    [ADD_CARD]: AddCardModalContainer,
    [ADD_SERVICE_TO_SUBSCRIPTION]: AddServiceToSubscriptionModalContainer,
    [ADD_TEMPLATE]: AddTemplateModalContainer,
    [ADD_TEMPLATE_QUESTION]: AddTemplateQuestionModalContainer,
    [ADD_TEMPLATE_SECTION]: AddTemplateSectionModalContainer,
    [ADD_CONTACT_SUBMISSION_COMMENT]: AddCommentToContactSubmissionModalContainer,
    [ADMIN_CREATE_COMPANY_ADMIN]: AddCompanyAdminModalContainer,
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
    [DELETE_CONTACT_SUBMISSION]: DeleteContactSubmissionModalContainer,
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
    [ADD_BUILDINGS]: CreateBuildingsModal,
    [ADD_FLOORS]: CreateFloorsModal,
    [ADD_DRAWINGS]: AddDrawingsModal,
    [EDIT_SITE]: EditSiteModal,
    [EDIT_BUILDING]: EditBuildingModal,
    [EDIT_FLOOR]: EditFloorModal,
    [ADD_DROPDOWN_OPTION]: AddDropdownOptionModal,
    [EDIT_DROPDOWN_OPTION]: EditDropdownOptionModal,
    [TOGGLE_DROPDOWN_OPTION]: ToggleDropdownOptionModalContainer,
    [CREATE_COMPANY_ADMIN]: CreateCompanyAdminModal,
    [CREATE_OPERATIVE]: CreateOperativeModal,
    [LOADING_DATA]: LoadingDataModal,
    [UNLINK_DEVICE]: UnlinkDeviceModalContainer,
    [RESTRICT_ADMIN_PAYMENTS]: RestrictPaymentsModalContainer,
    [REVOKE_ADMIN_ACCESS]: RevokeAdminAccessModalContainer,
    [DOCUMENT_RESPONSE_AGREEANCE]: DocumentResponseAgreeanceModalContainer,
    [SINGLE_PIN_GENERATE_REPORT_SUCCESS]: SinglePinGenerateReportSuccessModalContainer,
    [CLIENT_SINGLE_PIN_GENERATE_REPORT_SUCCESS]: ClientSinglePinGenerateReportSuccessModalContainer,
    [SELECT_PIN_SCALE]: SelectPinScaleModalContainer,
    [SET_TEMPLATE_IMAGE]: SetImageModalContainer,
    [ADMIN_RECORD_PAYMENT]: RecordPaymentModalContainer,
    [ADMIN_CONFIRM_FREE_INVOICE]: ConfirmFreeInvoiceModalContainer,
    [ADMIN_EDIT_PAYMENT]: EditPaymentModalContainer,
    [ADMIN_DELETE_PAYMENT]: DeletePaymentModalContainer,
    [REMOVE_DRAWINGS_ACCESS]: RemoveUserDrawingsAccessModalContainer,
    [FORGOT_PASSWORD]: ForgotPasswordModalContainer,
    [ADD_CREDITS_TO_DRAWING]: AddCreditsToDrawingModal,
    [GENERATE_SOS_CODE]: SOSGenerationModal,
    [CONFIRM_MOVE_HIERARCHY_TO_COMPANY]: SiteManagementConfirmMoveModalContainer,
    [ADMIN_CONFIRM_SET_IS_INVOICE_PAID]: ConfirmSetIsInvoicePaidModalContainer,
    [ADMIN_DELETE_INVOICE]: SuperAdminConfirmDeleteInvoiceModalContainer,
    [ADMIN_RESTORE_INVOICE]: SuperAdminConfirmRestoreInvoiceModalContainer,
    [DELETE_INVOICE]: ConfirmDeleteInvoiceModalContainer,
    [REQUEST_DELETE_INVOICE]: RequestDeleteInvoiceModal,
    [ADD_MULTIPLE_SERVICES_TO_SUBSCRIPTION]: AddMulitpleServicesToSubscriptionModalContainer,
    [GENERATE_QR_CODES]: GenerateQRCodesModalContainer,
    [ADMIN_ADD_MANUFACTURER]: AdminAddManufacturerModal,
    [ADMIN_EDIT_MANUFACTURER]: AdminEditManufacturerModal,
    [ADMIN_ADD_OPTION_VALUE]: AdminAddOptionValueModal,
    [ADMIN_EDIT_OPTION_VALUE]: AdminEditOptionValueModal,
    [ADMIN_ADD_DOCUMENT_TO_OPTION_VALUE]: AdminAddDocumentToOptionValueModal,
    [ADMIN_EDIT_OPTION_VALUE_DOCUMENT]: AdminEditOptionValueDocumentModal,
    [ADMIN_ADD_OPTION_VALUE_DOCUMENT_VERSION]: AdminAddNewDocumentVersionModal,
    [DOCUMENT_VIEW]: DocumentViewModal,
    [ADMIN_DELETE_OPTION_VALUE_DOCUMENT_VERSION]: AdminConfirmDeleteDocumentVersionModalContainer,
    [COMPANY_ADD_MANUFACTURER]: AddManufacturerModal,
    [COMPANY_EDIT_MANUFACTURER]: EditManufacturerModal,
    [COMPANY_TOGGLE_MANUFACTURER]: ToggleManufacturerModalContainer,
    [COMPANY_TOGGLE_MANUFACTURER_OPTION_VALUE]: ToggleManufacturerOptionValueModalContainer,
    [COMPANY_ADD_OPTION_VALUE]: AddOptionValueModal,
    [COMPANY_EDIT_OPTION_VALUE]: EditOptionValueModal,
    [COMPANY_ADD_DOCUMENT_TO_OPTION_VALUE]: AddDocumentToOptionValueModal,
    [COMPANY_EDIT_OPTION_VALUE_DOCUMENT]: EditOptionValueDocumentModal,
    [COMPANY_ADD_OPTION_VALUE_DOCUMENT_VERSION]: AddNewDocumentVersionModal,
    [COMPANY_DELETE_OPTION_VALUE_DOCUMENT_VERSION]: ConfirmDeleteDocumentVersionModalContainer,
    [ADMIN_EDIT_COMPANY_ADDRESS]: EditCompanyAddressModalContainer,
    [UPLOAD_USER_GUIDE]: UploadUserGuideModalContainer,
    [ADD_NEW_FEATURE]: AddNewFeatureModal,
    [EDIT_NEW_FEATURE]: EditNewFeatureModal,
    [RECENT_UPDATE_MODAL]: RecentUpdateModal,
    [VIEW_ZONES]: ViewZonesModalContainer,
    [ADD_DRAWING_ZONE]: AddDrawingZoneModalContainer,
    [ZONE_DETAILS]: ZoneDetailsModalContainer,
    [EDIT_ZONE_MODAL]: EditZoneModalContainer,
    [ADD_INVOICE_COMMENT]: AddCommentToInvoiceModalContainer,
    [WHY_USE_OUR_SYSTEM]: OurSystemModalContainer,
    [ADMIN_LATEST_SYNCS]: UserLatestSyncsModalContainer,
    [ADD_NEW_BANNER_NOTIFICATION]: AddBannerNotificationModal,
    [EDIT_BANNER_NOTIFICATION]: EditBannerNotificationModal,
    [UPDATE_REPORT_LAYOUT]: UpdateReportLayoutModal,
    [CONFIRM_TWO_FACTOR]: ConfirmTwoFactorModal,
    [RECOVER_USER]: RecoverUserModal,
    [REACTIVATE_USER]: ReactivateUserModal,
    [DISABLE_USER]: DisableUserModal,
    [ENABLE_USER]: EnableUserModal,
    [RESEND_INVITE]: ResendInviteModal,
    [ADD_DEMO_ACCESS_CODES]: AddDemoAccessCodesModal,
    [EDIT_DEMO_ACCESS_CODES]: EditDemoAccessCodesModal,
    [DELETE_DEMO_ACCESS_CODES]: DeleteDemoAccessCodesModal,
    [ENTER_DEMO_ACCESS_CODES]: EnterDemoFullSiteModal,
    [ADMIN_EDIT_COMPANY_OWNER]: EditCompanyOwnerModalContainer,
    [CONFIRM_EMAIL]: ConfirmEmailModal,
    [USER_NEW_DOCUMENT]: NewUserDocumentModal,
    [GENERATE_TIMESHEET_REPORT]: GenerateTimesheetReportModal,
    [EXPANDED_MEDIA]: ExpandedMediaModal,
    [CREATE_PIN_TASK]: CreatePinTaskModal,
    [EDIT_PIN_TASK]: EditPinTaskModal,
    [EDIT_PIN_TASK_SERIES]: EditPinTaskSeriesModal,
    [FETCH_PIN_TASK]: ViewPinTaskModal,
};

const ModalRoot = ({ modalType, modalProps, ...otherProps }) => {
    if (!modalType) return null;
    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} {...otherProps} />;
};
const mapStateToProps = ({ shared: { modalReducer } }) => modalReducer;

const mapDispatchToProps = { hideModal, showModal };

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
