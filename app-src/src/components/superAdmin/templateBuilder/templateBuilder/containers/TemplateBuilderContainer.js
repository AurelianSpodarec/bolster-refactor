import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADD_TEMPLATE_SECTION, SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import resetSaveRequired from 'actions/superAdmin/templateBuilder/sync/resetSaveRequired';

import TemplateBuilder from '../presentational/TemplateBuilder';
import { isEmpty } from 'helpers/generic';
import fetchTemplateForCompany from 'actions/superAdmin/companies/async/fetchTemplateForCompany';
import deleteTemplate from 'actions/superAdmin/templateBuilder/async/deleteTemplate';

class TemplateBuilderContainer extends Component {
    render() {
        const {
            showAddSectionModal,
            uuid,
            saveRequired,
            isExisting,
            templateUUID,
            companyID
        } = this.props;
        return (
            <TemplateBuilder
                isExisting={isExisting}
                saveRequired={saveRequired}
                showAddSectionModal={() => showAddSectionModal(uuid)}
                templateUUID={templateUUID}
                companyID={companyID}
            />
        );
    }

    componentDidMount() {
        const {
            // resetSaveRequired,
            fetchPageData,
            templateUUID,
            labelFields
        } = this.props;
        if (!/-/.test(templateUUID)) {
            // resetSaveRequired();
        }
        if (isEmpty(labelFields)) fetchPageData(templateUUID);
    }

    componentDidUpdate({
        postSuccess: prevPostSuccess,
        template: prevTemplate,
        isPosting: prevIsPosting,
        deleteUnavailable: prevDeleteUnavailable,
        error: prevError
    }) {
        const {
            postSuccess,
            isPosting,
            showModal,
            error,
            isExisting,
            curUrl,
            templateUUID,
            updatedTemplateUUID,
            history,
            hideModal,
            template,
            companyID,
            deleteUnavailable
        } = this.props;
        if (!prevPostSuccess && postSuccess) {
            const message = 'Template saved successfully.';
            showModal(SUCCESS_MODAL, { message, hideModal });

            if (templateUUID !== updatedTemplateUUID) {
                const redirectUrl = curUrl.replace(templateUUID, updatedTemplateUUID);
                history.replace(redirectUrl);
            }
        }
        if (prevIsPosting && !isPosting && error) {
            const message = `An error occurred while saving your template. ${error ||
                'Please try again.'}`;
            showModal(ERROR_MODAL, { message });
        }
        if (!!template && template.isDeleted && (!!prevTemplate && !prevTemplate.isDeleted)) {
            const message = 'Template deleted successfully';
            showModal(SUCCESS_MODAL, { message });
            history.replace(`/admin/companies/${companyID}`);
        }

        if (error && !isExisting && !prevError) {
            history.replace('/404');
        }

        if (!!deleteUnavailable && !prevDeleteUnavailable) {
            const message = deleteUnavailable;
            showModal(ERROR_MODAL, { message });
        }
    }
}

const mapStateToProps = (
    { superAdmin: { templatesReducer, templateLabelFieldsReducer } },
    { match: { params, url } }
) => ({
    curUrl: url,
    companyID: params.companyID,
    templateUUID: params.uuid,
    postSuccess: templatesReducer.postSuccess,
    isPosting: templatesReducer.isPosting,
    error: templatesReducer.error,
    updatedTemplateUUID: templatesReducer.updatedTemplateUUID,
    saveRequired: templatesReducer.saveRequired,
    uuid: params.uuid,
    isExisting: !!templatesReducer.templates[params.uuid],
    template: templatesReducer.templates[params.uuid],
    labelFields: Object.values(templateLabelFieldsReducer.labelFields).filter(({ templateUUID }) =>
        String(templateUUID === params.uuid)
    ),
    deleteUnavailable: templatesReducer.deleteUnavailable
});

const mapDispatchToProps = (
    dispatch,
    {
        match: {
            params: { companyID }
        }
    }
) => ({
    showAddSectionModal: templateUUID =>
        dispatch(showModal(ADD_TEMPLATE_SECTION, { templateUUID, companyID })),

    resetSaveRequired: () => dispatch(resetSaveRequired()),

    showModal: (type, props) => dispatch(showModal(type, props)),

    hideModal: () => dispatch(hideModal()),

    fetchPageData: templateUUID => {
        dispatch(fetchTemplateForCompany(companyID, templateUUID));
        dispatch(fetchAllServices());
        dispatch(fetchSingleCompany(companyID));
    },

    deleteTemplate: templateUUID => dispatch(deleteTemplate(templateUUID))
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderContainer);

export default withRouter(WithConnect);
