import React from 'react';
import AddHeadquartersCompanyFormContainer from '../containers/AddHeadquartersCompanyFormContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';

const AddHeadquartersCompany = () => (
    <>
        <PageHeading title="Add a company" withBackButton />

        <BlockContainer>
            <AddHeadquartersCompanyFormContainer />
        </BlockContainer>
    </>
);

export default AddHeadquartersCompany;
