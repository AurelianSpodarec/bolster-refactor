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
        <FieldOutput>
            <p>The questions: {joinedQuestions}</p>
            <p>Must have answers: {joinedAnswers}</p>
            <BlockButtonWrapper>
                <ButtonContainer
                    handleClick={() => handleShowCustomFieldModal(field.id)}
                >
                    Edit
                </ButtonContainer>
                <ButtonContainer
                    handleClick={() => removeCustomField(field.id)}
                >
                    Remove
                </ButtonContainer>
            </BlockButtonWrapper>
        </FieldOutput>
    );
};

export default FilterField;
