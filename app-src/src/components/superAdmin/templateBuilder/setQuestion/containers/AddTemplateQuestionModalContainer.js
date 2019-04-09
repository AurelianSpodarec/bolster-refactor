import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import {
    QUESTION_TYPES,
    PREREQ_TYPES,
    QUESTION_TYPE_VALUES
} from 'constants/superAdmin/templateBuilder';
import { convertArrToObj } from 'helpers/generic';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';

import TemplateQuestionFormModal from '../presentational/TemplateQuestionFormModal';

const questionTypeOptions = Object.keys(QUESTION_TYPES).map(type => ({
    text: QUESTION_TYPES[type],
    value: type
}));

class AddTemplateQuestionModalContainer extends Component {
    state = {
        questionTypeOptions: convertArrToObj(questionTypeOptions, 'value'),
        questionType: QUESTION_TYPE_VALUES.SINGLE_LINE,
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
                action="Add"
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
        const { setQuestion, sectionUUID, templateUUID } = this.props;
        const {
            name,
            isRequired,
            questionType,
            prereqUuid,
            prereqVal,
            charLimit,
            isHidden,
            isPrefill
        } = this.state;

        const newQuestion = {
            name,
            isRequired,
            isHidden,
            isPrefill,
            questionType,
            templateUUID,
            sectionUUID,
            uuid: uuid(),
            prereqUuid,
            prereqVal,
            charLimit,
            sort: this._getSort()
        };

        setQuestion(newQuestion);
    };

    _getPrereqOptions = () => {
        const { questions, templateUUID: temUuid } = this.props;
        const options = questions
            .filter(({ templateUUID }) => templateUUID === temUuid)
            .filter(({ questionType }) => PREREQ_TYPES.includes(questionType))
            .map(({ uuid, name }) => ({ value: uuid, text: name }));

        return convertArrToObj(options, 'value');
    };

    _getSort = () => {
        const { questions, sectionUUID } = this.props;
        const sectionSortList = questions
            .filter(q => q.sectionUUID === sectionUUID)
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
    setQuestion: newQuestion => {
        dispatch(setQuestion(newQuestion));
        dispatch(hideModal());
    }
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTemplateQuestionModalContainer);

export default WithConnect;
