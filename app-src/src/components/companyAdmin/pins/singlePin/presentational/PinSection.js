import React from 'react';
import PinQuestionsContainer from '../containers/PinQuestionsContainer';

const PinSection = ({ sections }) =>
    sections.map(section => (
        <div className="pin-details-section size-lg-12">
            <h4 className="title">{section.name}</h4>
            <PinQuestionsContainer sectionID={section.id} />
        </div>
    ));

export default PinSection;
