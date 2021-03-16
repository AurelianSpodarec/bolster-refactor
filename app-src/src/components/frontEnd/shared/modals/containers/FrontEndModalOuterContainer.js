import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import FrontEndModalOuter from '../presentational/FrontEndModalOuter';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';

const FrontEndModalOuterContainer = ({ extraClasses, children, hideCloseButton, hideModal }) => {
    return (
        <FrontEndModalOuter
            handleClose={handleClose}
            extraClasses={extraClasses}
            hideCloseButton={hideCloseButton}
        >
            {children}
        </FrontEndModalOuter>
    );
    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};

const mapDispatchToProps = {
    hideModal,
    updateHierarchyAddState,
};

export default connect(null, mapDispatchToProps)(FrontEndModalOuterContainer);
