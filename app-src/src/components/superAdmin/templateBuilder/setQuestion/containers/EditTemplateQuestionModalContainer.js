import React, { Component } from 'react';

import withSetQuestion from '../hocs/withSetQuestion';
import { convertArrToObj } from 'helpers/generic';
import {
    PREREQ_TYPES,
    QUESTION_TYPE_NUMBERS,
    QUESTION_TYPE_VALUES
} from 'constants/shared/templateBuilder';
import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';

class TemplateQuestionModalContainer extends Component {
    render() {
        const {
            fields: {
                questionType,
                questionTypeOptions,
                prereqUUID,
                ...fields
            },
            hideModal,
            handleInputChange
        } = this.props;

        const prereqOptions = this._getPrereqOptions();
        const questionOptions = Object.values(questionTypeOptions).filter(
            ({ value }) => +value !== QUESTION_TYPE_NUMBERS.STATUS
        );
        const { statusOptions } = this.props;
        return (
            <TemplateQuestionFormModal
                {...fields}
                statusOptions={statusOptions}
                prereqOptions={Object.values(prereqOptions)}
                selectedPrereq={prereqOptions[prereqUUID]}
                questionType={questionTypeOptions[questionType]}
                questionTypeOptions={questionOptions}
                hideModal={hideModal}
                handleInputChange={handleInputChange}
                handleSubmit={this.handleSubmit}
                action="Edit"
            />
        );
    }
    componentDidMount = () => {
        const { question, updateQuestionFields } = this.props;
        updateQuestionFields(question);
    };

    handleSubmit = e => {
        e.preventDefault();
        const { setQuestion, question, getQuestionData } = this.props;

        const newQuestion = {
            ...question,
            ...getQuestionData()
        };

        setQuestion(newQuestion);
    };

    _getPrereqOptions = () => {
        const {
            questions,
            question: { templateUUID, uuid }
        } = this.props;

        const options = questions
            .filter(
                q =>
                    q.templateUUID === templateUUID &&
                    PREREQ_TYPES.includes(q.questionType + '') &&
                    q.uuid !== uuid &&
                    q.prereqUUID !== uuid
            )
            .map(({ uuid, name, questionType }) => ({
                value: uuid,
                text: name,
                isStatus: questionType + '' === QUESTION_TYPE_VALUES.STATUS
            }));

        return convertArrToObj(options, 'value');
    };
}

export default withSetQuestion(TemplateQuestionModalContainer);
