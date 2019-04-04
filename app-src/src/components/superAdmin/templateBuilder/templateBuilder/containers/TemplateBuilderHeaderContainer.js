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
    template
}) => {
    return (
        <TemplateBuilderHeader
            showTemplateForm={showTemplateForm}
            name={template.name}
        />
    );

    function showTemplateForm() {
        !template.uuid
            ? showAddTemplateForm(uuid, companyID)
            : showEditTemplateForm(template);
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates }
        }
    },
    { match: { params } }
) => ({
    template: templates[params['uuid']] || {},
    uuid: params['uuid'],
    companyID: params['companyID']
});

const mapDispatchToProps = dispatch => ({
    showAddTemplateForm: (uuid, companyID) => {
        dispatch(showModal(ADD_TEMPLATE, { uuid, companyID }));
    },
    showEditTemplateForm: template => {
        dispatch(showModal(EDIT_TEMPLATE, { template }));
    }
});

const HeaderWithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderHeaderContainer);

export default withRouter(HeaderWithConnect);
