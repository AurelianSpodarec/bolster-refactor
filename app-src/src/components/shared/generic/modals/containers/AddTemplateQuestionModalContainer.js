import React, { Component } from 'react';

import { QUESTION_TYPES } from 'constants/templateBuilder';
import { convertArrToObj } from 'helpers/generic';

import AddTemplateQuestionModal from '../presentational/AddTemplateQuestionModal';
const questionTypeOptions = Object.keys(QUESTION_TYPES).map(type => ({
    text: QUESTION_TYPES[type],
    value: type
}));

class AddTemplateQuestionModalContainer extends Component {
    state = {
        name: '',
        isRequired: false,
        isHidden: false,
        questionTypeOptions: convertArrToObj(questionTypeOptions, 'value'),
        questionType: QUESTION_TYPES.SINGLE_LINE
    };
    render() {
        const {
            questionTypeOptions,
            questionType,
            ...otherFields
        } = this.state;

        return (
            <AddTemplateQuestionModal
                questionTypeOptions={Object.values(questionTypeOptions)}
                questionType={questionTypeOptions[questionType]}
                {...otherFields}
                handleInputChange={this.handleInputChange}
            />
        );
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
}

export default AddTemplateQuestionModalContainer;
