import React from 'react';
import { Link } from 'react-router-dom';

import Block from 'components/shared/generic/block/presentational/Block';

const Breadcrumb = ({ className = 'size-lg-12', children }) => (
    <Block contentClass="size-lg-12 small-padding">
        <div className={`breadcrumb ${className}`}>
            <p>
                <Link to="#">Item 1</Link> / <Link to="#">Item 2</Link> / Item 3
            </p>
        </div>
        {children}
    </Block>
);

export default Breadcrumb;
