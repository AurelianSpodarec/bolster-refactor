import React, { Component } from 'react';

import withSetQuestion from '../hocs/withSetQuestion';
import { convertArrToObj } from 'helpers/generic';
import { PREREQ_TYPES } from 'constants/shared/templateBuilder';
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

        return (
            <TemplateQuestionFormModal
                {...fields}
                prereqOptions={Object.values(prereqOptions)}
                selectedPrereq={prereqOptions[prereqUUID]}
                questionType={questionTypeOptions[questionType]}
                questionTypeOptions={Object.values(questionTypeOptions)}
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
            .filter(q => q.templateUUID === templateUUID)
            .filter(q => PREREQ_TYPES.includes(q.questionType + ''))
            .filter(q => q.uuid !== uuid)
            .filter(q => q.prereqUUID !== uuid)
            .map(q => ({ value: q.uuid, text: q.name }));

        return convertArrToObj(options, 'value');
    };
}

export default withSetQuestion(TemplateQuestionModalContainer);
