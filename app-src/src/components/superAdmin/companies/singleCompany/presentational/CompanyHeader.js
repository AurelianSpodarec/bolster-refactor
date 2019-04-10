import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const CompanyHeader = ({ showAddTemplateModal, company: { name = '' } }) => (
    <PageHeading title={`Company: ${name}`}>
        <button onClick={showAddTemplateModal} className="button">
            <i className="fa fa-plus" /> Add template
        </button>
    </PageHeading>
);

export default CompanyHeader;
