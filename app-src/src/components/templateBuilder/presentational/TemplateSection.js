import React from 'react';

import BlockHeadingWControls from 'components/shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';
import TemplateSectionTableContainer from '../containers/TemplateSectionTableContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const TemplateSection = ({
    section,
    questions,
    showAddQuestionModal,
    showRenameSectionModal,
    deleteSection,
    duplicateSection
}) => (
    <div className="template-block size-lg-12">
        <BlockHeadingWControls title={section.name}>
            <button className="button icon-only">
                <i className="fa fa-eye" />
            </button>
            <button onClick={showRenameSectionModal} className="button">
                Rename
            </button>
        </BlockHeadingWControls>
        <TemplateSectionTableContainer questions={questions} />
        <BlockButtonWrapper>
            <button className="button" onClick={showAddQuestionModal}>
                <i className="fa fa-plus" /> Add new field
            </button>
        </BlockButtonWrapper>
        <BlockButtonWrapper>
            <button onClick={deleteSection} className="button red">
                <i className="fa fa-times" />
                delete section
            </button>
            <button onClick={duplicateSection} className="button">
                <i className="fa fa-clone" /> Duplicate
            </button>
        </BlockButtonWrapper>
    </div>
);

export default TemplateSection;
