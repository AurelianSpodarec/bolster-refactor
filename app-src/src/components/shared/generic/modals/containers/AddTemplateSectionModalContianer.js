import React from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/generic/modals/sync/hideModal';

import AddTemplateSectionModal from '../presentational/AddTemplateSectionModal';

const AddTemplateSectionModalContianer = () => (
    <AddTemplateSectionModal
        hideModal={e => {
            e.preventDefualt();
            this.props.dispatch(hideModal());
        }}
    />
);

export default connect()(AddTemplateSectionModalContianer);
