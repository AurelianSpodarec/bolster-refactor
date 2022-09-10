import React from 'react';

import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

import DrawingUploadLogTable from './DrawingUploadLogTable';

const DrawingUploadLog = () => {
    return (
        <>
            <PageHeading title="Drawing Upload Log" />

            <DrawingUploadLogTable />
        </>
    );
};

export default DrawingUploadLog;
