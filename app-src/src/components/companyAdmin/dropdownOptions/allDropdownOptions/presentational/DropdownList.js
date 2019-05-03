import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DropdownListTableContainer from '../containers/DropdownListTableContainer';

const DropdownList = ({ name, type }) => (
    <>
        <PageHeading title={name} withBackButton />
        <DropdownListTableContainer title={name} type={type} />
    </>
);

export default DropdownList;
