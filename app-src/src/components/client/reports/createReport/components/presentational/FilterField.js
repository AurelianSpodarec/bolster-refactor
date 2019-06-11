import React from 'react';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const FilterField = ({
    field,
    questions,
    handleShowCustomFieldModal,
    removeCustomField
}) => {
    // todo: styling here
    const answers = Object.values(field.questionValues).map(
        ({ value }) => value
    );
    const joinedAnswers = answers.join(' OR ');
    const chosenQuestions = field.selectedQuestions.map(
        id => questions[id].text
    );
    const joinedQuestions = chosenQuestions.join(' OR ');

    return (
        <FieldOutput fieldClass="filters">
            <div className="filters-calc">
                <p className="centered">({joinedQuestions})</p>
                <div className="centered">
                    <i className="far fa-equals fa-fw" />
                </div>
                <p className="centered">({joinedAnswers})</p>
            </div>
            <BlockButtonWrapper sizeClasses="size-lg-5">
                <button
                    className="button yellow"
                    onClick={() => handleShowCustomFieldModal(field.id)}
                >
                    <i className="far fa-edit fa-fw" />
                    Edit
                </button>
                <button
                    className="button red"
                    onClick={() => removeCustomField(field.id)}
                >
                    <i className="fa fa-times fa-fw" />
                    Remove
                </button>
            </BlockButtonWrapper>
        </FieldOutput>
    );
};

export default FilterField;
