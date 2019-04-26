import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADD_TEMPLATE, EDIT_TEMPLATE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import TemplateBuilderHeader from '../presentational/TemplateBuilderHeader';

const TemplateBuilderHeaderContainer = ({
    showAddTemplateForm,
    showEditTemplateForm,
    uuid,
    companyID,
    template,
    isExisting,
    showAddSectionModal,
    serviceName
}) => {
    return (
        <TemplateBuilderHeader
            showTemplateForm={showTemplateForm}
            name={template.name}
            serviceName={serviceName}
        >
            {isExisting && (
                <button onClick={showAddSectionModal} className="button blue">
                    <i className="fa fa-plus" /> Add Section
                </button>
            )}
        </TemplateBuilderHeader>
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
            templatesReducer: { templates },
            servicesReducer: { services }
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
        template,
        uuid,
        companyID,
        serviceName: services && template ? service.name : ''
    };
};

const mapDispatchToProps = dispatch => ({
    showAddTemplateForm: (uuid, companyID) => {
        dispatch(showModal(ADD_TEMPLATE, { uuid, companyID }));
    },
    showEditTemplateForm: (template, companyID) => {
        dispatch(showModal(EDIT_TEMPLATE, { template, companyID }));
    }
});

const HeaderWithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderHeaderContainer);

export default withRouter(HeaderWithConnect);
