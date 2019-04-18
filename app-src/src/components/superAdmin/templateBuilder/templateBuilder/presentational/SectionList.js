import React from 'react';

import SectionContainer from '../containers/SectionContainer';

const style = {
    justifyContent: 'space-around'
};

const SectionList = ({ sections }) => (
    <div className="size-lg-12" style={{ ...style }}>
        {sections.map(section => (
            <SectionContainer key={section.uuid} section={section} />
        ))}
    </div>
);

export default SectionList;
