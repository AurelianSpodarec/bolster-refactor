import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllCompanyAdminsTableContainer from '../containers/AllCompanyAdminsTableContainer';

const AllCompanyAdmins = () => (
    <div>
        <BlockContainer>
            <AllCompanyAdminsTableContainer />
        </BlockContainer>
    </div>
);

export default AllCompanyAdmins;
