import React from 'react';

import TemplateSectionContainer from '../containers/TemplateSectionContainer';

const TemplateSectionList = ({ sections }) =>
    sections.map(section => (
        <TemplateSectionContainer key={section.uuid} section={section} />
    ));

export default TemplateSectionList;
