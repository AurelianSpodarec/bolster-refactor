import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const TemplateBuilderHeader = ({
    name = '',
    showTemplateForm,
    children,
    serviceName
}) => (
    <PageHeading
        title={`Template builder : ${name} ${
            serviceName ? `(${serviceName})` : ''
        }`}
    >
        <button className="button yellow" onClick={showTemplateForm}>
            <i className="far fa-pencil" /> {name.length ? 'Edit' : 'Add'}{' '}
            template
        </button>
        {children}
    </PageHeading>
);

export default TemplateBuilderHeader;
