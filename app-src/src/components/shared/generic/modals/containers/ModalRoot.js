import React from 'react';
import { connect } from 'react-redux';

import {
    ADD_BUILDINGS,
    ADD_CARD,
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
    DELETE_CONTACT_SUBMISSION,
    DELETE_COMPANY_USER,
    DELETE_DOCUMENT,
    DELETE_CLIENT_FROM_DRAWING,
    DELETE_COMPANY_PERMISSIONS,
    DELETE_OPERATIVE,
    DOCUMENT_RESPONSE_AGREEANCE,
    EDIT_BUILDING,
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
    BOLSTER_PLUS_PAYMENT_ERROR,
    PAYMENT_SUCCESS,
    PIN_IMAGE,
    RENAME_TEMPLATE_SECTION,
    SET_LABEL_FIELDS,
    SUCCESS_MODAL,
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
    ADD_INVOICE_COMMENT,
    ADD_CONTACT_SUBMISSION_COMMENT,
    CONFIRM_MOVE_HIERARCHY_TO_COMPANY,
    ADMIN_CONFIRM_SET_IS_INVOICE_PAID,
    ADMIN_DELETE_INVOICE,
    ADMIN_RESTORE_INVOICE,
    ADD_MULTIPLE_SERVICES_TO_SUBSCRIPTION,
    GENERATE_QR_CODES,
    DOCUMENT_VIEW,
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
    CREATE_HIERARCHY_ALERT_MODAL,
    GENERATE_TIMESHEET_REPORT,
    EXPANDED_MEDIA,
    MESSAGE_CENTRE_DRAWING_EXPIRY,
    EDIT_ALERT_MODAL,
    DELETE_ALERT_MODAL,
    CREATE_NEW_OPERATIVE_ALERTS_MODAL,
    EDIT_FREE_CREDIT,
    UPLOAD_LIBRARY_DOCUMENT,
    SOFT_DELETE_LIBRARY_DOCUMENT,
    CREATE_LIBRARY_FOLDER,
    EDIT_LIBRARY_ITEMS,
    HARD_DELETE_LIBRARY_DOCUMENT,
    RESTORE_LIBRARY_DOCUMENTS,
    SELECT_DOCUMENT_LIBRARY_ITEM,
    CREATE_PIN_TASK,
    EDIT_PIN_TASK,
    FETCH_PIN_TASK,
    EDIT_PIN_TASK_SERIES,
    CREATE_JOB_REFERENCE,
    EDIT_JOB_REFERENCE,
    DRAWING_EXPIRY_MODAL,
    EDIT_USER_EMAIL,
    CONFIRM_DARK_THEME,
    CREATE_PIN_OPTIONS_SET_MODAL,
    CREATE_PIN_OPTIONS_VALUE_MODAL,
    CREATE_PRELIM_MODAL,
    EDIT_PRELIM_MODAL,
    EDIT_PIN_OPTIONS_SET_MODAL,
    EDIT_PIN_OPTIONS_VALUE_MODAL,
    CREATE_PIN_OPTION_DOCUMENTS_MODAL,
    EDIT_PIN_OPTION_DOCUMENTS_MODAL,
    CREATE_ADMIN_PIN_OPTIONS_SET_MODAL,
    EDIT_ADMIN_PIN_OPTIONS_SET_MODAL,
    EDIT_SITE_PIN_OPTION_SETS,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_MODAL,
    LINK_PRELIM_MODAL,
    EDIT_LINK_PRELIM_MODAL,
    CREATE_ADMIN_PIN_OPTIONS_VALUE_MODAL,
    EDIT_ADMIN_PIN_OPTIONS_VALUE_MODAL,
    DUPLICATE_PIN_OPTIONS_SET_MODAL,
    DUPLICATE_PIN_OPTIONS_VALUE_MODAL,
    MOVE_PIN_OPTION_MODAL,
    CREATE_ADMIN_PIN_OPTION_DOCUMENTS_MODAL,
    DUPLICATE_ADMIN_PIN_OPTIONS_SET_MODAL,
    DUPLICATE_ADMIN_PIN_OPTIONS_VALUE_MODAL,
    MERGE_PIN_OPTION_SETS_MODAL,
    QUICK_EDIT_OPTION_SET_MODAL,
    EDIT_ADMIN_PIN_OPTION_DOCUMENTS_MODAL,
    CREATE_PUSH_NOTIFICATION_MODAL,
    EDIT_PUSH_NOTIFICATION_MODAL,
    CREATE_ADMIN_PUSH_NOTIFICATION_MODAL,
    EDIT_ADMIN_PUSH_NOTIFICATION_MODAL,
    ADMIN_DISABLE_COMPANY,
    ADMIN_ENABLE_COMPANY,
    ADD_BOLSTER_PLUS,
    BOLSTER_PLUS_UPGRADE_MODAL,
    BUY_BOLSTER_PLUS_CONFIRMATION,
    DELETE_SHIFT,
    PAY_RATES_MODAL,
    AMEND_JOB_REFERENCE_MODAL,
    ADD_EXPENSE_TO_SHIFT,
} from 'constants/shared/modalTypes';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import AddCardModal from 'components/companyAdmin/subscription/cardManagement/addCardModal/presentational/AddCardModal';
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
import PayInvoiceModalContainer from 'components/companyAdmin/invoices/shared/payInvoiceModal/containers/PayInvoiceModalContainer';
import PaymentErrorModalContainer from './PaymentErrorModalContainer';
import PinPhotoModal from '../presentational/PinPhotoModal';
import RenameTemplateSectionModalContainer from 'components/superAdmin/templateBuilder/setSection/containers/EditTemplateSectionModalContainer';
import SuccessModal from '../presentational/SuccessModal';
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
import SiteManagementConfirmMoveModalContainer from 'components/superAdmin/siteManagement/moveTool/containers/MoveToolConfirmMoveModalContainer';
import ConfirmSetIsInvoicePaidModalContainer from 'components/superAdmin/invoices/confirmSetIsInvoicePaidModal/containers/ConfirmSetIsInvoicePaidModalContainer';
import SuperAdminConfirmDeleteInvoiceModalContainer from 'components/superAdmin/invoices/superAdminConfirmDeleteInvoiceModal/containers/SuperAdminConfirmDeleteInvoiceModalContainer';
import SuperAdminConfirmRestoreInvoiceModalContainer from 'components/superAdmin/invoices/superAdminConfirmRestoreInvoiceModal/containers/SuperAdminConfirmRestoreInvoiceModalContainer';
import AddCompanyAdminModalContainer from 'components/superAdmin/companies/singleCompany/containers/AddCompanyAdminModalContainer';
import GenerateQRCodesModalContainer from './GenerateQRCodesModalContainer';
import RestrictPaymentsModalContainer from './RestrictPaymentsModalContainer';
import DocumentViewModal from '../presentational/DocumentViewModal';
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
import CreateHierarchyAlertModal from 'components/shared/hierarchyAlert/createHierarchyAlertModal/CreateHierarchyAlertModal';
import GenerateTimesheetReportModal from 'components/companyAdmin/userManagement/operatives/timesheets/modals/GenerateTimesheetReport';
import ExpandedMediaModal from './ExpandedMediaModal';
import ExpiringDrawingsModal from 'components/companyAdmin/messages/messageCentre/listItems/ExpiringDrawingsModal';
import EditAlertModal from 'components/companyAdmin/upcomingAlerts/presentational/EditAlertModal';
import DeleteAlertModal from 'components/companyAdmin/upcomingAlerts/presentational/DeleteAlertModal';
import CreateNewOperativeAlertsModal from 'components/companyAdmin/operativeAlerts/modals/CreateNewOperativeAlertsModal';
import EditFreeCreditModal from './EditFreeCreditModalContainer';
import SelectDocumentLibraryItemModal from 'components/companyAdmin/companyDocuments/SelectDocumentLibraryItemModal';
import CreateDocumentFolderModal from 'components/companyAdmin/companyDocuments/createDocument/CreateDocumentFolderModal';
import CreateDocumentModal from 'components/companyAdmin/companyDocuments/createDocument/CreateDocumentModal';
import EditDocumentItemsModal from 'components/companyAdmin/companyDocuments/editDocument/EditDocumentItemsModal';
import CreatePinTaskModal from 'components/companyAdmin/userManagement/pinTasks/createPinTaskModal/CreatePinTaskModal';
import EditPinTaskModal from 'components/companyAdmin/userManagement/pinTasks/editPinTaskModal/EditPinTaskModal';
import EditPinTaskSeriesModal from 'components/companyAdmin/userManagement/pinTasks/editPinTaskSeriesModal/EditPinTaskSeriesModal';
import ViewPinTaskModal from 'components/companyAdmin/userManagement/pinTasks/viewTaskNoteModal/ViewTaskNoteModal';
import CreateJobReferenceModal from 'components/companyAdmin/userManagement/operatives/timesheets/jobReferences/modals/CreateJobReferenceModal';
import EditJobReferenceModal from 'components/companyAdmin/userManagement/operatives/timesheets/jobReferences/modals/EditJobReferenceModal';
import DrawingExpiryModal from '../presentational/DrawingExpiryModal';
import EditUserEmailModal from '../../../../superAdmin/users/editUsers/EditUserEmailModal';
import ConfirmDarkThemeModal from '../presentational/ConfirmDarkThemeModal';
import CreateOptionSetModal from 'components/companyAdmin/pinOptions/optionSets/modals/CreateOptionSetModal';
import CreateOptionValueModal from 'components/companyAdmin/pinOptions/optionValues/modals/CreateOptionValueModal';
import CreatePrelimModal from 'components/companyAdmin/pinOptions/prelims/modals/CreatePrelimModal';
import EditPrelimModal from 'components/companyAdmin/pinOptions/prelims/modals/EditPrelimModal';
import EditOptionSetModal from 'components/companyAdmin/pinOptions/optionSets/modals/EditOptionSetModal';
import EditOptionValueModal from 'components/companyAdmin/pinOptions/optionValues/modals/EditOptionValueModal';
import CreatePinOptionDocumentsModal from 'components/companyAdmin/pinOptions/optionDocuments/modals/CreatePinOptionDocumentsModal';
import EditPinOptionDocumentsModal from 'components/companyAdmin/pinOptions/optionDocuments/modals/EditPinOptionDocumentsModal';
import AdminCreateOptionSetModal from 'components/superAdmin/pinOptions/optionSets/modals/CreateOptionSetModal';
import AdminEditOptionSetModal from 'components/superAdmin/pinOptions/optionSets/modals/EditOptionSetModal';
import EditSitePinOptionSetsModal from '../../../../companyAdmin/sites/editSitePinOptionSets/presentational/EditSitePinOptionSetsModal';
import CreateCostingAndEstimatingPrelimModal from 'components/companyAdmin/costingAndEstimating/modals/CreateCostingAndEstimatingPrelimModal';
import EditLinkPrelimModal from 'components/companyAdmin/costingAndEstimating/modals/EditLinkPrelimModal';
import LinkPrelimModal from '../../../../companyAdmin/costingAndEstimating/modals/LinkPrelimModal';
import AdminCreateOptionValueModal from '../../../../superAdmin/pinOptions/optionValues/modals/CreateOptionValueModal';
import AdminEditOptionValueModal from '../../../../superAdmin/pinOptions/optionValues/modals/EditOptionValueModal';
import DuplicateOptionSetModal from 'components/companyAdmin/pinOptions/optionSets/modals/DuplicateOptionSetModal';
import DuplicateAdminOptionSetModal from 'components/superAdmin/pinOptions/optionSets/modals/DuplicateOptionSetModal';
import DuplicateOptionValueModal from 'components/companyAdmin/pinOptions/optionValues/modals/DuplicateOptionValueModal';
import MoveOptionValueModal from '../../../../companyAdmin/pinOptions/optionValues/modals/MoveOptionValueModal';
import AdminCreatePinOptionDocumentsModal from '../../../../superAdmin/pinOptions/optionDocuments/modals/CreatePinOptionDocumentsModal';
import AdminDuplicateOptionValueModal from '../../../../superAdmin/pinOptions/optionSets/modals/DuplicateOptionValueModal';
import MergeOptionSetsModal from 'components/companyAdmin/pinOptions/optionSets/modals/MergeOptionSetsModal';
import QuickEditOptionSetModal from 'components/companyAdmin/pinOptions/optionSets/modals/QuickEditOptionSetModal';
import AdminEditPinOptionDocumentsModal from 'components/superAdmin/pinOptions/optionDocuments/modals/EditPinOptionDocumentsModal';
import CreatePushNotificationModal from 'components/companyAdmin/pushNotifications/modals/CreatePushNotificationModal';
import EditPushNotificationModal from 'components/companyAdmin/pushNotifications/modals/EditPushNotificationModal';
import AdminCreatePushNotificationModal from 'components/superAdmin/pushNotifications/modals/CreatePushNotificationModal';
import AdminEditPushNotificationModal from 'components/superAdmin/pushNotifications/modals/EditPushNotificationModal';
import DisableCompanyModal from 'components/superAdmin/companies/shared/modals/DisableCompanyModal';
import EnableCompanyModal from 'components/superAdmin/companies/shared/modals/EnableCompanyModal';
import AddBolsterPlusModal from 'components/companyAdmin/subscription/addOns/modals/AddBolsterPlusModal';
import BolsterPlusUpgradeModal from '../presentational/BolsterPlusUpgradeModal';
import BuyBolsterPlusConfirmationModal from 'components/companyAdmin/subscription/addOns/modals/BuyBolsterPlusConfirmationModal';
import BolsterPlusPaymentErrorModal from 'components/companyAdmin/subscription/addOns/modals/BolsterPlusPaymentErrorModal';
import ConfirmDeleteShiftModalContainer from './ConfirmDeleteShiftModalContainer';
import PayRatesModal from '../../../../companyAdmin/userManagement/operatives/timesheets/wages/modals/PayRatesModal';
import AmendJobReferenceModal from 'components/companyAdmin/userManagement/operatives/timesheets/modals/AmendJobReferenceModal';
import AddExpenseToShiftModalContainer from './AddExpenseToShiftModalContainer';

