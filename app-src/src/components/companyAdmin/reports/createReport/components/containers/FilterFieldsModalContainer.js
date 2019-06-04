import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import FilterFieldsModal from '../presentational/FilterFieldsModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import updateFilterQuestionField from 'actions/companyAdmin/reports/sync/updateFilterQuestionField';
import {
    updateObj,
    removeObjItem,
    convertArrToObj,
    removeDuplicates
} from 'helpers/generic';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';

class FilterFieldsModalContainer extends Component {
    render() {
        const {
            customQuestions,
            field: { selectedQuestions, questionValues }
        } = this.props;
        const uniqueOptions = removeDuplicates(customQuestions, true);
        const formattedOptions = uniqueOptions.map(
            ({ id: value, name: text }) => ({
                value,
                text,
                name: value
            })
        );
        return (
            <FilterFieldsModal
                questionOptions={formattedOptions}
                selectedQuestions={selectedQuestions}
                handleChange={this.handleChange}
                addOption={this.addOption}
                removeOption={this.removeOption}
                updateOption={this.updateOption}
                questionValues={Object.values(questionValues)}
                saveField={this.saveField}
            />
        );
    }

    handleChange = (_, options) => {
        const { updateFilterQuestionField, field } = this.props;
        updateFilterQuestionField(
            field.id,
            updateObj(field, 'selectedQuestions', options)
        );
    };

    componentDidMount = () => {
        const questionValues = Object.values(this.props.field.questionValues);
        // add an option if none exist, makes modal reusable for edit
        if (!questionValues.length) this.addOption();
    };

    addOption = () => {
        const { field, updateFilterQuestionField } = this.props;
        const id = uuid();
        const updated = updateObj(field.questionValues, id, { id, value: '' });
        updateFilterQuestionField(
            field.id,
            this.formatField(field.id, field.selectedQuestions, updated)
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

    updateOption = (name, value) => {
        const { field, id, updateFilterQuestionField } = this.props;
        const updated = updateObj(field.questionValues, name, {
            id: name,
            value
        });
        updateFilterQuestionField(
            id,
            this.formatField(id, field.selectedQuestions, updated)
        );
    };

    formatField = (id, selectedQuestions, questionValues) => ({
        id,
        selectedQuestions,
        questionValues
    });

    saveField = e => {
        e.preventDefault();
        const { hideModal, removeFilterQuestion, field } = this.props;
        // remove if nothing selected
        if (
            !field.selectedQuestions.length &&
            Object.values(field.questionValues).every(({ value }) => !value)
        ) {
            removeFilterQuestion(field.id);
        }
        hideModal();
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            reportsReducer: { fields }
        }
    },
    { id, customQuestions }
) => ({
    field: fields[id] || {},
    questionsObj: convertArrToObj(customQuestions)
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
