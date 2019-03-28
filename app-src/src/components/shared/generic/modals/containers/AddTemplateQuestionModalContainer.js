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
        prereqOptions: {},
        prerequisite: '',
        prerequisiteVal: '',
        name: '',
        charLimit: 300,
        isRequired: false
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

    componentDidMount = () => {
        this.setState({ prereqOptions: this._getPrereqOptions() });
    };

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
        const { addQuestion, sectionUuid } = this.props;
        const {
            name,
            isRequired,
            questionType,
            prerequisite,
            prerequisiteVal
        } = this.state;

        const newSection = {
            name,
            isRequired,
            questionType: questionType,
            sectionUuid,
            uuid: uuid(),
            prereqUuid: prerequisite,
            prerequisiteVal
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
