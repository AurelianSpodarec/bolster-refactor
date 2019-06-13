import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import FilterFieldsModal from '../presentational/FilterFieldsModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import updateFilterQuestionField from 'actions/companyAdmin/reports/sync/updateFilterQuestionField';
import { updateObj, removeObjItem, convertArrToObj } from 'helpers/generic';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
import updateFilterQuestionVals from 'actions/companyAdmin/reports/sync/updateFilterQuestionVals';

class FilterFieldsModalContainer extends Component {
    state = {
        showFreeForm: true
    };
    render() {
        const {
            field: { selectedQuestions, questionValues, selectedValues },
            questionOptions
        } = this.props;

        console.log(questionOptions);
        return (
            <FilterFieldsModal
                toggleShowFreeForm={this.toggleShowFreeForm}
                showFreeFormOptions={this._getShowFreeFormOptions()}
                showFreeForm={this.state.showFreeForm}
                questionOptions={this._getQuestionOptions()}
                validValueOptions={this._getValidValueOptions()}
                selectedQuestions={selectedQuestions}
                handleChange={this.handleChange}
                addOption={this.addOption}
                removeOption={this.removeOption}
                updateOption={this.updateOption}
                questionValues={Object.values(questionValues)}
                saveField={this.saveField}
                hideModal={this.handleCancel}
                customOptions={questionOptions}
                updateSelectedValues={this.updateSelectedValues}
                selectedValues={selectedValues}
            />
        );
    }

    componentDidMount = () => {
        const questionValues = Object.values(this.props.field.questionValues);
        // add an option if none exist, makes modal reusable for edit
        if (!questionValues.length) this.addOption();
    };

    toggleShowFreeForm = () => {
        const showFreeForm = !this.state.showFreeForm;
        this.setState({ showFreeForm });
    };

    _getShowFreeFormOptions = () => {
        return [
            { label: 'Free Form', value: 1 },
            { label: 'Option oriented', value: 2 }
        ];
    };

    _getFilteredQuestions = () => {
        const { customQuestions } = this.props;
        const { showFreeForm } = this.state;
        const questionsObj = convertArrToObj(customQuestions);

        return [...new Set(customQuestions.map(q => q.id))]
            .map(id => questionsObj[id])
            .filter(({ options }) => (showFreeForm ? !options : !!options));
    };

    _getValidValueOptions = () => {
        const { field, customQuestions } = this.props;
        const questionsObj = convertArrToObj(customQuestions);

        const options = field.selectedQuestions
            .map(id => questionsObj[id])
            .filter(q => q && q.options)
            .reduce((a, b) => a.concat(b.options), []);

        return [...new Set(options)].map(op => ({ label: op, value: op }));
    };

    _getQuestionOptions = () => {
        return this._getFilteredQuestions().map(q => ({
            value: q.id,
            name: q.id,
            label: q.name
        }));
    };

    handleChange = (_, options) => {
        const { updateFilterQuestionField, field } = this.props;
        updateFilterQuestionField(
            field.id,
            updateObj(field, 'selectedQuestions', options)
        );
    };

    addOption = () => {
        const { field, updateFilterQuestionField } = this.props;

        const id = uuid();
        const updated = updateObj(field.questionValues, id, { id, value: '' });
        updateFilterQuestionField(
            field.id,
            this.formatField(
                field.id,
                field.selectedQuestions,
                updated,
                field.selectedValues
            )
        );
    };

    removeOption = id => {
        const { field, updateFilterQuestionField } = this.props;
        const updated = {
            ...field,
            questionValues: removeObjItem(field.questionValues, id)
        };
        updateFilterQuestionField(field.id, updated);
    };

    updateSelectedValues = (_, value) => {
        const { field, updateFilterQuestionVals } = this.props;

        updateFilterQuestionVals(field.id, value);
    };

    updateOption = (name, value) => {
        const { field, id, updateFilterQuestionField } = this.props;
        const updated = updateObj(field.questionValues, name, {
            id: name,
            value
        });
        updateFilterQuestionField(
            id,
            this.formatField(
                id,
                field.selectedQuestions,
                updated,
                field.selectedValues
            )
        );
    };

    formatField = (id, selectedQuestions, questionValues, selectedValues) => ({
        id,
        selectedQuestions,
        questionValues,
        selectedValues
    });

    saveField = e => {
        e.preventDefault();
        const { hideModal, removeFilterQuestion, field } = this.props;
        // remove if nothing selected
        if (!this.state.showFreeForm) {
            Object.keys(field.questionValues).forEach(key =>
                this.removeOption(key)
            );
        } else {
            this.updateSelectedValues([]);
        }

        if (
            !field.selectedQuestions.length &&
            Object.values(field.questionValues).every(({ value }) => !value)
        ) {
            removeFilterQuestion(field.id);
        }

        hideModal();
    };

    handleCancel = () => {
        const { hideModal, removeFilterQuestion, field } = this.props;
        // remove if nothing selected
        removeFilterQuestion(field.id);
        hideModal();
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            reportsReducer: {
                fields,
                customFilters: { questionOptions = [] }
            }
        }
    },
    { id, customQuestions }
) => ({
    field: fields[id] || {},
    questionsObj: convertArrToObj(customQuestions),
    questionOptions: convertArrToObj(questionOptions)
});

const mapDispatchToProps = {
    hideModal,
    updateReportFilter,
    updateFilterQuestionField,
    removeFilterQuestion,
    updateFilterQuestionVals
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterFieldsModalContainer);
