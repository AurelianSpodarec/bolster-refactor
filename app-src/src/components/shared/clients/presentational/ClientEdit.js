import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditClientFormContainer from '../containers/EditClientFormContainer';

const ClientEdit = () => (
    <>
        <Breadcrumb
            breadcrumbs={[{ text: 'Drawing' }, { text: 'Edit Client' }]}
        />
        <EditClientFormContainer />
    </>
);

export default ClientEdit;
