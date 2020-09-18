import React from 'react';
import { connect } from 'react-redux';

import updateQuestionField from 'actions/superAdmin/templateBuilder/sync/updateQuestionField';
import setQuestion from 'actions/superAdmin/templateBuilder/sync/setQuestion';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import resetQuestionFields from 'actions/superAdmin/templateBuilder/sync/resetQuestionFields';
import updateQuestionFields from 'actions/superAdmin/templateBuilder/sync/updateQuestionFields';
import { DROPDOWN_OPTION_VALS, PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';
import { updateObj, removeObjItem } from 'helpers/generic';
import { PREREQ_TYPES, QUESTION_TYPE_NUMBERS } from 'constants/shared/templateBuilder';
const { STATUS } = QUESTION_TYPE_NUMBERS;

export default function (WrappedComponent) {
    class WithSetQuestion extends React.Component {
        state = {
            useManufacturingPrereqOptions: false,
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    prereqOptions={this._getPrereqOptions()}
                    prereqValueOptions={this._getPrereqValueOptions()}
                    handleInputChange={this.handleInputChange}
                    getQuestionData={this.getQuestionData}
                    statusOptions={this._getStatusOptions()}
                    handlePrefillStatusChange={this.handlePrefillStatusChange}
                    handlePrefillStatusValueChange={this.handlePrefillStatusValueChange}
                    useManufacturingPrereqOptions={this.state.useManufacturingPrereqOptions}
                    setUseManufacturingPrerqOptions={this.setUseManufacturingPrerqOptions}
                    shouldShowUseManufacturingPrereqOptsSwitch={this._checkShouldShowUseManufacturingPrereqOptsSwitch()}
                />
            );
        }
        componentWillUnmount = () => {
            this.props.resetQuestionFields();
        };

        setUseManufacturingPrerqOptions = val => {
            this.setState({ useManufacturingPrereqOptions: val });
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

        _checkShouldShowUseManufacturingPrereqOptsSwitch = () => {
            const { questionsObj, fields } = this.props;

            if (!fields.prereqUUID) return false;

            const prereq = questionsObj[fields.prereqUUID];
            if (!prereq) return false;

            const { optionType } = prereq;
            const shouldShow = optionType === DROPDOWN_OPTION_VALS.installationTypes;

            return shouldShow;
        };

        _getPrereqOptions = () => {
            const { questions, templateUUID } = this.props;

            const options = questions
                .filter(q => q.templateUUID === templateUUID)
                .filter(q => PREREQ_TYPES.includes(q.questionType))
                .map(q => ({ value: q.uuid, label: q.name }));

            return options;
        };

        _getPrereqValueOptions = () => {
            const { questionsObj, fields } = this.props;

            if (!fields.prereqUUID) return [];

            const prereq = questionsObj[fields.prereqUUID];
            if (!prereq) return [];

            const { questionType, optionType, options } = prereq;
            if (questionType === STATUS) {
                return this._getStatusOptions();
            }

            if (optionType) {
                return this._getDropownOptionsByType(optionType);
            }

            if (options) {
                return options.map(opt => ({
                    label: opt.text,
                    value: opt.id,
                }));
            }

            return [];
        };

        _getStatusOptions = () => {
            const {
                template: { statusOptions = [] },
            } = this.props;

            return statusOptions.map(value => ({
                label: PIN_STATUS_TYPES[`${value}`],
                value: value,
            }));
        };

        _getDropownOptionsByType = optionType => {
            const {
                companyDropdownOptions: { dropdownOptions },
                companyManufacturerOptions,
            } = this.props;

            const { useManufacturingPrereqOptions } = this.state;

            let names = dropdownOptions.filter(opt => opt.type === optionType).map(opt => opt.name);

            if (useManufacturingPrereqOptions) {
                names = companyManufacturerOptions
                    .filter(opt => opt.type === optionType)
                    .map(opt => opt.name)
                    .concat(names);
            }

            const options = [...new Set(names)]
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map(name => ({ label: name, value: name }));

            return options;
        };

        _getManufacturerOptionsByOptionType = optionType => {
            const { companyManufacturerOptions } = this.props;

            const options = companyManufacturerOptions
                .filter(opt => opt.type === optionType)
                .map(opt => ({
                    label: opt.name,
                    value: opt.name,
                }));

            return options;
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
            const VALS = QUESTION_TYPE_NUMBERS;
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

            switch (questionType) {
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
            questionsObj: questions,
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
