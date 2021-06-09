import React from 'react';
import BlockTable from '../presentational/BlockTable';

const headers = ['Email', 'Access Code', 'Last Viewed On', 'Total Views', ''];

const BlockTableContainer = ({ accessCodes, isFetching, title }) => {
    return (
        <BlockTable
            title={title}
            accessCodes={accessCodes}
            isFetching={isFetching}
            headers={headers}
        />
    );
};

export default BlockTableContainer;
