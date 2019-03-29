import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const BreadcrumbContainer = () => {
    const breadcrumbs = [
        { text: 'Site one', link: 'sites/1' },
        { text: 'Building one', link: 'buildings/1' },
        { text: 'Floor one', link: 'floors/1' },
        { text: 'Drawing one', link: 'drawings/1' },
        { text: '00067:34' }
    ];

    return <Breadcrumb breadcrumbs={breadcrumbs} />;
};

//connect to redux
//
//with router to get pathname
export default withRouter(
    connect(
        null,
        null
    )(BreadcrumbContainer)
);
