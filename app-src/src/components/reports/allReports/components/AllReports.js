import React from 'react';

import BreadcrumbContainer from 'components/shared/generic/breadcrumb/containers/BreadcrumbContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const AllReports = () => (
    <div>
        <Block>
            <BreadcrumbContainer />
        </Block>
        <Block>
            <h3 className="heading heading-3">All Reports</h3>
        </Block>
    </div>
);

export default AllReports;
