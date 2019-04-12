import React from 'react';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const TemplateSectionQuestionDetails = ({ question, details }) => {
    return Object.entries(details).map(([key, val]) => (
        <FieldOutput
            key={key}
            title={key}
            description={val}
            fieldClass="no-h-padding"
        />
    ));
};

export default TemplateSectionQuestionDetails;
