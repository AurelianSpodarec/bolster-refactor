import React from 'react';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const FilterField = ({
    field: { selectedValues = [], questionValues = [], selectedQuestions, id },
    questions,
    handleShowCustomFieldModal,
    removeCustomField
}) => {
    // todo: styling here
    const answers = selectedValues.length ? selectedValues : questionValues;
    const joinedAnswers = answers.join(' OR ');
    const chosenQuestions = selectedQuestions.map(id => questions[id].text);
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
                    onClick={() => handleShowCustomFieldModal(id)}
                >
                    <i className="far fa-edit fa-fw" />
                    Edit
                </button>
                <button
                    className="button red"
                    onClick={() => removeCustomField(id)}
                >
                    <i className="fa fa-times fa-fw" />
                    Remove
                </button>
            </BlockButtonWrapper>
        </FieldOutput>
    );
};

export default FilterField;
