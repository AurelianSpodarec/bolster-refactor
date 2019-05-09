import React from 'react';
import uuid from 'uuid/v1';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';
import withSetQuestion from '../hocs/withSetQuestion';
import { QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';

const AddTemplateQuestionModalContainer = ({
    fields: { questionType, questionTypeOptions, prereqUUID, ...fields },
    hideModal,
    handleInputChange,
    prereqOptions,
    setQuestion,
    sectionUUID,
    templateUUID,
    getQuestionData,
    questions
}) => {
    const questionOptions = Object.values(questionTypeOptions).filter(
        ({ value }) => +value !== QUESTION_TYPE_NUMBERS.STATUS
    );
    return (
        <TemplateQuestionFormModal
            {...fields}
            prereqOptions={Object.values(prereqOptions)}
            selectedPrereq={prereqOptions[prereqUUID]}
            questionType={questionTypeOptions[questionType]}
            questionTypeOptions={questionOptions}
            hideModal={hideModal}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            action="Add"
        />
    );
    function handleSubmit(e) {
        e.preventDefault();
        const newQuestion = {
            templateUUID,
            sectionUUID,
            uuid: uuid(),
            sort: _getSort(),
            ...getQuestionData()
        };

        setQuestion(newQuestion);
    }

    function _getSort() {
        const sectionSortList = questions
            .filter(q => q.sectionUUID === sectionUUID)
            .map(q => q.sort);
        return Math.max(0, ...sectionSortList) + 1;
    }
};

export default withSetQuestion(AddTemplateQuestionModalContainer);
