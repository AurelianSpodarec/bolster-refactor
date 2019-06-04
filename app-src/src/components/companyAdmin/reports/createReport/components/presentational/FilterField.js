import React from 'react';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

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
    const joinedAnswers = answers.join(', ');
    const chosenQuestions = field.selectedQuestions.map(
        id => questions[id].text
    );
    const joinedQuestions = chosenQuestions.join(', ');

    return (
        <FieldOutput fieldClass="filters">
            <div>
                <p>The questions: {joinedQuestions}</p>
                <p>Must have answers: {joinedAnswers}</p>
            </div>
            <BlockButtonWrapper>
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
