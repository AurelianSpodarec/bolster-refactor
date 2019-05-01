import React, { Component } from 'react';
import { convertEnumToDropdownOptions } from 'helpers/generic';
import { LABEL_QUES_TYPES } from 'constants/companyAdmin/enums';
import LabelField from '../presentational/LabelField';

class LabelFieldContainer extends Component {
    state = {
        questionTypes: convertEnumToDropdownOptions(LABEL_QUES_TYPES),
        questionType: ''
    };
    render() {
        const { questionTypes, questionType } = this.state;
        return (
            <LabelField
                questionTypes={Object.values(questionTypes)}
                questionType={questionTypes[questionType]}
                handleChange={this.handleChange}
            />
        );
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
}

export default LabelFieldContainer;
