import React from 'react';

import Breadcrumb from '../presentational/Breadcrumb';

const BreadcrumbContainer = ({ className, children }) => (
    <Breadcrumb className={className}>{children}</Breadcrumb>
);

export default BreadcrumbContainer;
