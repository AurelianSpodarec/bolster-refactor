import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const TemplateBuilderHeader = ({ name = '', showTemplateForm }) => (
    <PageHeading title={`Template builder : ${name}`}>
        <button className="button" onClick={showTemplateForm}>
            {name.length ? 'Edit' : 'Add'} template
        </button>
    </PageHeading>
);

export default TemplateBuilderHeader;
