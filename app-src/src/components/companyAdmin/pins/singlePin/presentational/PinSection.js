import React from 'react';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const PinSection = ({ sections }) =>
    sections.map(section => (
        <div className="pin-details-section size-lg-12">
            <h4 className="title">{section.name}</h4>
            <FieldOutput
                title="Test"
                description={'Test'}
                fieldClass="no-h-padding"
            />
        </div>
    ));

export default PinSection;
