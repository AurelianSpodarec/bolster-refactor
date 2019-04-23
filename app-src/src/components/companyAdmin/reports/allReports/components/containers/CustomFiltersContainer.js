import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import CustomFilter from '../presentational/CustomFilters';
import updateFilterQuestionField from 'actions/companyAdmin/reports/sync/updateFilterQuestionField';
import addFilterQuestion from 'actions/companyAdmin/reports/sync/addFilterQuestion';
import removeFilterQuestion from 'actions/companyAdmin/reports/sync/removeFilterQuestion';
const id = uuid();
class CustomFilterContainer extends Component {
    state = {
        selectedQuestionID: '',
        selectedQuestions: {},
        questionValues: { [id]: { value: '', id } }
    };

    render() {
        console.log(this.state);
        const { selectedQuestionID, questionValues } = this.state;
        const {
            field,
            handleChange,
            removeField,
            questionOptions
        } = this.props;
        return (
            <CustomFilter
                questionOptions={Object.values(questionOptions)}
                selectedQuestion={questionOptions[selectedQuestionID]}
                handleChange={this.handleChange}
                addOption={this.addOption}
                removeOption={this.removeOption}
                updateOption={this.updateOption}
                questionValues={Object.values(questionValues)}
            />
        );
    }

    // when an option is chosen - send this object to redux store, using the questionID as the object key
    // add an empty field/value within this question object.
    // to do that we need to use the questionID, to place the value into the question object.

    handleChange = ({ target: { value, name } }) => {
        const { updateReportFilter } = this.props;
        console.log(value);

        this.setState({
            selectedQuestionID: value
        });
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

    updateOption = e => {
        const { id: fieldID } = this.props;
        const { selectedQuestionID } = this.state;
        e.preventDefault();
        const { name: id, value } = e.target;

        const { updateFilterQuestionField } = this.props;
        const updated = updateObj(this.state.questionValues, id, { id, value });
        this.setState({
            questionValues: updated
        });

        updateFilterQuestionField(
            fieldID,
            this.formatField(fieldID, selectedQuestionID, updated)
        );
    };

    formatField = (fieldID, selectedQuestionID, questionValues) => ({
        fieldID,
        selectedQuestionID,
        questionValues
    });
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            customFilters: { questions }
        }
    }
}) => ({
    customQuestions: questions || []
});

const mapDispatchToProps = dispatch => ({
    updateReportFilter: (name, val) => dispatch(updateReportFilter(name, val)),
    updateFilterQuestionField: (name, val) =>
        dispatch(updateFilterQuestionField(name, val)),
    addFilterQuestion: id => dispatch(addFilterQuestion(id)),
    removeFilterQuestion: id => dispatch(removeFilterQuestion(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomFilterContainer);
