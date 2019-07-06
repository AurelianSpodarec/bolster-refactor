import React from 'react';

import SectionListContiner from '../containers/SectionListContainer';
import TemplateBuilderHeaderContainer from '../containers/TemplateBuilderHeaderContainer';
import SaveTemplateButtonContainer from '../containers/SaveTemplateButtonContainer';
// import TemplateLabelInfoContainer from '../containers/TemplateLabelInfoContainer';
import PreviewSectionListContainer from '../../templatePreview/containers/PreviewSectionListContainer';

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
        <div className="size-lg-8">
            <SectionListContiner />
            {saveRequired && <SaveTemplateButtonContainer />}
        </div>
        <div className="size-lg-4">
            <PreviewSectionListContainer />
        </div>
    </div>
);

export default TemplateBuilder;
