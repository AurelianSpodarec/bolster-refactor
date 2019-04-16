import React from 'react';
import PinQuestionsContainer from '../containers/PinQuestionsContainer';

const PinSection = ({ sections, pinHistory }) =>
    sections.map(section => (
        <div className="pin-details-section size-lg-12" key={section.id}>
            <h4 className="title">{section.name}</h4>
            <PinQuestionsContainer
                sectionID={section.id}
                pinHistory={pinHistory}
            />
        </div>
    ));

export default PinSection;
