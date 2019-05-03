import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DropdownListTableContainer from '../containers/DropdownListTableContainer';

const DropdownList = ({ name }) => (
    <>
        <PageHeading title={name} withBackButton />
        <DropdownListTableContainer title={name} />
    </>
);

export default DropdownList;
