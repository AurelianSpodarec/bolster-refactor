import React from 'react';

import PreviewSection from '../presentational/PreviewSection';
import Block from 'components/shared/generic/block/presentational/Block';

const PreviewSectionList = ({ sections, questionBySection }) => (
    <Block>
        <div className="size-lg-12">
            {sections.map(section => (
                <PreviewSection
                    key={section.uuid}
                    section={section}
                    questions={questionBySection[section.uuid] || []}
                />
            ))}
        </div>
    </Block>
);

export default PreviewSectionList;
