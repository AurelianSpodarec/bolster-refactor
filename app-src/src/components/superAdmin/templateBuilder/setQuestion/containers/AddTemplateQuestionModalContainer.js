import React, { Component } from 'react';
import uuid from 'uuid/v1';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';
import withSetQuestion from '../hocs/withSetQuestion';

class AddTemplateQuestionModalContainer extends Component {
    render() {
        const {
            fields: {
                questionType,
                questionTypeOptions,
                prereqUUID,
                ...fields
            },
            hideModal,
            handleInputChange,
            prereqOptions
        } = this.props;

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
                action="Add"
            />
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        const {
            setQuestion,
            sectionUUID,
            templateUUID,
            getQuestionData
        } = this.props;

        const newQuestion = {
            templateUUID,
            sectionUUID,
            uuid: uuid(),
            sort: this._getSort(),
            ...getQuestionData()
        };

        setQuestion(newQuestion);
    };

    _getSort = () => {
        const { questions, sectionUUID } = this.props;
        const sectionSortList = questions
            .filter(q => q.sectionUUID === sectionUUID)
            .map(q => q.sort);

        return Math.max(0, ...sectionSortList) + 1;
    };
}

export default withSetQuestion(AddTemplateQuestionModalContainer);
