import React from 'react';
import PinQuestionsContainer from '../containers/PinQuestionsContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PinSection = ({ sections, pinHistory }) =>
    sections.map(section => (
        <div className="pin-details-section size-lg-12" key={section.id}>
            <BlockHeading classes="sub-heading" title={section.name} />

            <PinQuestionsContainer
                sectionID={section.id}
                pinHistory={pinHistory}
            />
        </div>
    ));

export default PinSection;
