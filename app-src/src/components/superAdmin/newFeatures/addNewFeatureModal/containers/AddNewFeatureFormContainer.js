import React from 'react';

import { connect } from 'react-redux';

import AddNewFeatureForm from '../presentational/AddNewFeatureForm';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

function AddNewFeatureFormContainer() {
    return <AddNewFeatureForm />;
}

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(AddNewFeatureFormContainer);
