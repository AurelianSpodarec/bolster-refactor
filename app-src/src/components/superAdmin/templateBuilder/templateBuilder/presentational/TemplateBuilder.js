import React from 'react';

import SectionListContiner from '../containers/SectionListContainer';
import TemplateBuilderHeaderContainer from '../containers/TemplateBuilderHeaderContainer';
import SaveTemplateButtonContainer from '../containers/SaveTemplateButtonContainer';

const TemplateBuilder = ({ showAddSectionModal, saveRequired }) => (
    <div className="size-lg-12">
        <TemplateBuilderHeaderContainer />
        <div className="size-lg-12">
            <SectionListContiner />
        </div>
        <button onClick={showAddSectionModal} className="button">
            <i className="fa fa-plus" /> Add Section
        </button>
        {saveRequired && <SaveTemplateButtonContainer />}
    </div>
);

export default TemplateBuilder;
