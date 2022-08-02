import React from 'react';
import { Link } from 'react-router-dom';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import { isObjEmpty } from 'helpers/generic';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const TemplateSectionQuestionDetails = ({ question, details = {}, showModal }) =>
    !isObjEmpty(details) ? (
        <>
            <BlockHeading title={question.name}>
                {question.canCompanyEdit && (
                    <button className="button yellow" onClick={showModal}>
                        <i className="fal fa-pencil" /> Edit
                    </button>
                )}
            </BlockHeading>
            {Object.entries(details).map(([key, val]) => (
                <FieldOutput
                    key={key}
                    title={key}
                    description={val !== 'SEE_PIN_OPTIONS' ? val : null}
                    fieldClass="no-h-padding"
                >
                    {val === 'SEE_PIN_OPTIONS' && (
                        <p>
                            See <Link to="/company/pin-options">Pin Options</Link>
                        </p>
                    )}
                </FieldOutput>
            ))}
        </>
    ) : (
        <>
            <BlockHeading title="Question Preview" />
            <p className="generic-text intro-text size-lg-12">
                {'Press "Info" on a question and view the details here.'}
            </p>
        </>
    );

export default TemplateSectionQuestionDetails;
