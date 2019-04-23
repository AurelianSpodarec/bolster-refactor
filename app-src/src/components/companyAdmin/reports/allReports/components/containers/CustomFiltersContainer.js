import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import CustomFilter from '../presentational/CustomFilters';
import updateFilterQuestionField from 'actions/companyAdmin/reports/sync/updateFilterQuestionField';
const id = uuid();
class CustomFilterContainer extends Component {
    state = {
        selectedQuestionID: '',
        selectedQuestions: {},
        questionValues: { [id]: { value: '', id } }
    };

    render() {
        const { selectedQuestionID, questionValues } = this.state;
        const { questionOptions, removeField } = this.props;
        return (
            <CustomFilter
                questionOptions={Object.values(questionOptions)}
                selectedQuestion={questionOptions[selectedQuestionID]}
                handleChange={this.handleChange}
                addOption={this.addOption}
                removeOption={this.removeOption}
                updateOption={this.updateOption}
                questionValues={Object.values(questionValues)}
                removeField={removeField}
            />
        );
    }

    handleChange = ({ target: { value } }) => {
        const { field } = this.props;
        this.setState({
            selectedQuestionID: value
        });
        updateObj(field, 'selectedQuestionID', value);
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
        const { questionValues } = this.state;
        const id = uuid();
        this.setState({
            questionValues: { ...questionValues, [id]: { value: '', id } }
        });
    };

    removeOption = id => {
        this.setState({
            questionValues: removeObjItem(this.state.questionValues, id)
        });
    };

    updateOption = ({ target: { name: id, value } }) => {
        const { id: fieldID, updateFilterQuestionField } = this.props;

        const { selectedQuestionID } = this.state;
        const updated = updateObj(this.state.questionValues, id, { id, value });
        this.setState({
            questionValues: updated
        });

        updateFilterQuestionField(
            fieldID,
            this.formatField(fieldID, selectedQuestionID, updated)
        );
    };

    formatField = (id, selectedQuestionID, questionValues) => ({
        id,
        selectedQuestionID,
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
    field: fields[ownProps.id]
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
