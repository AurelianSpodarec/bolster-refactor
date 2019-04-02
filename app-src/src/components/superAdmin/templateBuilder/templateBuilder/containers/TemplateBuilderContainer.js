import React from 'react';
import { connect } from 'react-redux';

import { ADD_TEMPLATE_SECTION } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import TemplateBuilder from '../presentational/TemplateBuilder';

const TemplateBuilderContainer = ({ showAddSectionModal, uuid }) => {
    return (
        <TemplateBuilder
            showAddSectionModal={() => showAddSectionModal(uuid)}
        />
    );
};

const mapDispatchToProps = dispatch => ({
    showAddSectionModal: templateUuid => {
        dispatch(showModal(ADD_TEMPLATE_SECTION, { templateUuid }));
    }
});

export default connect(
    (_, { match }) => ({
        uuid: match.params.uuid
    }),
    mapDispatchToProps
)(TemplateBuilderContainer);
