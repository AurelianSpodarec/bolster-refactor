import React from 'react';

import SectionListContiner from '../containers/SectionListContainer';
import TemplateBuilderHeaderContainer from '../containers/TemplateBuilderHeaderContainer';
import SaveTemplateButtonContainer from '../containers/SaveTemplateButtonContainer';

const TemplateBuilder = ({ showAddSectionModal, saveRequired, isExisting }) => (
    <div className="size-lg-12">
        <TemplateBuilderHeaderContainer
            showAddSectionModal={showAddSectionModal}
            isExisting={isExisting}
        />
        <div className="size-lg-12">
            <SectionListContiner />
        </div>

        {saveRequired && <SaveTemplateButtonContainer />}
    </div>
);

export default TemplateBuilder;
