import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import AddHistoryFromContainer from '../containers/AddHistoryFormContainer';

const AddPinHistory = () => (
    <>
        <Breadcrumb
            breadcrumbs={[{ text: '##pin##' }, { text: '##add history' }]}
        />
        <AddHistoryFromContainer />
    </>
);

export default AddPinHistory;
