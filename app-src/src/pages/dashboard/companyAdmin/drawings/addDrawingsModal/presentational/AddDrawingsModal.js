import React from 'react';
import { connect } from 'react-redux';

import AddDrawingsFormContainer from '../containers/AddDrawingsFormContainer';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const AddDrawingsModal = ({ floorID, isUsingBolsterLabels }) => (
    <FlexModalOuter
        title="Create Drawings"
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <AddDrawingsFormContainer floorID={floorID} isUsingBolsterLabels={isUsingBolsterLabels} />
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

export default connect(mapStateToProps)(AddDrawingsModal);
