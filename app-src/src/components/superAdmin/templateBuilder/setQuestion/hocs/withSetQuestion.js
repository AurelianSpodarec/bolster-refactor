import React from 'react';
import { connect } from 'react-redux';

import { PREREQ_TYPES, QUESTION_TYPE_VALUES } from 'constants/shared/templateBuilder';
import updateQuestionField from 'actions/superAdmin/templateBuilder/sync/updateQuestionField';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { convertArrToObj } from 'helpers/generic';
import resetQuestionFields from 'actions/superAdmin/templateBuilder/sync/resetQuestionFields';
import updateQuestionFields from 'actions/superAdmin/templateBuilder/sync/updateQuestionFields';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { updateObj, removeObjItem } from 'helpers/generic';

export default function (WrappedComponent) {
    class WithSetQuestion extends React.Component {
        render = () => (
            <WrappedComponent
                {...this.props}
                standardPrereqOptions={this._getStandardPrereqOptions()}
                allPrereqOptions={this._getAllPrereqOptions()}
                handleInputChange={this.handleInputChange}
                getQuestionData={this.getQuestionData}
                statusOptions={this._getStatusOptions()}
                handlePrefillStatusChange={this.handlePrefillStatusChange}
                handlePrefillStatusValueChange={this.handlePrefillStatusValueChange}
            />
        );
        componentWillUnmount = () => {
            this.props.resetQuestionFields();
        };

        handleInputChange = (name, value) => {
            this.props.updateQuestionField(name, value);
        };

        handlePrefillStatusValueChange = (prefillStatus, value) => {
            const {
                fields: { statusPrefills },
                updateQuestionField,
            } = this.props;
            updateQuestionField('statusPrefills', updateObj(statusPrefills, prefillStatus, value));
        };

        handlePrefillStatusChange = (name, value) => {
            const {
                fields: { prefillStatuses, statusPrefills },
                updateQuestionField,
            } = this.props;

            if (prefillStatuses.length != value.length) {
                prefillStatuses.forEach(status => {
                    if (!value.includes(status)) {
                        updateQuestionField(
                            'statusPrefills',
                            removeObjItem(statusPrefills, status),
                        );
                    }
                });
            }
            updateQuestionField('prefillStatuses', value);
        };
        _getStandardPrereqOptions = () => {
            const {
                questions,
                templateUUID: temUuid,
                companyDropdownOptions: { dropdownOptions },
            } = this.props;
            const { STATUS } = QUESTION_TYPE_VALUES;

            const options = questions
                .filter(q => q.templateUUID === temUuid)
                .filter(q => PREREQ_TYPES.includes(q.questionType + ''))
                .map(function ({ uuid, name, questionType, options, optionType }) {
                    if (optionType) {
                        return {
                            value: uuid,
                            text: name,
                            isStatus: questionType + '' === STATUS,
                            questionType,
                            options: dropdownOptions
                                .filter(dropdownOption => dropdownOption.type === optionType)
                                .map(({ name }) => ({
                                    text: name,
                                    value: name,
                                    manufacturerOption: false,
                                })),
                        };
                    } else {
                        return {
                            value: uuid,
                            text: name,
                            isStatus: questionType + '' === STATUS,
                            questionType,
                            options: options ? options : [],
                        };
                    }
                });

            return convertArrToObj(options, 'value');
        };
        _getAllPrereqOptions = () => {
            const {
                questions,
                templateUUID: temUuid,
                companyDropdownOptions: { dropdownOptions },
                companyManufacturerOptions,
            } = this.props;
            const { STATUS } = QUESTION_TYPE_VALUES;

            const options = questions
                .filter(q => q.templateUUID === temUuid)
                .filter(q => PREREQ_TYPES.includes(q.questionType + ''))
                .map(function ({ uuid, name, questionType, options, optionType }) {
                    const manufacturerOptions = companyManufacturerOptions
                        .filter(({ type }) => type === optionType)
                        .map(({ name, id }) => ({
                            text: name,
                            value: id,
                            manufacturerOption: true,
                        }));

                    const defaultDropdownOptions = dropdownOptions
                        .filter(dropdownOption => dropdownOption.type === optionType)
                        .map(({ name }) => ({
                            text: name,
                            value: name,
                            manufacturerOption: false,
                        }));

                    const allDropdownOptions = [...manufacturerOptions, ...defaultDropdownOptions];

                    if (optionType) {
                        return {
                            value: uuid,
                            text: name,
                            isStatus: questionType + '' === STATUS,
                            questionType,
                            options: allDropdownOptions,
                        };
                    } else {
                        return {
                            value: uuid,
                            text: name,
                            isStatus: questionType + '' === STATUS,
                            questionType,
                            options: options ? options : [],
                        };
                    }
                });

            return convertArrToObj(options, 'value');
        };

        _getStatusOptions = () => {
            const {
                template: { statusOptions = [] },
            } = this.props;
            return statusOptions.map(value => ({
                label: PIN_STATUS_TYPES[value + ''],
                value: value + '',
            }));
        };

        getQuestionData = () => {
            return {
                ...this._getSharedData(),
                ...this._getSpecificData(),
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
                isRequiredVal,
                statusPrefills,
                prereqDropdownValues,
            } = this.props.fields;

            return {
                questionType,
                name,
                prereqUUID,
                isRequired,
                isHidden,
                isPrefill,
                isRequiredVal,
                prefillStatuses: Object.keys(statusPrefills),
                statusPrefills,
                prereqVal: prereqDropdownValues.length ? prereqDropdownValues.join() : prereqVal,
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
                optionType,
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
                templatesReducer: { templates },
                companiesReducer: { companyDropdownOptions, companyManufacturerOptions },
            },
        },
        { templateUUID },
    ) => {
        return {
            fields,
            questions: Object.values(questions),
            template: templates[templateUUID] || {},
            companyDropdownOptions,
            companyManufacturerOptions,
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
        },
    });

    return connect(mapStateToProps, mapDispatchToProps)(WithSetQuestion);
}
