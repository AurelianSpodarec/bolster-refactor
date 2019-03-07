import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

const Breadcrumb = ({ className = 'size-lg-12', children }) => (
    <Block>
        <div className={`breadcrumb ${className}`}>
            <h3 className="heading heading-3">Breadcrumb item 1 - item 2</h3>
        </div>
        {children}
    </Block>
);

export default Breadcrumb;
