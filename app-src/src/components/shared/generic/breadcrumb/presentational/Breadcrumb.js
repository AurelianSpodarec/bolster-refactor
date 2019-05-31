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
                        <React.Fragment key={item.link}>
                            <Link key={item.link} to={item.link}>
                                <sub>{item.text}</sub>
                            </Link>
                            {i < breadcrumbs.length - 1 ? ' / ' : ''}
                        </React.Fragment>
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
