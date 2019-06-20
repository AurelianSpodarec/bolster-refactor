import React from 'react';
import { connect } from 'react-redux';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditFloorFormContainer from '../containers/EditFloorFormContainer';

const EditFloorModal = ({ floor, isUsingBolsterLabels }) => (
    <ModalOuterContainer
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <BlockHeading title={`Edit Floor - ${floor.name}`} />
        <EditFloorFormContainer
            floor={floor}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    </ModalOuterContainer>
);

const mapStateToProps = ({ companyAdmin: { companySettingsReducer } }) => ({
    isUsingBolsterLabels: companySettingsReducer.isUsingBolsterLabels
});

export default connect(mapStateToProps)(EditFloorModal);