const MODAL_COMPONENTS = {
    [ADD_CARD]: AddCardModal,
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
    [PAY_INVOICE]: PayInvoiceModalContainer,
    [PAYMENT_ERROR]: PaymentErrorModalContainer,
    [BOLSTER_PLUS_PAYMENT_ERROR]: BolsterPlusPaymentErrorModal,
    [PAYMENT_SUCCESS]: PaymentSuccessModalContainer,
    [PIN_IMAGE]: PinPhotoModal,
    [RENAME_TEMPLATE_SECTION]: RenameTemplateSectionModalContainer,
    [COPY_TEMPLATE]: CopyTemplateModalContainer,
    [SUCCESS_MODAL]: SuccessModal,
    [EDIT_DRAWING]: EditDrawingModalContainer,
    [CONFIRM_EDIT_PIN]: ConfirmEditPinModalContainer,
    [ADD_SITE]: AddSiteModal,
    [ADD_BUILDINGS]: CreateBuildingsModal,
    [ADD_FLOORS]: CreateFloorsModal,
    [ADD_DRAWINGS]: AddDrawingsModal,
    [EDIT_SITE]: EditSiteModal,
    [EDIT_BUILDING]: EditBuildingModal,
    [EDIT_FLOOR]: EditFloorModal,
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
    [CONFIRM_MOVE_HIERARCHY_TO_COMPANY]: SiteManagementConfirmMoveModalContainer,
    [ADMIN_CONFIRM_SET_IS_INVOICE_PAID]: ConfirmSetIsInvoicePaidModalContainer,
    [ADMIN_DELETE_INVOICE]: SuperAdminConfirmDeleteInvoiceModalContainer,
    [ADMIN_RESTORE_INVOICE]: SuperAdminConfirmRestoreInvoiceModalContainer,
    [REQUEST_DELETE_INVOICE]: RequestDeleteInvoiceModal,
    [ADD_MULTIPLE_SERVICES_TO_SUBSCRIPTION]: AddMulitpleServicesToSubscriptionModalContainer,
    [GENERATE_QR_CODES]: GenerateQRCodesModalContainer,
    [DOCUMENT_VIEW]: DocumentViewModal,
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
    [ADMIN_DISABLE_COMPANY]: DisableCompanyModal,
    [ADMIN_ENABLE_COMPANY]: EnableCompanyModal,
    [CONFIRM_EMAIL]: ConfirmEmailModal,
    [USER_NEW_DOCUMENT]: NewUserDocumentModal,
    [CREATE_HIERARCHY_ALERT_MODAL]: CreateHierarchyAlertModal,
    [GENERATE_TIMESHEET_REPORT]: GenerateTimesheetReportModal,
    [ADD_EXPENSE_TO_SHIFT]: AddExpenseToShiftModalContainer,
    [DELETE_SHIFT]: ConfirmDeleteShiftModalContainer,
    [EXPANDED_MEDIA]: ExpandedMediaModal,
    [MESSAGE_CENTRE_DRAWING_EXPIRY]: ExpiringDrawingsModal,
    [EDIT_ALERT_MODAL]: EditAlertModal,
    [DELETE_ALERT_MODAL]: DeleteAlertModal,
    [CREATE_NEW_OPERATIVE_ALERTS_MODAL]: CreateNewOperativeAlertsModal,
    [EDIT_FREE_CREDIT]: EditFreeCreditModal,
    [UPLOAD_LIBRARY_DOCUMENT]: CreateDocumentModal,
    [SOFT_DELETE_LIBRARY_DOCUMENT]: ConfirmDeleteModal,
    [HARD_DELETE_LIBRARY_DOCUMENT]: ConfirmDeleteModal,
    [CREATE_LIBRARY_FOLDER]: CreateDocumentFolderModal,
    [EDIT_LIBRARY_ITEMS]: EditDocumentItemsModal,
    [RESTORE_LIBRARY_DOCUMENTS]: ConfirmSubmitModal,
    [SELECT_DOCUMENT_LIBRARY_ITEM]: SelectDocumentLibraryItemModal,
    [CREATE_PIN_TASK]: CreatePinTaskModal,
    [EDIT_PIN_TASK]: EditPinTaskModal,
    [EDIT_PIN_TASK_SERIES]: EditPinTaskSeriesModal,
    [FETCH_PIN_TASK]: ViewPinTaskModal,
    [CREATE_JOB_REFERENCE]: CreateJobReferenceModal,
    [EDIT_JOB_REFERENCE]: EditJobReferenceModal,
    [DRAWING_EXPIRY_MODAL]: DrawingExpiryModal,
    [EDIT_USER_EMAIL]: EditUserEmailModal,
    [CONFIRM_DARK_THEME]: ConfirmDarkThemeModal,
    [CREATE_PIN_OPTIONS_SET_MODAL]: CreateOptionSetModal,
    [CREATE_PIN_OPTIONS_VALUE_MODAL]: CreateOptionValueModal,
    [CREATE_PIN_OPTION_DOCUMENTS_MODAL]: CreatePinOptionDocumentsModal,
    [CREATE_PRELIM_MODAL]: CreatePrelimModal,
    [EDIT_PRELIM_MODAL]: EditPrelimModal,
    [EDIT_PIN_OPTIONS_SET_MODAL]: EditOptionSetModal,
    [EDIT_PIN_OPTIONS_VALUE_MODAL]: EditOptionValueModal,
    [EDIT_PIN_OPTION_DOCUMENTS_MODAL]: EditPinOptionDocumentsModal,
    [CREATE_ADMIN_PIN_OPTIONS_SET_MODAL]: AdminCreateOptionSetModal,
    [EDIT_ADMIN_PIN_OPTIONS_SET_MODAL]: AdminEditOptionSetModal,
    [CREATE_ADMIN_PIN_OPTIONS_VALUE_MODAL]: AdminCreateOptionValueModal,
    [EDIT_ADMIN_PIN_OPTIONS_VALUE_MODAL]: AdminEditOptionValueModal,
    [EDIT_SITE_PIN_OPTION_SETS]: EditSitePinOptionSetsModal,
    [CREATE_COSTING_AND_ESTIMATING_PRELIM_MODAL]: CreateCostingAndEstimatingPrelimModal,
    [LINK_PRELIM_MODAL]: LinkPrelimModal,
    [EDIT_LINK_PRELIM_MODAL]: EditLinkPrelimModal,
    [DUPLICATE_PIN_OPTIONS_SET_MODAL]: DuplicateOptionSetModal,
    [DUPLICATE_PIN_OPTIONS_VALUE_MODAL]: DuplicateOptionValueModal,
    [DUPLICATE_ADMIN_PIN_OPTIONS_VALUE_MODAL]: AdminDuplicateOptionValueModal,
    [DUPLICATE_ADMIN_PIN_OPTIONS_SET_MODAL]: DuplicateAdminOptionSetModal,
    [MOVE_PIN_OPTION_MODAL]: MoveOptionValueModal,
    [CREATE_ADMIN_PIN_OPTION_DOCUMENTS_MODAL]: AdminCreatePinOptionDocumentsModal,
    [MERGE_PIN_OPTION_SETS_MODAL]: MergeOptionSetsModal,
    [QUICK_EDIT_OPTION_SET_MODAL]: QuickEditOptionSetModal,
    [EDIT_ADMIN_PIN_OPTION_DOCUMENTS_MODAL]: AdminEditPinOptionDocumentsModal,
    [CREATE_PUSH_NOTIFICATION_MODAL]: CreatePushNotificationModal,
    [EDIT_PUSH_NOTIFICATION_MODAL]: EditPushNotificationModal,
    [CREATE_ADMIN_PUSH_NOTIFICATION_MODAL]: AdminCreatePushNotificationModal,
    [EDIT_ADMIN_PUSH_NOTIFICATION_MODAL]: AdminEditPushNotificationModal,
    [ADD_BOLSTER_PLUS]: AddBolsterPlusModal,
    [BOLSTER_PLUS_UPGRADE_MODAL]: BolsterPlusUpgradeModal,
    [BUY_BOLSTER_PLUS_CONFIRMATION]: BuyBolsterPlusConfirmationModal,
    [PAY_RATES_MODAL]: PayRatesModal,
    [AMEND_JOB_REFERENCE_MODAL]: AmendJobReferenceModal,
};

const ModalRoot = ({ modalType, modalProps, ...otherProps }) => {
    if (!modalType) return null;
    const SpecificModel = MODAL_COMPONENTS[modalType];
    return <SpecificModel {...modalProps} {...otherProps} />;
};

const mapStateToProps = ({ shared: { modalReducer } }) => modalReducer;

const mapDispatchToProps = { hideModal, showModal };

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
