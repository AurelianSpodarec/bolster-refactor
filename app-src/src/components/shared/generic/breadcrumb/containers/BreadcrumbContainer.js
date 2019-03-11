import React from 'react';
import { connect } from 'react-redux';

import Breadcrumb from '../presentational/Breadcrumb';

const BreadcrumbContainer = ({ className, breadcrumbs, children }) => (
    <Breadcrumb className={className} breadcrumbs={breadcrumbs}>
        {children}
    </Breadcrumb>
);

export default connect(state => state.breadcrumbsReducer)(BreadcrumbContainer);
