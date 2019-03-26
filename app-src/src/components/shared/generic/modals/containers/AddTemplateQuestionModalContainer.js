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
        propsQuestions: this.props.questions.filter(
            question => question.sectionUuid === this.props.sectionUuid
        ),
        prereqFields: [
            {
                text: '##Test Field 1##',
                value: '1',
                uuid: '1',
                fieldValue: '2'
            },
            { text: '##Test Field 2##', value: '2', uuid: '2', fieldValue: '3' }
        ],
        prerequisite: {}
    };

    render() {
        const {
            questionTypeOptions,
            questionType,
            prereqFields,
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
                prerequisite={prerequisite}
                prereqFields={prereqFields}
                hideModal={e => {
                    e.preventDefault();
                    this.props.hideModal();
                }}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    //filter question on mount or update to get questions for this section (uuid)

    //need to add questions to prereq dropdown

    componentDidUpdate = prevProps => {
        //Need to update questions to the field
        console.log(
            'prevProps questions = ' + Object.values(prevProps.questions).length
        );
        console.log(
            'current props question = ' +
                Object.values(this.props.questions).length
        );

        // this.setState({
        //     ...this.state,
        //     prereqFields: Object.values(this.props.questions).map(question => ({
        //         text: question.name,
        //         value: question.uuid
        //     }))
        // });
        // if (
        //     Object.values(prevProps.questions).length <
        //     Object.values(this.props.questions).length
        // ) {
        //     console.log('hi');

        // }
    };
    handleInputChange = ({ target: { type, value, name, checked } }) => {
        this.setState({ [name]: type === 'checkbox' ? checked : value });
    };

    handlePrefieldChange = ({ target: { value } }) => {
        this.setState({
            prerequisite: this.state.prereqFields[value]
        });
        console.log(this.state);
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
