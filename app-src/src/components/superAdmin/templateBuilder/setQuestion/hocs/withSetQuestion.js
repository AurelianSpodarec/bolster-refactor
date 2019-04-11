import React from 'react';
import { connect } from 'react-redux';

import {
    PREREQ_TYPES,
    QUESTION_TYPE_VALUES
} from 'constants/superAdmin/templateBuilder';
import updateQuestionField from 'actions/superAdmin/templateBuilder/sync/updateQuestionField';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { convertArrToObj } from 'helpers/generic';
import resetQuestionFields from 'actions/superAdmin/templateBuilder/sync/resetQuestionFields';
import updateQuestionFields from 'actions/superAdmin/templateBuilder/sync/updateQuestionFields';

export default function(WrappedComponent) {
    class WithSetQuestion extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    prereqOptions={this._getPrereqOptions()}
                    handleInputChange={this.handleInputChange}
                    getQuestionData={this.getQuestionData}
                />
            );
        }

        componentWillUnmount = () => {
            const { resetQuestionFields } = this.props;
            resetQuestionFields();
        };

        handleInputChange = e => {
            const { type, value, name, checked } = e.target;
            const { updateQuestionField } = this.props;
            updateQuestionField(name, type === 'checkbox' ? checked : value);
        };

        _getPrereqOptions = () => {
            const { questions, templateUUID: temUuid } = this.props;
            const options = questions
                .filter(q => q.templateUUID === temUuid)
                .filter(q => PREREQ_TYPES.includes(q.questionType))
                .map(({ uuid, name }) => ({ value: uuid, text: name }));

            return convertArrToObj(options, 'value');
        };

        getQuestionData = () => {
            return {
                ...this._getSharedData(),
                dynamicFields: this._getSpecificData()
            };
        };

        _getSharedData = () => {
            const {
                questionType,
                name,
                prereqUuid,
                prereqVal,
                isRequired,
                isHidden,
                isPrefill
            } = this.props.fields;

            return {
                questionType,
                name,
                prereqUuid,
                prereqVal,
                isRequired,
                isHidden,
                isPrefill
            };
        };

        _getSpecificData = () => {
            const VALS = QUESTION_TYPE_VALUES;
            const {
                charLimit,
                maxNum,
                options,
                maxPhotos,
                questionType,
                canCompanyEdit
            } = this.props.fields;

            switch (questionType) {
                case VALS.SINGLE_LINE:
                case VALS.MULTI_LINE:
                    return { charLimit };
                case VALS.NUMBER:
                    return { maxNum };
                case VALS.DROPDOWN:
                case VALS.MULTI_DROPDOWN:
                case VALS.RADIO:
                    return { options, canCompanyEdit };
                case VALS.MULTI_PHOTO:
                    return { maxPhotos };
                default:
                    return {};
            }
        };
    }

    const mapStateToProps = ({
        superAdmin: {
            templateQuestionFormReducer: { fields },
            templateQuestionsReducer: { questions }
        }
    }) => ({
        fields,
        questions: Object.values(questions)
    });

    const mapDispatchToProps = dispatch => ({
        updateQuestionField: (name, value) => {
            dispatch(updateQuestionField(name, value));
        },
        updateQuestionFields: fields => {
            dispatch(updateQuestionFields(fields));
        },
        setQuestion: question => {
            dispatch(setQuestion(question));
            dispatch(hideModal());
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        resetQuestionFields: () => {
            dispatch(resetQuestionFields());
        }
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithSetQuestion);
}
