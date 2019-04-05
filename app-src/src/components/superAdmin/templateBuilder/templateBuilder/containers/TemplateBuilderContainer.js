import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    ADD_TEMPLATE_SECTION,
    SUCCESS_MODAL
} from 'constants/shared/modalTypes';
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
        const { resetSaveRequired } = this.props;
        resetSaveRequired();
    }

    componentDidUpdate({ postSuccess: prevPostSuccess }) {
        const {
            postSuccess,
            showModal,
            curUrl,
            templateUuid,
            history,
            updatedTemplateUUID
        } = this.props;
        if (!prevPostSuccess && postSuccess) {
            const message = 'Template saved successfully.';
            showModal(SUCCESS_MODAL, { message });
            history.replace(curUrl.replace(templateUuid, updatedTemplateUUID));
        }
    }
}

const mapStateToProps = (
    { superAdmin: { templatesReducer } },
    { match: { params, url } }
) => ({
    curUrl: url,
    templateUuid: params.uuid,
    postSuccess: templatesReducer.postSuccess,
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
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderContainer);

export default withRouter(WithConnect);
