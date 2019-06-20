import React from 'react';
import { connect } from 'react-redux';

import {
    PREREQ_TYPES,
    QUESTION_TYPE_VALUES
} from 'constants/shared/templateBuilder';
import updateQuestionField from 'actions/superAdmin/templateBuilder/sync/updateQuestionField';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { convertArrToObj } from 'helpers/generic';
import resetQuestionFields from 'actions/superAdmin/templateBuilder/sync/resetQuestionFields';
import updateQuestionFields from 'actions/superAdmin/templateBuilder/sync/updateQuestionFields';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

export default function(WrappedComponent) {
    class WithSetQuestion extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    prereqOptions={this._getPrereqOptions()}
                    handleInputChange={this.handleInputChange}
                    getQuestionData={this.getQuestionData}
                    statusOptions={this._getStatusOptions()}
                />
            );
        }

        componentWillUnmount = () => {
            const { resetQuestionFields } = this.props;
            resetQuestionFields();
        };

        handleInputChange = (name, value) => {
            const { updateQuestionField } = this.props;
            updateQuestionField(name, value);
        };

        _getPrereqOptions = () => {
            const { questions, templateUUID: temUuid } = this.props;
            const { STATUS } = QUESTION_TYPE_VALUES;
            const options = questions
                .filter(q => q.templateUUID === temUuid)
                .filter(q => PREREQ_TYPES.includes(q.questionType + ''))
                .map(({ uuid, name, questionType }) => ({
                    value: uuid,
                    text: name,
                    isStatus: questionType + '' === STATUS
                }));

            return convertArrToObj(options, 'value');
        };

        _getStatusOptions = () => {
            const {
                template: { statusOptions = [] }
            } = this.props;
            return statusOptions.map(value => ({
                label: PIN_STATUS_TYPES[value + ''],
                value: value + ''
            }));
        };

        getQuestionData = () => {
            return {
                ...this._getSharedData(),
                ...this._getSpecificData()
            };
        };

        _getSharedData = () => {
            const {
                questionType,
                name,
                prereqUUID,
                prereqVal,
                isRequired,
                isHidden,
                isPrefill,
                isRequiredVal
            } = this.props.fields;

            return {
                questionType,
                name,
                prereqUUID,
                prereqVal,
                isRequired,
                isHidden,
                isPrefill,
                isRequiredVal
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
                canCompanyEdit,
                defaultValue,
                optionType
            } = this.props.fields;

            switch (questionType + '') {
                case VALS.SINGLE_LINE:
                case VALS.MULTI_LINE:
                    return { charLimit };
                case VALS.NUMBER:
                    return { maxNum };
                case VALS.DROPDOWN:
                case VALS.MULTI_DROPDOWN:
                case VALS.MULTI_MULTI_DROPDOWN:
                case VALS.RADIO:
                    return { options, canCompanyEdit, defaultValue };
                case VALS.MULTI_PHOTO:
                    return { maxPhotos };
                case VALS.DROPDOWN_OPTIONS:
                case VALS.MULTI_DROPDOWN_OPTIONS:
                case VALS.MULTI_MULTI_DROPDOWN_OPTIONS:
                    return { optionType };
                default:
                    return {};
            }
        };
    }

    const mapStateToProps = (
        {
            superAdmin: {
                templateQuestionFormReducer: { fields },
                templateQuestionsReducer: { questions },
                templatesReducer: { templates }
            }
        },
        { templateUUID }
    ) => {
        return {
            fields,
            questions: Object.values(questions),
            template: templates[templateUUID] || {}
        };
    };

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
