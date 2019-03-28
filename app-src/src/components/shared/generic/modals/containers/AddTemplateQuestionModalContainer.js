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
        questionTypeOptions: convertArrToObj(questionTypeOptions, 'value'),
        questionType: 'SINGLE_LINE',
        prerequisite: '',
        name: '',
        charLimit: 300,
        isRequired: false
    };

    render() {
        const {
            questionTypeOptions,
            questionType,
            prerequisite,
            ...otherFields
        } = this.state;
        const prereqOptions = this._getPrereqOptions();
        console.log(questionTypeOptions);
        console.log(questionType);
        console.log(questionTypeOptions[questionType]);
        return (
            <AddTemplateQuestionModal
                questionTypeOptions={Object.values(questionTypeOptions)}
                questionType={questionTypeOptions[questionType]}
                prereqOptions={Object.values(prereqOptions)}
                prerequisite={prereqOptions[prerequisite]}
                {...otherFields}
                handleInputChange={this.handleInputChange}
                handlePrefieldChange={this.handlePrefieldChange}
                hideModal={e => {
                    e.preventDefault();
                    this.props.hideModal();
                }}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    _getPrereqOptions = () => {
        const options = this.props.questions.map(({ uuid, name }) => ({
            value: uuid,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };

    handleInputChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { name, isRequired, questionType, prerequisite } = this.state;
        const { addQuestion, sectionUuid } = this.props;

        const newSection = {
            name,
            isRequired,
            questionType: questionType,
            sectionUuid,
            uuid: uuid(),
            prereqUuid: prerequisite
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
