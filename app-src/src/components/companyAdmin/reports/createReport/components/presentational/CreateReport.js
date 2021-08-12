import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CreateReportForm from '../presentational/CreateReportForm';

const CreateReport = () => (
    <>
        <PageHeading title="Create Report" withBackButton />
        <CreateReportForm />
    </>
);

export default CreateReport;
