import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import EditClientFormContainer from '../containers/EditClientFormContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const ClientEdit = ({ firstName, lastName }) => (
    <>
        <Breadcrumb
            breadcrumbs={[{ text: 'Drawing' }, { text: 'Edit Client' }]}
        />
        <PageHeading title={`Edit Client: ${firstName} ${lastName}`} />

        <EditClientFormContainer />
    </>
);

export default ClientEdit;
