import React from 'react';
import PinAnswersContainer from '../containers/PinAnswersContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const PinQuestion = ({ questions, pinHistory }) =>
    questions.map(question => (
        <FieldOutput
            title={question.name}
            key={question.id}
            sizeClass="size-lg-6 flex-row-item"
        >
            <PinAnswersContainer
                questionID={question.id}
                questionType={question.type}
                pinHistory={pinHistory}
            />
        </FieldOutput>
    ));

export default PinQuestion;
