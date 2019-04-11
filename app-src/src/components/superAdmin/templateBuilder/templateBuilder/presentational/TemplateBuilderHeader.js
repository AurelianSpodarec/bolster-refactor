import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const TemplateBuilderHeader = ({ name = '', showTemplateForm, children }) => (
    <PageHeading title={`Template builder : ${name}`}>
        <button className="button yellow" onClick={showTemplateForm}>
            <i className="far fa-pencil" /> {name.length ? 'Edit' : 'Add'}{' '}
            template
        </button>
        {children}
    </PageHeading>
);

export default TemplateBuilderHeader;
