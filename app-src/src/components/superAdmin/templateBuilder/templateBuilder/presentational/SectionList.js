import React from 'react';

import SectionContainer from '../containers/SectionContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const style = {
    display: 'flex',
    justifyContent: 'space-around'
};

const SectionList = ({ sections }) => (
    <div className="size-lg-12" style={{ ...style }}>
        {sections.map(section => (
            <BlockContainer key={section.uuid}>
                <SectionContainer section={section} />
            </BlockContainer>
        ))}
    </div>
);

export default SectionList;
