import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import TemplateBlockContainer from '../containers/TemplateBlockContainer';

const TemplateBuilder = () => (
    <div className="size-lg-12">
        <PageHeading title="Template Builder" />

        <div className="size-lg-6">
            <TemplateBlockContainer />
        </div>
    </div>
);

export default TemplateBuilder;
