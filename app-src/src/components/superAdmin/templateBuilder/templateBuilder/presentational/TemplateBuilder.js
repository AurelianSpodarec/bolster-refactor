import React from 'react';

import SectionListContiner from '../containers/SectionListContainer';
import TemplateBuilderHeaderContainer from '../containers/TemplateBuilderHeaderContainer';
import SaveTemplateButtonContainer from '../containers/SaveTemplateButtonContainer';

const TemplateBuilder = ({ showAddSectionModal, saveRequired, isExisting }) => (
    <div className="size-lg-12">
        <TemplateBuilderHeaderContainer />
        <div className="size-lg-12">
            <SectionListContiner />
        </div>
        {isExisting && (
            <button onClick={showAddSectionModal} className="button">
                <i className="fa fa-plus" /> Add Section
            </button>
        )}
        {saveRequired && <SaveTemplateButtonContainer />}
    </div>
);

export default TemplateBuilder;
