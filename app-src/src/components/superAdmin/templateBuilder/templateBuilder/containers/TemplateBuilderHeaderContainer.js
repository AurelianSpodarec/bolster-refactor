import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADD_TEMPLATE, EDIT_TEMPLATE, CONFIRM_DELETE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import TemplateBuilderHeader from '../presentational/TemplateBuilderHeader';
import postTemplate from 'actions/superAdmin/templateBuilder/async/postTemplate';
import deleteTemplate from 'actions/superAdmin/templateBuilder/async/deleteTemplate';

const TemplateBuilderHeaderContainer = ({
    showAddTemplateForm,
    showEditTemplateForm,
    uuid,
    companyID,
    template,
    isExisting,
    showAddSectionModal,
    serviceName,
    templateUUID,
    showDeleteTemplateForm,
    error
}) => {
    return (
        <TemplateBuilderHeader
            error={error}
            showTemplateForm={showTemplateForm}
            name={template.name}
            serviceName={serviceName}
            showAddSectionModal={showAddSectionModal}
            isExisting={isExisting}
            templateUUID={templateUUID}
            companyID={companyID}
            showDeleteTemplateForm={showDeleteTemplateForm}
        />
    );

    function showTemplateForm() {
        !template.uuid
            ? showAddTemplateForm(uuid, companyID)
            : showEditTemplateForm(template, companyID);
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates, error },
            adminServicesReducer: { adminServices: services }
        }
    },
    {
        match: {
            params: { uuid, companyID }
        }
    }
) => {
    const template = templates[uuid] || { serviceID: '' };
    const service = services[template.serviceID] || {};
    return {
        template: templates[uuid] || { serviceID: '' },
        uuid,
        companyID,
        serviceName: services && template ? service.name : '',
        error
    };
};

const mapDispatchToProps = dispatch => ({
    showAddTemplateForm: (uuid, companyID) => {
        dispatch(showModal(ADD_TEMPLATE, { uuid, companyID }));
    },
    showEditTemplateForm: (template, companyID) => {
        dispatch(showModal(EDIT_TEMPLATE, { template, companyID }));
    },
    showDeleteTemplateForm: templateUUID => {
        const handleDelete = () => dispatch(deleteTemplate(templateUUID));
        const message = 'Are you sure you want to delete this template?';
        const hideModal = () => dispatch(hideModal());
        dispatch(showModal(CONFIRM_DELETE, { handleDelete, message, hideModal }));
    },
    postTemplate: postBody => dispatch(postTemplate(postBody))
});

const HeaderWithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderHeaderContainer);

export default withRouter(HeaderWithConnect);
