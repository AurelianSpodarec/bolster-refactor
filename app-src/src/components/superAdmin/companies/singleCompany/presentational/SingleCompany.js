import React from 'react';

import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import CompanyHeaderContainer from '../containers/CompanyHeaderContainer';
import TemplatesTableContainer from '../containers/TemplatesTableContainer';

const SingleCompany = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'item 1' }, { text: 'item 2' }]} />
        <div className="size-lg-12">
            <CompanyHeaderContainer />
        </div>
        <div className="size-lg-12">
            <TemplatesTableContainer />
        </div>
    </>
);

export default SingleCompany;
