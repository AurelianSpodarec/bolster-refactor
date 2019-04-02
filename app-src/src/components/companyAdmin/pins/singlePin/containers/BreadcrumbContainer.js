import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';

const BreadcrumbContainer = ({ building, site }) => {
    // const breadcrumbs = [
    //     { text: 'Site one', link: 'sites/1' },
    //     { text: 'Building one', link: 'buildings/1' },
    //     { text: 'Floor one', link: 'floors/1' },
    //     { text: 'Drawing one', link: 'drawings/1' },
    //     { text: '00067:34' }
    // ];
    //needs to be array to map out each link
    //how do i know if is a neext
    const testcrumbs = [
        { text: site.name, link: `sites/${site.id}` },
        { text: building.name }
    ];

    return <Breadcrumb breadcrumbs={testcrumbs} />;
};

//connect to redux to get the name of name of the site/building/floor with the id from...
//with router to get pathname and site/building/floor id if needed
//check the sites/buildings/floors reducers for these ids for previous links

//
const mapStateToProps = (
    { companyAdmin: { buildingsReducer, sitesReducer } },
    { match }
) => {
    const building = buildingsReducer.buildings[match.params.id] || {};
    const site = sitesReducer[building.siteID] || {};
    return {
        building,
        site
    };
};
export default withRouter(connect(mapStateToProps)(BreadcrumbContainer));
