import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { convertArrToObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import CustomFilter from '../presentational/CustomFilters';

class CustomFilterContainer extends Component {
    state = {
        selectedQuestionID: ''
        // questionValues:[{ value: '', id: uuid() }]
    };

    render() {
        const { selectedQuestionID } = this.state;

        const questionsOptions = this._getQuestionsOptions();

        return (
            <CustomFilter
                questionsOptions={Object.values(questionsOptions)}
                selectedQuestion={questionsOptions[selectedQuestionID]}
                handleChange={this.handleChange}
            />
        );
    }

    //when an option is chosen - send this object to redux store, using the questionID as the object key
    //add an empty field/value within this question object.
    //todo that we need to use the questionID, to place the value into the question object.

    handleChange = ({ target: { value, name } }) => {
        const { updateReportFilter } = this.props;
        console.log(value);

        this.setState({
            selectedQuestionID: value
        });
        // updateReportFilter(name, value);
    };

    _getQuestionsOptions = () => {
        const { customQuestions } = this.props;

        const options = customQuestions.map(({ id, name }) => ({
            value: id,
            text: name
        }));

        return convertArrToObj(options, 'value');
    };

    //unused
    addOption = e => {
        e.preventDefault();
        const { questionValues } = this.state;

        //action to add to redux store
        this.setState({
            questionValues: [...questionValues, { value: '', id: uuid() }]
        });
    };
    //unused
    removeOption = (e, id) => {
        e.preventDefault();
        const { options, updateQuestionField } = this.props;
        updateQuestionField('options', options.filter(op => op.id !== id));
    };
    //unused
    updateOption = e => {
        e.preventDefault();
        const { name: id, value } = e.target;

        const { options, updateQuestionField } = this.props;

        const updated = options.map(opt =>
            opt.id === id ? { ...opt, value: value } : opt
        );

        updateQuestionField('options', updated);
    };
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
    updateReportFilter: (name, val) => {
        dispatch(updateReportFilter(name, val));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomFilterContainer);
