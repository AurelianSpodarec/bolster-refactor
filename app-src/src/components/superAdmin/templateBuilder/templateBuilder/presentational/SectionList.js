import React from 'react';

import SectionContainer from '../containers/SectionContainer';

const style = {
    justifyContent: 'space-around',
};

const SectionList = ({ sections, findSection, moveSection, hovered }) => (
    <div className="size-lg-12" style={{ ...style }}>
        {sections.map((section, i) => (
            <div key={section.uuid}>
                <SectionContainer
                    key={section.uuid}
                    section={section}
                    i={i}
                    findSection={findSection}
                    moveSection={moveSection}
                    hovered={hovered}
                />
            </div>
        ))}
    </div>
);

export default SectionList;
