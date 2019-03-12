import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import Block from 'components/shared/generic/block/presentational/Block';

const AllReports = () => (
    <div>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <Block>
            <h3 className="heading heading-3">All Reports</h3>
        </Block>
    </div>
);

export default AllReports;
