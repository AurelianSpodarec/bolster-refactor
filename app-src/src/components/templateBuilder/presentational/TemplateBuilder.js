import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import TemplateSectionContainer from '../containers/TemplateSectionContainer';

const TemplateBuilder = () => (
    <div className="size-lg-12">
        <PageHeading title="Template Builder" />
        <div className="size-lg-6">
            <TemplateSectionContainer name="Section 1" />
        </div>
        <button className="button">Add block</button>{' '}
    </div>
);

export default TemplateBuilder;
