import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import HeadquartersCompaniesTableContainer from '../containers/HeadquartersCompaniesTableContainer';

const HeadquartersCompanies = () => {
    return (
        <BlockContainer heading="Headquarters Companies">
            <HeadquartersCompaniesTableContainer />
        </BlockContainer>
    );
};

export default HeadquartersCompanies;
