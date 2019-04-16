import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddPinHistoryContainer from '../containers/AddPinHistoryContainer';

const AddPinHistory = () => (
    <>
        <Breadcrumb
            breadcrumbs={[{ text: '##pin##' }, { text: '##add history' }]}
        />
        <AddPinHistoryContainer />
    </>
);

export default AddPinHistory;
