import React from 'react';
import { Link } from 'react-router-dom';

import Block from 'components/shared/generic/block/presentational/Block';

const Breadcrumb = ({ className = 'size-lg-12', breadcrumbs, children }) => (
    <Block contentClass="size-lg-12 small-padding">
        <div className={`breadcrumb ${className}`}>
            <p>
                {breadcrumbs.map((item, i) =>
                    item.link ? (
                        <Link key={item.link} to="#">
                            {item.text} {i !== breadcrumbs.length ? ' / ' : ''}
                        </Link>
                    ) : (
                        <span key={item.text}>{item.text}</span>
                    )
                )}
            </p>
        </div>
        {children}
    </Block>
);

export default Breadcrumb;
