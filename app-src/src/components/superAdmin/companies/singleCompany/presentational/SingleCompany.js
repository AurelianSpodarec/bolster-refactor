import React from 'react';

import CompanyHeaderContainer from '../containers/CompanyHeaderContainer';
import TemplatesTableContainer from '../containers/TemplatesTableContainer';
import InvoicesTableContainer from '../containers/InvoicesTableContainer';
import CompanyUsersTableContainer from '../containers/CompanyUsersTableContainer';

const SingleCompany = () => (
    <>
        <div className="size-lg-12">
            <CompanyHeaderContainer />
        </div>
        <div className="size-lg-4">
            <TemplatesTableContainer />
        </div>
        <div className="size-lg-8">
            <InvoicesTableContainer />
        </div>
        <div className="size-lg-3">{/* active subscription */}</div>
        <div className="size-lg-12">
            <CompanyUsersTableContainer />
        </div>
    </>
);

export default SingleCompany;
