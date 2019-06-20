import React from 'react';
import { connect } from 'react-redux';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import EditBuildingFormContainer from '../containers/EditBuildingFormContainer';

const EditBuildingModal = ({ building, isUsingBolsterLabels }) => (
    <ModalOuterContainer
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <BlockHeading title={`Edit Building - ${building.name}`} />
        <EditBuildingFormContainer
            building={building}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    </ModalOuterContainer>
);

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels }
        }
    }
}) => ({
    isUsingBolsterLabels
});

export default connect(mapStateToProps)(EditBuildingModal);
