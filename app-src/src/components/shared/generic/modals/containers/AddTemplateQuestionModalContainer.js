import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { QUESTION_TYPES } from 'constants/templateBuilder';
import { convertArrToObj } from 'helpers/generic';
import hideModal from 'actions/generic/modals/sync/hideModal';
import addQuestion from 'actions/templateBuilder/sync/addQuestion';

import AddTemplateQuestionModal from '../presentational/AddTemplateQuestionModal';
const questionTypeOptions = Object.keys(QUESTION_TYPES).map(type => ({
    text: QUESTION_TYPES[type],
    value: type
}));

class AddTemplateQuestionModalContainer extends Component {
    state = {
        name: '',
        isRequired: false,
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
                hideModal={e => {
                    e.preventDefault();
                    this.props.hideModal();
                }}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    handleInputChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { name, isRequired, questionType } = this.state;
        const { addQuestion, sectionUuid = 'test' } = this.props;

        const newSection = {
            name,
            isRequired,
            questionType: questionType,
            sectionUuid,
            uuid: uuid()
        };

        addQuestion(newSection);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    addQuestion: newQuestion => {
        dispatch(addQuestion(newQuestion));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AddTemplateQuestionModalContainer);
