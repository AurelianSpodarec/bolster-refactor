import React from 'react';

import SectionListContiner from '../containers/SectionListContainer';
import TemplateBuilderHeaderContainer from '../containers/TemplateBuilderHeaderContainer';

const TemplateBuilder = ({ showsetSectionModal }) => (
    <div className="size-lg-12">
        <TemplateBuilderHeaderContainer />
        <div className="size-lg-12">
            <SectionListContiner />
        </div>
        <button onClick={showsetSectionModal} className="button">
            <i className="fa fa-plus" /> Add Section
        </button>
    </div>
);

export default TemplateBuilder;
