import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const TemplateBuilderHeader = ({
    name = '',
    showTemplateForm,
    serviceName,
    isExisting,
    showAddSectionModal,
    addTemplateFromExisting
}) => (
    <PageHeading
        title={`Template builder : ${name} ${
            serviceName ? `(${serviceName})` : ''
        }`}
        withBackButton
    >
        <div className="button-holder">
            <button className="button yellow" onClick={showTemplateForm}>
                <i className="far fa-pencil" /> {name.length ? 'Edit' : 'Add'}{' '}
                template
            </button>
            {isExisting && (
                <>
                    <button
                        onClick={addTemplateFromExisting()}
                        className="button green"
                    >
                        <i className="fa fa-plus" /> Copy Template
                    </button>
                    <button
                        onClick={showAddSectionModal}
                        className="button blue"
                    >
                        <i className="fa fa-plus" /> Add Section
                    </button>
                </>
            )}
        </div>
    </PageHeading>
);

export default TemplateBuilderHeader;
