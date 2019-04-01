import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    QUESTION_TYPES,
    PREREQ_TYPES
} from 'constants/superAdmin/templateBuilder';
import { convertArrToObj } from 'helpers/generic';
import hideModal from 'actions/generic/modals/sync/hideModal';
import editQuestion from 'actions/superAdmin/templateBuilder/sync/editQuestion';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';

const questionTypeOptions = Object.keys(QUESTION_TYPES).map(type => ({
    text: QUESTION_TYPES[type],
    value: type
}));

class AddTemplateQuestionModalContainer extends Component {
    state = {
        questionTypeOptions: convertArrToObj(questionTypeOptions, 'value'),
        questionType: 'SINGLE_LINE',
        prereqOptions: {},
        prereqUuid: '',
        prereqVal: '',
        name: '',
        charLimit: 300,
        isRequired: false,
        isHidden: false,
        isPrefill: false
    };

    render() {
        const {
            questionTypeOptions,
            questionType,
            prereqOptions,
            prereqUuid,
            ...otherFields
        } = this.state;

        return (
            <TemplateQuestionFormModal
                questionTypeOptions={Object.values(questionTypeOptions)}
                questionType={questionTypeOptions[questionType]}
                prereqOptions={Object.values(prereqOptions)}
                selectedPrereq={prereqOptions[prereqUuid]}
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
        const { question } = this.props;
        this.setState({ ...question, prereqOptions: this._getPrereqOptions() });
    };

    _getPrereqOptions = () => {
        const { questions, uuid } = this.props;
        const options = questions
            .filter(({ questionType }) => PREREQ_TYPES.includes(questionType))
            .filter(question => question.uuid !== uuid)
            .filter(question => question.prereqUuid !== uuid)
            .map(question => ({
                value: question.uuid,
                text: question.name
            }));

        return convertArrToObj(options, 'value');
    };

    handleInputChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editQuestion, question } = this.props;
        const {
            name,
            isRequired,
            questionType,
            prereqUuid,
            prereqVal,
            isHidden,
            isPrefill
        } = this.state;

        const newSection = {
            ...question,
            name,
            isRequired,
            isHidden,
            isPrefill,
            questionType: questionType,
            prereqUuid,
            prereqVal,
            sort: this._getSort()
        };

        editQuestion(newSection);
    };

    _getSort = () => {
        const { questions, sectionUuid } = this.props;
        const sectionSortList = questions
            .filter(q => q.sectionUuid === sectionUuid)
            .map(q => q.sort);
        return Math.max(0, ...sectionSortList) + 1;
    };
}

const mapStateToProps = ({ templateBuilderReducer }, { uuid }) => ({
    questions: Object.values(templateBuilderReducer.questions),
    question: templateBuilderReducer.questions[uuid]
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    editQuestion: newQuestion => {
        dispatch(editQuestion(newQuestion));
        dispatch(hideModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTemplateQuestionModalContainer);
