import React from 'react';

import PreviewSection from './PreviewSection';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';

const PreviewSectionList = ({ sections, questionBySection }) => (
    <>
        <BlockContainer>
            <BlockHeading title="Template Preview" />
            <div className="template-phone-example ignore-padding size-lg-12">
                {sections.map(section => (
                    <PreviewSection
                        key={section.uuid}
                        section={section}
                        questions={questionBySection[section.uuid] || []}
                    />
                ))}
            </div>
        </BlockContainer>
    </>
);

export default PreviewSectionList;
