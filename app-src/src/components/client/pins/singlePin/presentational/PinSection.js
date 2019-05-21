import React from 'react';
import PinQuestionsContainer from '../containers/PinQuestionsContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PinSection = ({ sections, pinHistory }) =>
    sections.map(({ id, name }) => (
        <div className="pin-details-section size-lg-12" key={id}>
            <BlockHeading classes="sub-heading" title={name} />
            <PinQuestionsContainer sectionID={id} pinHistory={pinHistory} />
        </div>
    ));

export default PinSection;
