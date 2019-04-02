import React from 'react';
import { connect } from 'react-redux';

import { ADD_TEMPLATE_SECTION } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import TemplateBuilder from '../presentational/TemplateBuilder';

const TemplateBuilderContainer = ({ showAddSectionModal }) => (
    <TemplateBuilder showAddSectionModal={showAddSectionModal} />
);

const mapDispatchToProps = dispatch => ({
    showAddSectionModal: () => {
        dispatch(showModal(ADD_TEMPLATE_SECTION));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(TemplateBuilderContainer);
