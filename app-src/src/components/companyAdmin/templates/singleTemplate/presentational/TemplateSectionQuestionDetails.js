import React from 'react';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { isObjEmpty } from 'helpers/generic';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const TemplateSectionQuestionDetails = ({ question, details = {} }) =>
    !isObjEmpty(details) ? (
        <>
            <BlockHeading title={question.name} />
            {Object.entries(details).map(([key, val]) => (
                <FieldOutput
                    key={key}
                    title={key}
                    description={val}
                    fieldClass="no-h-padding"
                />
            ))}
        </>
    ) : (
        <BlockHeading title="Select a question for more info" />
    );

export default TemplateSectionQuestionDetails;
