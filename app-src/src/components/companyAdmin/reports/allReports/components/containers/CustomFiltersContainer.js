import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { removeObjItem, updateObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import CustomFilter from '../presentational/CustomFilters';
import updateFilterQuestionField from 'actions/companyAdmin/reports/sync/updateFilterQuestionField';

const CustomFilterContainer = ({
    questionOptions,
    removeField,
    field,
    updateFilterQuestionField,
    id
}) => {
    const { selectedQuestions, questionValues } = field;
    const formattedOptions = Object.values(questionOptions).map(
        ({ value, text }) => ({ value, label: text })
    );
    return (
        <CustomFilter
            questionOptions={formattedOptions}
            selectedQuestions={selectedQuestions}
            handleChange={handleChange}
            addOption={addOption}
            removeOption={removeOption}
            updateOption={updateOption}
            questionValues={Object.values(questionValues)}
            removeField={removeField}
        />
    );
    function handleChange(_, options) {
        updateFilterQuestionField(
            field.id,
            updateObj(field, 'selectedQuestions', options)
        );
    }

    function addOption() {
        const id = uuid();
        const updated = updateObj(field.questionValues, id, { id, value: '' });
        updateFilterQuestionField(
            field.id,
            formatField(field.id, field.selectedQuestions, updated)
        );
    }

    function removeOption(id) {
        const updated = {
            ...field,
            questionValues: removeObjItem(field.questionValues, id)
        };
        updateFilterQuestionField(field.id, updated);
    }

    function updateOption({ target: { name, value } }) {
        const updated = updateObj(field.questionValues, name, {
            id: name,
            value
        });

        updateFilterQuestionField(
            id,
            formatField(id, field.selectedQuestions, updated)
        );
    }

    function formatField(id, selectedQuestions, questionValues) {
        return {
            id,
            selectedQuestions,
            questionValues
        };
    }
};

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
