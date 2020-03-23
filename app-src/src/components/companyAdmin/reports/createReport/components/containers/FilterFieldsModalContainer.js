import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import FilterFieldsModal from '../presentational/FilterFieldsModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import updateFilterQuestionField from 'actions/companyAdmin/reports/sync/updateFilterQuestionField';
import { convertArrToObj } from 'helpers/generic';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
import withUpdateOnChange from '../hocs/withUpdateOnChange';

const questionTypeOptions = [
    { label: 'Free Form', value: 1 },
    { label: 'Option oriented', value: 2 },
];

class FilterFieldsModalContainer extends Component {
    state = {
        showFreeForm: true,
        selectedQuestions: [],
        freeFormValues: [],
        optionOrientedVals: [],
    };
    render() {
        const { toggleAddFilter } = this.props;
        const { freeFormValues, optionOrientedVals, selectedQuestions } = this.state;

        return (
            <FilterFieldsModal
                showFreeForm={this._showFreeForm()}
                questionTypeOptions={questionTypeOptions}
                selectedQuestions={selectedQuestions}
                questionOptions={this._getQuestionOptions()}
                freeFormValues={freeFormValues}
                optionOrientedOptions={this._getValidValueOptions()}
                optionOrientedVals={optionOrientedVals}
                break="   vars above - functions below        "
                toggleShowFreeForm={this.toggleShowFreeForm}
                handleChange={this.handleChange}
                handleFreeFormValChange={this.handleFreeFormValChange}
                addFreeFormVal={this.addFreeFormVal}
                removeFreeFormVal={this.removeFreeFormVal}
                toggleAddFilter={toggleAddFilter}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidMount = () => {
        const { field } = this.props;
        // add an option if none exist, makes modal reusable for edit
        if (field) {
            const { selectedQuestions, questionValues, selectedValues } = field;
            this.setState({
                selectedQuestions,
                freeFormValues: questionValues,
                optionOrientedVals: selectedValues,
                showFreeForm: !selectedValues.length,
            });
        } else {
            this.addFreeFormVal();
        }
    };

    _showFreeForm = () => {
        const { selectedQuestions } = this.state;
        const { customQuestions } = this.props;
        const questionsObj = convertArrToObj(customQuestions);

        if (!selectedQuestions.length) return true;
        return selectedQuestions.some(id => {
            const q = questionsObj[id] || {};
            return !q.options;
        });
    };

    toggleShowFreeForm = () => {
        const showFreeForm = !this.state.showFreeForm;
        this.setState({ showFreeForm });
    };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleFreeFormValChange = (index, value) => {
        const vals = [...this.state.freeFormValues];
        vals[index] = value;

        this.setState({
            freeFormValues: vals,
        });
    };

    addFreeFormVal = () => {
        const { freeFormValues } = this.state;

        this.setState({
            freeFormValues: [...freeFormValues, ''],
        });
    };
    //here tom
    removeFreeFormVal = index => {
        const { freeFormValues } = this.state;
        const vals = [...freeFormValues.slice(0, index), ...freeFormValues.slice(index + 1)];
        this.setState({
            freeFormValues: vals,
        });
    };

    handleSubmit = async () => {
        const { selectedQuestions, freeFormValues, optionOrientedVals } = this.state;
        const {
            field,
            updateFilterQuestionField,
            removeFilterQuestion,
            toggleAddFilter,
            customQuestions,
            postFilters,
        } = this.props;

        const newID = uuid();
        const id = field ? field.id : newID;

        const showFreeForm = this._showFreeForm();

        const validQuestionIDs = customQuestions
            .filter(q => (showFreeForm ? !q.options : q.options))
            .map(q => q.id)
            .filter(id => selectedQuestions.includes(id));

        if (!validQuestionIDs.length) {
            if (field) removeFilterQuestion(field.id);
            toggleAddFilter();
            return;
        }

        let filterItem = {
            id,
            selectedQuestions: validQuestionIDs,
            questionValues: showFreeForm ? freeFormValues : [],
            selectedValues: showFreeForm ? [] : optionOrientedVals,
        };

        await updateFilterQuestionField(id, filterItem);
        toggleAddFilter();

        postFilters();
    };

    _getValidValueOptions = () => {
        const { selectedQuestions } = this.state;
        const { customQuestions } = this.props;
        const questionsObj = convertArrToObj(customQuestions);

        const options = selectedQuestions
            .map(id => questionsObj[id])
            .filter(q => q && q.options)
            .map(q => ({ ...q, options: this.formatOptions(q.options) }))
            .reduce((a, b) => a.concat(b.options), []);

        return [...new Set(options)].map(op => ({ label: op, value: op }));
    };

    // ? sometimes the options are a stringified array, this will seperate into normal options
    formatOptions = options => {
        const newOptions = [];
        options.forEach(opt => {
            if (/^\[.*\]$/g.test(opt)) {
                newOptions.push(
                    ...opt
                        // remove [] and "
                        .replace(/[["\]]*/g, '')
                        // split into seperate options
                        .split(',')
                        // remove extra whitespace
                        .map(opt => opt.trim())
                        // remove empty options
                        .filter(opt => !!opt)
                );
            } else newOptions.push(opt);
        });
        return newOptions;
    };

    _getQuestionOptions = () => {
        const showFreeForm = this._showFreeForm();
        const noOptions = !this.state.selectedQuestions.length;
        const { customQuestions } = this.props;

        return customQuestions.map(q => {
            let disabled = !noOptions;
            if (disabled) disabled = showFreeForm ? !!q.options : !q.options;

            return {
                value: q.id,
                name: q.id,
                label: q.name,
                disabled,
            };
        });
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            reportsReducer: {
                fields,
                customFilters: { questionOptions = [], questions },
            },
        },
    },
    { id }
) => ({
    field: fields[id],
    questionOptions: convertArrToObj(questionOptions),
    customQuestions: questions,
});

const mapDispatchToProps = {
    hideModal,
    updateReportFilter,
    updateFilterQuestionField,
    removeFilterQuestion,
};

export default withUpdateOnChange(
    connect(mapStateToProps, mapDispatchToProps)(FilterFieldsModalContainer)
);
