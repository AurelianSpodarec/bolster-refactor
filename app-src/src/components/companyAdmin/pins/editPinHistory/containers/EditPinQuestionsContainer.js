import React from 'react';
import { useSelector } from 'react-redux';

import EditPinQuestions from '../presentational/EditPinQuestions';
import { selectTemplateQuestions } from '../../../../../selectors/companyAdmin/templateQuestions';
import { selectPinAnswers } from '../../../../../selectors/companyAdmin/pinAnswers';

const EditPinQuestionsContainer = ({ sections, selectedVersion, pinOptions, drawingID }) => {
    const questions = useSelector(selectTemplateQuestions);
    const answers = useSelector(selectPinAnswers);
    return (
        <EditPinQuestions
            sections={Object.values(sections)}
            questions={Object.values(questions)}
            pinOptions={pinOptions}
            answers={answers}
            selectedVersion={selectedVersion}
            drawingID={drawingID}
        />
    );
};

export default EditPinQuestionsContainer;
