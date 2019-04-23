import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import CustomFilter from '../presentational/CustomFilters';
import updateFilterQuestionField from 'actions/companyAdmin/reports/sync/updateFilterQuestionField';
class CustomFilterContainer extends Component {
    render() {
        const { questionOptions, removeField, field } = this.props;
        const { selectedQuestions, questionValues } = field;
        const formattedOptions = Object.values(questionOptions).map(
            ({ value, text }) => ({ value, label: text })
        );
        return (
            <CustomFilter
                questionOptions={formattedOptions}
                selectedQuestions={selectedQuestions}
                handleChange={this.handleChange}
                addOption={this.addOption}
                removeOption={this.removeOption}
                updateOption={this.updateOption}
                questionValues={Object.values(questionValues)}
                removeField={removeField}
            />
        );
    }

    handleChange = (_, options) => {
        const { field, updateFilterQuestionField } = this.props;
        updateFilterQuestionField(
            field.id,
            updateObj(field, 'selectedQuestions', options)
        );
    };

    _getQuestionsOptions = () => {
        const { customQuestions } = this.props;

        const options = customQuestions.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };

    addOption = e => {
        e.preventDefault();
        const { field, updateFilterQuestionField } = this.props;
        const id = uuid();
        const { questionValues } = field;
        const updated = updateObj(questionValues, id, { id, value: '' });
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

    updateOption = ({ target: { name: id, value } }) => {
        const { id: fieldID, updateFilterQuestionField, field } = this.props;

        const updated = updateObj(field.questionValues, id, { id, value });

        updateFilterQuestionField(
            fieldID,
            this.formatField(fieldID, field.selectedQuestions, updated)
        );
    };

    formatField = (id, selectedQuestions, questionValues) => ({
        id,
        selectedQuestions,
        questionValues
    });
}

const mapStateToProps = (
    {
        companyAdmin: {
            reportsReducer: {
                customFilters: { questions },
                fields
            }
        }
    },
    ownProps
) => ({
    customQuestions: questions || [],
    field: fields[ownProps.id] || {}
});

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => dispatch(updateReportFilter(name, val)),
    updateFilterQuestionField: (name, val) =>
        dispatch(updateFilterQuestionField(name, val))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomFilterContainer);
