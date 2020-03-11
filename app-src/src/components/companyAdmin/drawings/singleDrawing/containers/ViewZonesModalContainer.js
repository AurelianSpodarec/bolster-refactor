import React from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import ViewZonesModal from '../presentational/ViewZonesModal';

const ViewZonesModalContainer = ({ hideModal, drawing }) => {
    return <ViewZonesModal hideModal={hideModal} />;
};

const mapDispatchToProps = {
    hideModal,
};

export default connect(null, mapDispatchToProps)(ViewZonesModalContainer);

