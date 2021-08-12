import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CreateReportForm from '../presentational/CreateReportForm';
import CreateReportReloadOptions from '../containers/CreateReportReloadOptions';

const CreateReport = () => (
    <>
        <PageHeading title="Create Report" withBackButton />
        <CreateReportForm />
        <CreateReportReloadOptions/>
    </>
);

export default CreateReport;
