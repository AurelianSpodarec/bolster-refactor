import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import Block from 'components/shared/generic/block/presentational/Block';

const PinOptions = () => (
    <div>
        <Block>
            <Breadcrumb />
        </Block>
        <Block>
            <h3 className="heading heading-3">Pin options</h3>
        </Block>
    </div>
);

export default PinOptions;
