import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import SystemMessageTableContainer from '../containers/SystemMessageTableContainer';

const AllMessages = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'All messages' }]} />
        <div className="size-lg-8">
            <SystemMessageTableContainer />
        </div>
    </>
);

export default AllMessages;
