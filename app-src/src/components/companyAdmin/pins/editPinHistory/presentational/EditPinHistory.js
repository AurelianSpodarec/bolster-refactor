import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditPinHistoryContainer from '../containers/EditPinHistoryContainer';

const EditPinHistory = () => (
    <>
        <Breadcrumb
            breadcrumbs={[{ text: '##pin##' }, { text: '##edit history' }]}
        />
        <EditPinHistoryContainer />
    </>
);

export default EditPinHistory;
