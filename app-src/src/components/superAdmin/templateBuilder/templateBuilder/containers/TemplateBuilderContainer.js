import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    ADD_TEMPLATE_SECTION,
    SUCCESS_MODAL,
    ERROR_MODAL
} from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import resetSaveRequired from 'actions/superAdmin/templateBuilder/sync/resetSaveRequired';

import TemplateBuilder from '../presentational/TemplateBuilder';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';

class TemplateBuilderContainer extends Component {
    render() {
        const {
            showAddSectionModal,
            uuid,
            saveRequired,
            isExisting
        } = this.props;
        return (
            <>
                <TemplateBuilder
                    isExisting={isExisting}
                    saveRequired={saveRequired}
                    showAddSectionModal={() => showAddSectionModal(uuid)}
                />
            </>
        );
    }

    componentDidMount() {
        const { resetSaveRequired, fetchPageData, templateUUID } = this.props;
        resetSaveRequired();
        fetchPageData(templateUUID);
    }

    componentDidUpdate({ postSuccess: prevPostSuccess, prevIsPosting }) {
        const {
            postSuccess,
            isPosting,
            showModal,
            error,
            curUrl,
            templateUUID,
            updatedTemplateUUID,
            history
        } = this.props;
        if (!prevPostSuccess && postSuccess) {
            const message = 'Template saved successfully.';
            showModal(SUCCESS_MODAL, { message });

            if (templateUUID !== updatedTemplateUUID) {
                const redirectUrl = curUrl.replace(
                    templateUUID,
                    updatedTemplateUUID
                );

                history.replace(redirectUrl);
            }
        }
        if (prevIsPosting && !isPosting && error) {
            showModal(ERROR_MODAL);
        }
    }
}

const mapStateToProps = (
    { superAdmin: { templatesReducer } },
    { match: { params, url } }
) => ({
    curUrl: url,
    templateUUID: params.uuid,
    postSuccess: templatesReducer.postSuccess,
    isPosting: templatesReducer.isPosting,
    error: templatesReducer.error,
    updatedTemplateUUID: templatesReducer.updatedTemplateUUID,
    saveRequired: templatesReducer.saveRequired,
    uuid: params.uuid,
    isExisting: !!templatesReducer.templates[params.uuid]
});

const mapDispatchToProps = dispatch => ({
    showAddSectionModal: templateUUID => {
        dispatch(showModal(ADD_TEMPLATE_SECTION, { templateUUID }));
    },
    resetSaveRequired: () => {
        dispatch(resetSaveRequired());
    },
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    },
    fetchPageData: templateUUID => {
        dispatch(fetchTemplate(templateUUID));
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderContainer);

export default withRouter(WithConnect);
