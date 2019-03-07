import React from 'react';

import BreadcrumbContainer from 'components/shared/generic/breadcrumb/containers/BreadcrumbContainer';
import Block from 'components/shared/generic/block/presentational/Block';

const Support = () => (
    <div>
        <Block>
            <BreadcrumbContainer />
        </Block>
        <Block>
            <h3 className="heading heading-3">Support</h3>
        </Block>
    </div>
);

export default Support;
