import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    ADD_TEMPLATE_SECTION,
    SUCCESS_MODAL,
    ERROR_MODAL
} from 'constants/shared/modalTypes';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';
import fetchAllServices from 'actions/superAdmin/services/async/fetchAllServices';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import fetchSingleCompany from 'actions/superAdmin/companies/async/fetchSingleCompany';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import resetSaveRequired from 'actions/superAdmin/templateBuilder/sync/resetSaveRequired';

import TemplateBuilder from '../presentational/TemplateBuilder';

class TemplateBuilderContainer extends Component {
    render() {
        const {
            showAddSectionModal,
            uuid,
            saveRequired,
            isExisting
        } = this.props;
        return (
            <TemplateBuilder
                isExisting={isExisting}
                saveRequired={saveRequired}
                showAddSectionModal={() => showAddSectionModal(uuid)}
            />
        );
    }

    componentDidMount() {
        const { resetSaveRequired, fetchPageData, templateUUID } = this.props;
        if (!/-/.test(templateUUID)) {
            resetSaveRequired();
        }
        fetchPageData(templateUUID);
    }

    componentDidUpdate({
        postSuccess: prevPostSuccess,
        isPosting: prevIsPosting
    }) {
        const {
            postSuccess,
            isPosting,
            showModal,
            error,
            curUrl,
            templateUUID,
            updatedTemplateUUID,
            history,
            hideModal
        } = this.props;
        if (!prevPostSuccess && postSuccess) {
            const message = 'Template saved successfully.';
            showModal(SUCCESS_MODAL, { message, hideModal });

            if (templateUUID !== updatedTemplateUUID) {
                const redirectUrl = curUrl.replace(
                    templateUUID,
                    updatedTemplateUUID
                );

                history.replace(redirectUrl);
            }
        }
        if (prevIsPosting && !isPosting && error) {
            const message = `An error occurred while saving your template. ${error ||
                'Please try again.'}`;
            showModal(ERROR_MODAL, { message });
        }
    }
}

const mapStateToProps = (
    { superAdmin: { templatesReducer } },
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
    isExisting: !!templatesReducer.templates[params.uuid]
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
        dispatch(fetchTemplate(templateUUID));
        dispatch(fetchAllServices());
        dispatch(fetchSingleCompany(companyID));
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderContainer);

export default withRouter(WithConnect);
