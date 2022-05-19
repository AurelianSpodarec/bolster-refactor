import React from 'react';
import { connect } from 'react-redux';

import EditFloorFormContainer from '../containers/EditFloorFormContainer';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const EditFloorModal = ({ floor, isUsingBolsterLabels }) => (
    <FlexModalOuter
        title={`Edit Floor - ${floor.name}`}
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <EditFloorFormContainer floor={floor} isUsingBolsterLabels={isUsingBolsterLabels} />
    </FlexModalOuter>
);

const mapStateToProps = ({
    companyAdmin: {
        companySettingsReducer: {
            companySettings: { isUsingBolsterLabels },
        },
    },
}) => ({
    isUsingBolsterLabels,
});

export default connect(mapStateToProps)(EditFloorModal);
