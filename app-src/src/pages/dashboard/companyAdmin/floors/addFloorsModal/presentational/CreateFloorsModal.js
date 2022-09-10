import React from 'react';
import { connect } from 'react-redux';

import CreateFloorsFormContainer from '../containers/CreateFloorsFormContainer';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const CreateFloorsModal = ({ buildingID, isUsingBolsterLabels }) => (
    <FlexModalOuter
        title="Create Floors"
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <CreateFloorsFormContainer
            buildingID={buildingID}
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

export default connect(mapStateToProps)(CreateFloorsModal);
