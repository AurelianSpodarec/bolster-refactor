import React from 'react';

import SOSGenerationFormContainer from '../../sosGenerationModal/containers/SOSGenerationFormContainer';
import SOSManagementTableContainer from '../containers/SOSManagementTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const sosManagement = () => {
    return (
        <>
            <PageHeading title="SOS Management" withBackButton />

            <SOSManagementTableContainer />
        </>
    );
};

export default sosManagement;
