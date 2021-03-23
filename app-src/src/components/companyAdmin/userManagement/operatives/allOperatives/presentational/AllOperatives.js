import React from 'react';

import AllOperativesTableContainer from '../containers/AllOperativesTableContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import TabsContainer from 'components/shared/generic/tabs/containers/TabsContainer';

const AllOperatives = () => (
    <>
        <PageHeading title="All Operatives" withBackButton>
            <TabsContainer />
        </PageHeading>
        <AllOperativesTableContainer />
    </>
);

export default AllOperatives;
