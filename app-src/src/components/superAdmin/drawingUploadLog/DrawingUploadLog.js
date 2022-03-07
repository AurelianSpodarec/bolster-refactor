import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

import DrawingUploadLogTable from './DrawingUploadLogTable';
import useDrawingUploadLog from './hooks/useDrawingUploadLog';

const DrawingUploadLog = () => {
    const { isFetching, fetchError, drawingsLogs } = useDrawingUploadLog(1, 50);

    return (
        <>
            <PageHeading title="Drawing Upload Log" withBackButton />

            <DrawingUploadLogTable
                isFetching={isFetching}
                fetchError={fetchError}
                drawingsLogs={drawingsLogs}
            />
        </>
    );
};

export default DrawingUploadLog;
