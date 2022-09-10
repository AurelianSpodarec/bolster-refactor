import React from 'react';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import RecentlyDeletedTableContainer from '../containers/RecentlyDeletedTableContainer';

const RecentlyDeleted = ({ page, setPage }) => (
    <>
        <PageHeading title="Recently Deleted" />
        <RecentlyDeletedTableContainer page={page} setPage={setPage} />
    </>
);

export default RecentlyDeleted;
