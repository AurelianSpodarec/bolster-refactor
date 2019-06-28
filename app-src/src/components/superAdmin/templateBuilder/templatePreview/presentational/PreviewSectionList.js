import React from 'react';

import PreviewSection from '../presentational/PreviewSection';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const PreviewSectionList = ({ sections, questionBySection, template }) => (
    <>
        <PageHeading
            title={`Preview Template: ${template.name}`}
            withBackButton
        />
        <BlockContainer>
            <div className="size-lg-12">
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
