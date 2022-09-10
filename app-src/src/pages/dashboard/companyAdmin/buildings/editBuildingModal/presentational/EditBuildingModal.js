import React from 'react';
import { connect } from 'react-redux';

import EditBuildingFormContainer from '../containers/EditBuildingFormContainer';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const EditBuildingModal = ({ building, isUsingBolsterLabels }) => (
    <FlexModalOuter
        title={`Edit Building - ${building.name}`}
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <EditBuildingFormContainer
            building={building}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
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

export default connect(mapStateToProps)(EditBuildingModal);
