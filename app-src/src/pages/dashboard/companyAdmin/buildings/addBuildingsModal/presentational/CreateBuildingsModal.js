import React from 'react';
import { connect } from 'react-redux';

import CreateBuildingsFormContainer from '../containers/CreateBuildingsFormContainer';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const CreateBuildingsModal = ({ siteID, isUsingBolsterLabels }) => (
    <FlexModalOuter
        title="Create Buildings"
        extraClasses={`${isUsingBolsterLabels ? 'w-label-example' : ''}`}
    >
        <CreateBuildingsFormContainer siteID={siteID} isUsingBolsterLabels={isUsingBolsterLabels} />
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

export default connect(mapStateToProps)(CreateBuildingsModal);
