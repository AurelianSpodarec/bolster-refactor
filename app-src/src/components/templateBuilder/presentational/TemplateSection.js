import React from 'react';
import BlockHeadingWControls from 'components/shared/generic/blockHeadingWControls/presentational/BlockHeadingWControls';
import TemplateSectionTableContainer from '../containers/TemplateSectionTableContainer';

const TemplateSection = ({ name = '' }) => (
    <div className="template-block size-lg-12">
        <BlockHeadingWControls title={name}>
            <button className="button icon-only">
                <i className="fa fa-eye" />
            </button>
            <button className="button">Rename</button>
        </BlockHeadingWControls>
        <TemplateSectionTableContainer />
    </div>
);

export default TemplateSection;
