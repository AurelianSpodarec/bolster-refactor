import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockTableContainer from '../containers/BlockTableContainer';

const DemoAccessCodes = ({ accessCodes, isFetching }) => {
    return (
        <>
            <PageHeading title="Demo Access Codes" />
            <BlockTableContainer
                accessCodes={accessCodes}
                isFetching={isFetching}
                title="Access Codes"
            />
        </>
    );
};

export default DemoAccessCodes;
