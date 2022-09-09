import React from 'react';

import CompanyHeaderContainer from '../containers/CompanyHeaderContainer';
import TemplatesTableContainer from '../containers/TemplatesTableContainer';
import InvoicesTableContainer from '../containers/InvoicesTableContainer';
import SubscriptionStatusContainer from '../../subscription/containers/SubscriptionStatusContainer';
import CompanyUsersTableContainer from '../containers/CompanyUsersTableContainer';
import CompanyInfoContainer from '../containers/CompanyInfoContainer';

const SingleCompany = () => (
    <>
        <div className="size-lg-12">
            <CompanyHeaderContainer />
        </div>
        <div className="size-lg-8">
            <InvoicesTableContainer />
            <CompanyUsersTableContainer />
        </div>
        <div className="size-lg-4">
            <CompanyInfoContainer />
            <SubscriptionStatusContainer />
            <TemplatesTableContainer />
        </div>
    </>
);

export default SingleCompany;
