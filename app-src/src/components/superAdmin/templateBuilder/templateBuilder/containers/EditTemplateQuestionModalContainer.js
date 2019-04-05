import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    QUESTION_TYPES,
    PREREQ_TYPES
} from 'constants/superAdmin/templateBuilder';
import { convertArrToObj } from 'helpers/generic';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';

import TemplateQuestionFormModal from '../../../../superAdmin/templateBuilder/templateBuilder/presentational/TemplateQuestionFormModal';

const questionTypeOptions = Object.keys(QUESTION_TYPES).map(type => ({
    text: QUESTION_TYPES[type],
    value: type
}));

class AddTemplateQuestionModalContainer extends Component {
    state = {
        questionTypeOptions: convertArrToObj(questionTypeOptions, 'value'),
        questionType: '1',
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
                action="Edit"
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
        const { questions, uuid, question } = this.props;
        const options = questions
            .filter(({ questionType }) => PREREQ_TYPES.includes(questionType))
            .filter(q => q.templateUUID === question.templateUUID)
            .filter(q => q.uuid !== uuid)
            .filter(q => q.prereqUuid !== uuid)
            .map(q => ({ value: q.uuid, text: q.name }));

        return convertArrToObj(options, 'value');
    };

    handleInputChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { setQuestion, question } = this.props;
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
            prereqVal
        };

        setQuestion(newSection);
    };
}

const mapStateToProps = (
    { superAdmin: { templateQuestionsReducer } },
    { uuid }
) => ({
    questions: Object.values(templateQuestionsReducer.questions),
    question: templateQuestionsReducer.questions[uuid]
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    setQuestion: newQuestion => {
        dispatch(setQuestion(newQuestion));
        dispatch(hideModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTemplateQuestionModalContainer);
