import React from 'react';
import AddHeadquartersCompanyFormContainer from '../containers/AddHeadquartersCompanyFormContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const AddHeadquartersCompany = () => (
    <BlockContainer heading="Add a company">
        <AddHeadquartersCompanyFormContainer />
    </BlockContainer>
);

export default AddHeadquartersCompany;
