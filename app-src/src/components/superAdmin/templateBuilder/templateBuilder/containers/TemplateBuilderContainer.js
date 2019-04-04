import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADD_TEMPLATE_SECTION } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import TemplateBuilder from '../presentational/TemplateBuilder';
import resetSaveRequired from 'actions/superAdmin/templateBuilder/sync/resetSaveRequired';

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
}

const mapStateToProps = (
    { superAdmin: { templatesReducer } },
    { match: { params } }
) => ({
    saveRequired: templatesReducer.saveRequired,
    uuid: params.uuid,
    isExisting: !!templatesReducer.templates[params.uuid]
});

const mapDispatchToProps = dispatch => ({
    showAddSectionModal: templateUuid => {
        dispatch(showModal(ADD_TEMPLATE_SECTION, { templateUuid }));
    },
    resetSaveRequired: () => {
        dispatch(resetSaveRequired());
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderContainer);

export default withRouter(WithConnect);
