import React from 'react';

import SectionContainer from '../containers/SectionContainer';

const style = {
    justifyContent: 'space-around',
};

const SectionList = ({ sections, findSection, moveSection, hovered }) => (
    <div className="size-lg-12" style={{ ...style }}>
        {sections.map((section, i) => (
            <SectionContainer
                key={section.uuid}
                section={section}
                i={i}
                findSection={findSection}
                moveSection={moveSection}
                hovered={hovered}
            />
        ))}
    </div>
);

export default SectionList;
