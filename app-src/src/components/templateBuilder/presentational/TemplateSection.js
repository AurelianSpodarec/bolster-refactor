import React from 'react';
import BlockHeadingWControls from 'components/shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';
import TemplateSectionTableContainer from '../containers/TemplateSectionTableContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const TemplateSection = ({ section, deleteSection }) => (
    <div className="template-block size-lg-12">
        <BlockHeadingWControls title={section.name}>
            <button className="button icon-only">
                <i className="fa fa-eye" />
            </button>
            <button className="button">Rename</button>
        </BlockHeadingWControls>
        <TemplateSectionTableContainer />
        <BlockButtonWrapper>
            <button className="button">
                <i className="fa fa-plus" /> Add new fields
            </button>
        </BlockButtonWrapper>
        <BlockButtonWrapper>
            <button onClick={deleteSection} className="button red">
                <i className="fa fa-times" />
                delete section
            </button>
            <button className="button">
                <i className="fa fa-clone" /> Duplicate
            </button>
        </BlockButtonWrapper>
    </div>
);

export default TemplateSection;
