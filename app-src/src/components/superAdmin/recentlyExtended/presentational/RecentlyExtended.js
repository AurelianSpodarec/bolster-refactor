import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import RecentlyExtendedTableContainer from '../containers/RecentlyExtendedTableContainer';

const RecentlyExtended = () => (
    <>
        <PageHeading title="Recently Extended" />
        <RecentlyExtendedTableContainer />
    </>
);

export default RecentlyExtended;
