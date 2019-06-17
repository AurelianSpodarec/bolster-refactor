import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import FilterFieldsModal from '../presentational/FilterFieldsModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import updateFilterQuestionField from 'actions/companyAdmin/reports/sync/updateFilterQuestionField';
import { convertArrToObj } from 'helpers/generic';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';

const questionTypeOptions = [
    { label: 'Free Form', value: 1 },
    { label: 'Option oriented', value: 2 }
];

class FilterFieldsModalContainer extends Component {
    state = {
        showFreeForm: true,
        selectedQuestions: [],
        freeFormValues: [],
        optionOrientedVals: []
    };
    render() {
        const { hideModal, customQuestions } = this.props;
        const {
            showFreeForm,
            freeFormValues,
            optionOrientedVals,
            selectedQuestions
        } = this.state;

        return (
            <FilterFieldsModal
                showFreeForm={showFreeForm}
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
                hideModal={hideModal}
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
                showFreeForm: !selectedValues.length
            });
        } else {
            this.addFreeFormVal();
        }
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
            freeFormValues: vals
        });
    };

    addFreeFormVal = () => {
        const { freeFormValues } = this.state;

        this.setState({
            freeFormValues: [...freeFormValues, '']
        });
    };

    removeFreeFormVal = index => {
        const { freeFormValues } = this.state;
        const vals = [
            ...freeFormValues.slice(0, index),
            ...freeFormValues.slice(index + 1)
        ];
        this.setState({
            freeFormValues: vals
        });
    };

    handleSubmit = () => {
        const {
            showFreeForm,
            selectedQuestions,
            freeFormValues,
            optionOrientedVals
        } = this.state;
        const {
            field,
            updateFilterQuestionField,
            hideModal,
            removeFilterQuestion
        } = this.props;

        const newID = uuid();
        const id = field ? field.id : newID;

        const validQuestionIDs = this._getFilteredQuestions().map(
            ({ id }) => id
        );
        const validSelectedQs = selectedQuestions.filter(id =>
            validQuestionIDs.includes(id)
        );

        if (!validSelectedQs.length) {
            if (field) removeFilterQuestion(field.id);
            hideModal();
            return;
        }

        let filterItem = {
            id,
            selectedQuestions: validSelectedQs,
            questionValues: showFreeForm ? freeFormValues : [],
            selectedValues: showFreeForm ? [] : optionOrientedVals
        };

        updateFilterQuestionField(id, filterItem);
        hideModal();
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
        const { selectedQuestions } = this.state;
        const { customQuestions } = this.props;
        const questionsObj = convertArrToObj(customQuestions);

        const options = selectedQuestions
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
}

const mapStateToProps = (
    {
        companyAdmin: {
            reportsReducer: {
                fields,
                customFilters: { questionOptions = [], questions }
            }
        }
    },
    { id }
) => ({
    field: fields[id],
    questionOptions: convertArrToObj(questionOptions),
    customQuestions: questions
});

const mapDispatchToProps = {
    hideModal,
    updateReportFilter,
    updateFilterQuestionField,
    removeFilterQuestion
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterFieldsModalContainer);
