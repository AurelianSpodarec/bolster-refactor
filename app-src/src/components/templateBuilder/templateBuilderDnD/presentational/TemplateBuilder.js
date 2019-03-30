import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import SectionListContiner from '../containers/SectionListContainer';

const TemplateBuilder = ({ addSection }) => (
    <div className="size-lg-12">
        <PageHeading title="Template Builder" />
        <div className="size-lg-12">
            <SectionListContiner />
        </div>
        <button onClick={addSection} className="button">
            <i className="fa fa-plus" /> Add Section
        </button>
    </div>
);

export default TemplateBuilder;
