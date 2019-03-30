import React from 'react';

import SectionContainer from '../containers/SectionContainer';

const style = {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '20px'
};

const SectionList = ({ sections }) => (
    <div style={{ ...style }}>
        {sections.map(section => (
            <SectionContainer key={section.uuid} section={section} />
        ))}
    </div>
);

export default SectionList;
