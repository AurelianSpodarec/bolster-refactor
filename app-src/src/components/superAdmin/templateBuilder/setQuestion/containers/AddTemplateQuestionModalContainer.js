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

const initialState = {
    questionTypeOptions: convertArrToObj(questionTypeOptions, 'value'),
    questionType: QUESTION_TYPE_VALUES.SINGLE_LINE,
    prereqOptions: {},
    prereqUuid: '',
    prereqVal: '',
    name: '',
    isRequired: false,
    isHidden: false,
    isPrefill: false,
    charLimit: '300',
    maxNum: '',
    options: [],
    maxPhotos: ''
};

class AddTemplateQuestionModalContainer extends Component {
    state = initialState;

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
                hideModal={this.hideModal}
                handleSubmit={this.handleSubmit}
                addOption={this.addOption}
                removeOption={this.removeOption}
                updateOption={this.updateOption}
                emptyOptions={this.emptyOptions}
            />
        );
    }

    componentDidMount = () => {
        this.setState({ prereqOptions: this._getPrereqOptions() });
    };

    componentDidUpdate = (_, prevState) => {
        const { questionType } = this.state;
        if (prevState.questionType !== questionType) {
            this.setState({ ...initialState, questionType });
        }
    };

    handleInputChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    hideModal = e => {
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
            isPrefill,
            options,
            maxNum,
            maxPhotos
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
            sort: this._getSort(),
            options: options.map(({ text }) => text),
            maxNum,
            maxPhotos
        };

        setQuestion(newQuestion);
    };

    addOption = () => {
        const { options } = this.state;
        this.setState({ options: [...options, { text: '', id: uuid() }] });
    };

    removeOption = id => {
        const { options } = this.state;
        this.setState({ options: options.filter(op => op.id !== id) });
    };

    emptyOptions = () => {
        this.setState({ options: [] });
    };

    updateOption = e => {
        e.preventDefault();
        const { value, name } = e.target;
        const { options } = this.state;
        const newOptions = options.map(opt =>
            opt.id === name ? { ...opt, text: value } : opt
        );

        this.setState({ options: newOptions });
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
