import React from 'react';

import SectionListContiner from '../containers/SectionListContainer';
import TemplateBuilderHeaderContainer from '../containers/TemplateBuilderHeaderContainer';
import SaveTemplateButtonContainer from '../containers/SaveTemplateButtonContainer';
import TemplateLabelInfoContainer from '../containers/TemplateLabelInfoContainer';

const TemplateBuilder = ({
    showAddSectionModal,
    saveRequired,
    isExisting,
    templateUUID
}) => (
    <div className="size-lg-12">
        <TemplateBuilderHeaderContainer
            showAddSectionModal={showAddSectionModal}
            isExisting={isExisting}
            templateUUID={templateUUID}
        />
        <div className="size-lg-6">
            <SectionListContiner />
            {saveRequired && <SaveTemplateButtonContainer />}
        </div>
        <div className="size-lg-6">
            <TemplateLabelInfoContainer />
        </div>
    </div>
);

export default TemplateBuilder;
