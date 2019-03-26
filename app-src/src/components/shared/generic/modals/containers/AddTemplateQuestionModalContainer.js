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
        questionType: QUESTION_TYPES.SINGLE_LINE,
        prereqOptions: {
            '1': { text: '##Test Field 1##', value: '1' },
            '2': { text: '##Test Field 2##', value: '2' },
            '3': { text: '##Test Field 3##', value: '3' }
        },
        prerequisite: ''
    };

    render() {
        const {
            questionTypeOptions,
            questionType,
            prereqOptions,
            prerequisite,
            ...otherFields
        } = this.state;

        return (
            <AddTemplateQuestionModal
                questionTypeOptions={Object.values(questionTypeOptions)}
                questionType={questionTypeOptions[questionType]}
                {...otherFields}
                handleInputChange={this.handleInputChange}
                handlePrefieldChange={this.handlePrefieldChange}
                prerequisite={prereqOptions[prerequisite]}
                prereqOptions={Object.values(prereqOptions)}
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
        const { name, isRequired, questionType, prerequisite } = this.state;
        const { addQuestion, sectionUuid = 'test' } = this.props;

        const newSection = {
            name,
            isRequired,
            questionType: questionType,
            sectionUuid,
            uuid: uuid(),
            preUuid: prerequisite.uuid,
            preValue: prerequisite.value
        };

        addQuestion(newSection);
    };
}

const mapStateToProps = ({ templateBuilderReducer }) => ({
    questions: Object.values(templateBuilderReducer.questions)
});

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
    mapStateToProps,
    mapDispatchToProps
)(AddTemplateQuestionModalContainer);
