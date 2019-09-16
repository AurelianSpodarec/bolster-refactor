import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import RecentlyDeletedTableContainer from '../containers/RecentlyDeletedTableContainer';

const RecentlyDeleted = () => (
    <>
        <PageHeading title="Recently Deleted" />
        <RecentlyDeletedTableContainer />
    </>
);

export default RecentlyDeleted;
