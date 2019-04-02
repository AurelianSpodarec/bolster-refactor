import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADD_TEMPLATE } from 'constants/modalTypes';
import { showModal } from 'actions/generic/modals/sync/showModal';
import TemplateBuilderHeader from '../presentational/TemplateBuilderHeader';

const TemplateBuilderHeaderContainer = ({
    showTemplateForm,
    uuid,
    companyID,
    template: { name = '' }
}) => (
    <TemplateBuilderHeader
        showTemplateForm={() => showTemplateForm(uuid, companyID)}
        name={name}
    />
);

const mapStateToProps = (
    { templatesReducer: { templates } },
    { match: { params } }
) => ({
    template: templates[params['uuid']] || {},
    uuid: params['uuid'],
    companyID: params['companyID']
});

const mapDispatchToProps = dispatch => ({
    showTemplateForm: (uuid, companyID) => {
        dispatch(showModal(ADD_TEMPLATE, { uuid, companyID }));
    }
});

const HeaderWithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderHeaderContainer);

export default withRouter(HeaderWithConnect);
