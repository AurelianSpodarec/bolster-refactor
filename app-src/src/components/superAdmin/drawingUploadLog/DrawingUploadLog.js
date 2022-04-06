import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

import DrawingUploadLogTable from './DrawingUploadLogTable';

const DrawingUploadLog = () => {
    return (
        <>
            <PageHeading title="Drawing Upload Log" withBackButton />

            <DrawingUploadLogTable />
        </>
    );
};

export default DrawingUploadLog;
