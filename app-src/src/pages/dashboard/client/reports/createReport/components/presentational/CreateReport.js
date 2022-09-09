import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CreateReportForm from './CreateReportForm';

const CreateReport = () => (
    <>
        <PageHeading title="Create Report" />
        <CreateReportForm />
    </>
);

export default CreateReport;
