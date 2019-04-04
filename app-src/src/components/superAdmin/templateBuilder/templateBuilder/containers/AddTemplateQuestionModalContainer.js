import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import {
    QUESTION_TYPES,
    PREREQ_TYPES
} from 'constants/superAdmin/templateBuilder';
import { convertArrToObj } from 'helpers/generic';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import addQuestion from 'actions/superAdmin/templateBuilder/sync/addQuestion';

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
                {...otherFields}
                questionTypeOptions={Object.values(questionTypeOptions)}
                questionType={questionTypeOptions[questionType]}
                prereqOptions={Object.values(prereqOptions)}
                selectedPrereq={prereqOptions[prereqUuid]}
                handleInputChange={this.handleInputChange}
                handlePrefieldChange={this.handlePrefieldChange}
                hideModal={this.hideModel}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidMount = () => {
        this.setState({ prereqOptions: this._getPrereqOptions() });
    };

    handleInputChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    hideModel = e => {
        e.preventDefault();
        this.props.hideModal();
    };

    handleSubmit = e => {
        e.preventDefault();
        const { addQuestion, sectionUuid } = this.props;
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
            name,
            isRequired,
            isHidden,
            isPrefill,
            questionType: questionType,
            sectionUuid,
            uuid: uuid(),
            prereqUuid,
            prereqVal,
            sort: this._getSort()
        };

        addQuestion(newSection);
    };

    _getPrereqOptions = () => {
        const options = this.props.questions
            .filter(({ questionType }) => PREREQ_TYPES.includes(questionType))
            .map(({ uuid, name }) => ({
                value: uuid,
                text: name
            }));

        return convertArrToObj(options, 'value');
    };

    _getSort = () => {
        const { questions, sectionUuid } = this.props;
        const sectionSortList = questions
            .filter(q => q.sectionUuid === sectionUuid)
            .map(q => q.sort);
        return Math.max(0, ...sectionSortList) + 1;
    };
}

const mapStateToProps = ({ superAdmin: { templateQuestionsReducer } }) => ({
    questions: Object.values(templateQuestionsReducer.questions)
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
