import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import CompanyHeaderContainer from '../containers/CompanyHeaderContainer';

const SingleCompany = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <div className="size-lg-12">
            <CompanyHeaderContainer />
        </div>
        <div className="size-lg-8">
            <h2 className="heading heading-3">company</h2>
        </div>
    </>
);

export default SingleCompany;
