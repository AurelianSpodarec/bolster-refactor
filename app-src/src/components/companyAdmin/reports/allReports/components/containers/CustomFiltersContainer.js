import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertArrToObj } from 'helpers/generic';
import updateReportFilter from 'actions/companyAdmin/reports/sync/updateReportFilter';
import CustomFilter from '../presentational/CustomFilters';

class CustomFilterContainer extends Component {
    state = {
        selectedQuestionID: ''
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
