import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({
    className = 'size-lg-12',
    breadcrumbs = [],
    children
}) => (
    <div className="size-lg-12">
        <div className={`breadcrumb ${className}`}>
            <p>
                {breadcrumbs.map((item, i) =>
                    item.link ? (
                        <Link key={item.link + i} to={item.link}>
                            {item.text}{' '}
                            {i < breadcrumbs.length - 1 ? ' / ' : ''}
                        </Link>
                    ) : (
                        <span key={item.text + i}>
                            {item.text}
                            {i < breadcrumbs.length - 1 ? ' / ' : ''}
                        </span>
                    )
                )}
            </p>
        </div>
        {children}
    </div>
);

export default Breadcrumb;
